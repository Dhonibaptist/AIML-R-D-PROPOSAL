"""
Groups a flat stream of alerts into incidents using explainable, rule-based
correlation - no black box. Two alerts are linked (union-find) if, within a
sliding time window, any of these hold:

  1. SAME_DEVICE       - same device reporting multiple alert types/events
  2. TOPOLOGY          - one device is upstream/downstream of the other
                         (per data/devices.json), so a failure on one very
                         plausibly caused the alert on the other
  3. SHARED_SOURCE_IP  - alerts (e.g. repeated auth_failure) share a source IP,
                         which links them regardless of device topology

Alerts that end up alone, with none of the above links to any other alert,
are left as noise UNLESS the single alert is itself severity=="critical" (a
lone critical alert is still worth surfacing as a one-alert incident).
"""
from collections import defaultdict
from datetime import datetime

TIME_WINDOW_SECONDS = 240  # alerts within this many seconds may be linked


def _parse_ts(ts: str) -> datetime:
    return datetime.strptime(ts, "%Y-%m-%dT%H:%M:%SZ")


class UnionFind:
    def __init__(self, ids):
        self.parent = {i: i for i in ids}

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx != ry:
            self.parent[rx] = ry


def _related_devices(dev_a: str, dev_b: str, devices: dict) -> bool:
    if dev_a == dev_b:
        return True
    a_info = devices.get(dev_a, {})
    b_info = devices.get(dev_b, {})
    if dev_b in a_info.get("upstream", []) or dev_a in b_info.get("upstream", []):
        return True
    # same parent (siblings under the same upstream device)
    a_up = set(a_info.get("upstream", []))
    b_up = set(b_info.get("upstream", []))
    if a_up and a_up == b_up:
        return True
    return False


def group_alerts(alerts: list, devices: dict) -> tuple[list, list]:
    """Returns (incidents, noise) where each incident is a dict with its
    member alerts and a human-readable list of correlation reasons."""
    if not alerts:
        return [], []

    ordered = sorted(alerts, key=lambda a: a["timestamp"])
    ids = [a["id"] for a in ordered]
    by_id = {a["id"]: a for a in ordered}
    uf = UnionFind(ids)
    reasons: dict[tuple, str] = {}

    for i in range(len(ordered)):
        for j in range(i + 1, len(ordered)):
            a, b = ordered[i], ordered[j]
            dt = (_parse_ts(b["timestamp"]) - _parse_ts(a["timestamp"])).total_seconds()
            if dt > TIME_WINDOW_SECONDS:
                break  # ordered by time, nothing further can be in-window with a

            reason = None
            if a["device"] == b["device"]:
                reason = f"same device ({a['device']})"
            elif a.get("source_ip") and a.get("source_ip") == b.get("source_ip"):
                reason = f"shared source IP ({a['source_ip']})"
            elif _related_devices(a["device"], b["device"], devices):
                reason = f"topologically related devices ({a['device']} <-> {b['device']})"

            if reason:
                uf.union(a["id"], b["id"])
                reasons[(a["id"], b["id"])] = reason

    clusters = defaultdict(list)
    for aid in ids:
        clusters[uf.find(aid)].append(aid)

    incidents = []
    noise = []
    inc_num = 1

    for root, member_ids in clusters.items():
        members = [by_id[i] for i in member_ids]
        members.sort(key=lambda a: a["timestamp"])

        if len(members) == 1:
            if members[0]["severity"] == "critical":
                incidents.append(_build_incident(inc_num, members, [
                    "single critical-severity alert, surfaced on its own"
                ]))
                inc_num += 1
            else:
                noise.append({**members[0], "noise_reason":
                              "no correlating alert found within the time window "
                              "and severity is not critical"})
            continue

        member_id_set = set(member_ids)
        link_reasons = sorted({
            v for (x, y), v in reasons.items()
            if x in member_id_set and y in member_id_set
        })
        incidents.append(_build_incident(inc_num, members, link_reasons))
        inc_num += 1

    incidents.sort(key=lambda inc: inc["first_seen"])
    noise.sort(key=lambda a: a["timestamp"])
    return incidents, noise


def _build_incident(num: int, members: list, link_reasons: list) -> dict:
    devices_involved = sorted({m["device"] for m in members})
    types_involved = sorted({m["type"] for m in members})
    severities = {m["severity"] for m in members}
    max_severity = "critical" if "critical" in severities else (
        "warning" if "warning" in severities else "info")

    return {
        "incident_id": f"INC-{num:03d}",
        "title": _title_for(types_involved, devices_involved),
        "alerts": members,
        "alert_count": len(members),
        "devices_involved": devices_involved,
        "types_involved": types_involved,
        "max_severity": max_severity,
        "first_seen": members[0]["timestamp"],
        "last_seen": members[-1]["timestamp"],
        "correlation_reasons": link_reasons,
    }


def _title_for(types_involved: list, devices_involved: list) -> str:
    lead_device = devices_involved[0]
    if len(devices_involved) > 1:
        return f"{', '.join(types_involved)} across {len(devices_involved)} devices (from {lead_device})"
    return f"{', '.join(types_involved)} on {lead_device}"
