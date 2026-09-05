TRACK_ID=PS07

# Network Incident Triage Assistant

A triage assistant for a network operations desk. It ingests a stream of raw
network alerts (link down, device unreachable, high latency, repeated auth
failures, interface flapping), groups the ones that share a root cause into a
single **incident**, ranks incidents by likely impact, and for each incident
consults a small runbook library to recommend an initial response — citing
the exact runbook it drew from. Alerts that don't correlate with anything are
left as **noise**, not forced into an incident. When an incident matches no
runbook confidently, it is **escalated** with the context assembled so far —
what happened, what was grouped and why, and the nearest runbook candidates
that were considered — so the next responder starts from evidence, not from
scratch.

## How to run

```
pip install -r requirements.txt
python app.py
```

This one command starts everything — the grouping/retrieval/recommendation
pipeline runs once at startup, and both the API and the built frontend are
served together at **http://localhost:8000**. No second terminal, no build
step.

Set the `GEMINI_API_KEY` environment variable before starting the app; it is
read at call time and is never committed. If it is not set (e.g. in an
offline dev sandbox), the app falls back to small local, deterministic
functions purely so the rest of the pipeline can still be exercised without
network access — see `src/gemini_client.py`. With a real key, every runbook
embedding, every incident-similarity comparison, and every generated
recommendation/escalation packet comes from Gemini
(`gemini-embedding-001` for embeddings, `gemini-2.0-flash` for generation).

No other external service is called. Retrieval is a from-scratch, local
cosine-similarity search over embeddings computed at startup (see
`src/retrieval.py`) — no hosted vector DB, no third-party RAG service.

## What the system does, step by step

1. **Ingest** — loads the synthetic alert stream (`data/alerts.json`).
2. **Group** — `src/grouping.py` runs a rule-based, explainable correlation
   pass: alerts are linked if they share a device, share a source IP (e.g.
   repeated auth failures from one attacker), or occur on topologically
   related devices (`data/devices.json`) within a short time window. Alerts
   left with no link to anything else are reported as **noise**, unless they
   are critical-severity on their own.
3. **Prioritize** — each incident gets a rule-based, fully-explained impact
   score from device criticality, alert severity, and blast radius
   (`src/pipeline.py:priority_score`).
4. **Match against runbooks** — `src/retrieval.py` embeds the incident
   signature and the runbook library with Gemini and does a local cosine
   similarity search. Above a confidence threshold, Gemini generates a short
   recommendation grounded only in the matched runbook's content, citing its
   title. Below threshold, the incident is escalated instead: Gemini
   generates a short escalation packet (what happened / what was grouped and
   why / nearest runbook candidates considered) from the incident data.
5. **Serve** — a small dashboard (`frontend/dist/`) shows the live alert
   feed, the incident board (click into one to see every grouped alert, the
   grouping rationale, and the cited recommendation or escalation packet),
   the noise list, the runbook library, and compression-ratio analytics.

## Data and documents generated for this project

Nothing here is a provided dataset — it's all synthetic material written for
this problem statement:

- `data/alerts.json` — a 26-alert synthetic stream (`data/gen_alerts.py` is
  the deterministic generator used to produce it), covering four real
  incidents (a cascading link failure, a brute-force-style auth failure
  burst, a firewall/VPN saturation event, and an interface-flapping event
  deliberately left uncovered by any runbook to exercise the escalation
  path) plus a handful of isolated, low-severity noise alerts.
- `data/devices.json` — a small synthetic network topology (device
  criticality + upstream/downstream relationships) used for
  topology-aware correlation.
- `data/runbooks/*.md` — four short, self-written troubleshooting runbooks
  (link/interface down, device unreachable, high latency, repeated auth
  failure) that the retrieval pipeline is grounded in and cites from.

## Demo video

[link to the 5-minute demo video]

## Repository shape

```
app.py                 <- python app.py starts everything, on port 8000
requirements.txt
README.md
src/
  gemini_client.py      <- Gemini embeddings + generation, GEMINI_API_KEY
  grouping.py            <- rule-based alert correlation into incidents/noise
  retrieval.py           <- local embedding index + cosine similarity search
  pipeline.py            <- orchestration, priority scoring, recommendations
data/
  alerts.json
  devices.json
  gen_alerts.py
  runbooks/*.md
frontend/dist/           <- built (plain HTML/CSS/JS) frontend, no build step
  index.html
  app.js
  style.css
```
