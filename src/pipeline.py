"""
Orchestrates the full triage pipeline:
  alerts -> grouping.group_alerts -> incidents + noise
  each incident -> priority score
  each incident -> retrieval.best_match -> Gemini-grounded recommendation
                    OR no match -> Gemini-generated escalation packet
"""
import json
import os

from .grouping import group_alerts
from .retrieval import RunbookIndex
from .gemini_client import generate

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

CRITICALITY_WEIGHT = {"critical": 3, "high": 2, "medium": 1, "low": 0}
SEVERITY_WEIGHT = {"critical": 3, "warning": 1, "info": 0}


def load_json(name: str):
    with open(os.path.join(DATA_DIR, name), "r", encoding="utf-8") as f:
        return json.load(f)


def priority_score(incident: dict, devices: dict) -> dict:
    """Returns {"score": int, "level": str, "reasoning": str} - fully rule based
    and explainable, no LLM needed for this part."""
    device_crit = max(
        (CRITICALITY_WEIGHT.get(devices.get(d, {}).get("criticality", "low"), 0)
         for d in incident["devices_involved"]),
        default=0,
    )
    sev = SEVERITY_WEIGHT.get(incident["max_severity"], 0)
    blast_radius = len(incident["devices_involved"])
    score = device_crit * 4 + sev * 3 + min(blast_radius, 6)

    if score >= 14:
        level = "High"
    elif score >= 7:
        level = "Medium"
    else:
        level = "Low"

    reasoning = (
        f"max device criticality={device_crit * 4} pts, "
        f"max alert severity={sev * 3} pts, "
        f"blast radius={min(blast_radius, 6)} pts (devices involved: {blast_radius}) "
        f"=> total {score}"
    )
    return {"score": score, "level": level, "reasoning": reasoning}


def _incident_signature(incident: dict) -> str:
    lines = [
        f"Incident involving alert types: {', '.join(incident['types_involved'])}.",
        f"Devices involved: {', '.join(incident['devices_involved'])}.",
        f"Max severity: {incident['max_severity']}.",
        "Sample alert messages:",
    ]
    for a in incident["alerts"][:5]:
        lines.append(f"- [{a['type']}/{a['severity']}] {a['device']}: {a['message']}")
    return "\n".join(lines)


RECOMMENDATION_SYSTEM = (
    "You are a network operations triage assistant. You are given one already-"
    "grouped incident (a set of correlated alerts believed to share one root "
    "cause) and the single most relevant troubleshooting runbook. Write a short, "
    "concrete initial response (4-6 numbered steps max) grounded ONLY in the "
    "provided runbook content. Explicitly reference the runbook by its title in "
    "your first sentence. Do not invent steps that are not supported by the "
    "runbook. Keep it under 150 words."
)

ESCALATION_SYSTEM = (
    "You are a network operations triage assistant. You are given an incident "
    "(a set of correlated alerts) for which NONE of the available runbooks was "
    "a confident match. Write a concise escalation packet for the next human "
    "responder with exactly three sections: 'What happened', 'What was grouped "
    "together and why', and 'Nearest runbook candidates considered (and why they "
    "were not a confident match)'. Base this only on the incident data provided. "
    "Keep it under 180 words."
)


def process_incident(incident: dict, devices: dict, index: RunbookIndex) -> dict:
    incident["priority"] = priority_score(incident, devices)
    signature = _incident_signature(incident)
    match = index.best_match(signature)

    if match:
        prompt = (
            f"INCIDENT:\n{signature}\n\n"
            f"MOST RELEVANT RUNBOOK (title: {match['title']}, id: {match['id']}):\n"
            f"{match['body']}\n\n"
            "Write the initial response now."
        )
        recommendation = generate(prompt, system=RECOMMENDATION_SYSTEM)
        incident["status"] = "Runbook Matched"
        incident["runbook_match"] = {
            "id": match["id"],
            "title": match["title"],
            "file": match["file"],
            "similarity": round(match["score"], 3),
        }
        incident["recommendation"] = recommendation
        incident["escalation"] = None
    else:
        ranked = index.search(signature)[:3]
        near_misses = "\n".join(
            f"- {r['title']} (similarity {round(r['score'], 3)})" for r in ranked
        )
        prompt = (
            f"INCIDENT:\n{signature}\n\n"
            f"Correlation reasons used to group these alerts: "
            f"{'; '.join(incident['correlation_reasons']) or 'single critical alert'}\n\n"
            f"Nearest (but not confident) runbook candidates:\n{near_misses}\n\n"
            "Write the escalation packet now."
        )
        escalation_text = generate(prompt, system=ESCALATION_SYSTEM)
        incident["status"] = "Escalated - No Runbook Match"
        incident["runbook_match"] = None
        incident["recommendation"] = None
        incident["escalation"] = {
            "packet": escalation_text,
            "near_miss_candidates": [
                {"title": r["title"], "similarity": round(r["score"], 3)} for r in ranked
            ],
        }
    return incident


def run_pipeline() -> dict:
    alerts = load_json("alerts.json")
    devices = load_json("devices.json")

    index = RunbookIndex().load_and_embed()
    incidents, noise = group_alerts(alerts, devices)

    # Each incident needs its own embedding + generation call - independent
    # I/O-bound Gemini calls, so run them concurrently to stay well inside
    # the startup time budget.
    from concurrent.futures import ThreadPoolExecutor

    with ThreadPoolExecutor(max_workers=min(8, len(incidents) or 1)) as pool:
        list(pool.map(lambda inc: process_incident(inc, devices, index), incidents))

    incidents.sort(key=lambda i: i["priority"]["score"], reverse=True)

    analytics = {
        "total_alerts": len(alerts),
        "total_incidents": len(incidents),
        "total_noise": len(noise),
        "compression_ratio": (
            round(len(alerts) / len(incidents), 1) if incidents else None
        ),
        "matched": sum(1 for i in incidents if i["status"] == "Runbook Matched"),
        "escalated": sum(1 for i in incidents if i["status"] != "Runbook Matched"),
    }

    return {
        "alerts": alerts,
        "incidents": incidents,
        "noise": noise,
        "runbooks": [
            {"id": r["id"], "title": r["title"], "file": r["file"], "applies_to": r["applies_to"]}
            for r in index.runbooks
        ],
        "analytics": analytics,
    }
