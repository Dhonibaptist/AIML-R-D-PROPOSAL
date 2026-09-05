"""
Network Incident Triage Assistant (TRACK_ID=PS07)

Single entry point: `python app.py` builds the incident triage index at
startup (grouping + runbook retrieval + Gemini-grounded recommendations),
then serves both the API and the built frontend on http://localhost:8000.
"""
import os
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from src.pipeline import run_pipeline

app = FastAPI(title="Network Incident Triage Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STATE: dict = {}
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend", "dist")


@app.on_event("startup")
def startup() -> None:
    t0 = time.time()
    print("[startup] running triage pipeline (grouping + runbook retrieval + Gemini)...")
    STATE["result"] = run_pipeline()
    print(f"[startup] pipeline complete in {time.time() - t0:.1f}s")


@app.get("/api/health")
def health():
    return {"status": "ok", "ready": "result" in STATE}


@app.get("/api/alerts")
def get_alerts():
    return STATE["result"]["alerts"]


@app.get("/api/incidents")
def get_incidents():
    return STATE["result"]["incidents"]


@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: str):
    for inc in STATE["result"]["incidents"]:
        if inc["incident_id"] == incident_id:
            return inc
    raise HTTPException(status_code=404, detail="incident not found")


@app.get("/api/noise")
def get_noise():
    return STATE["result"]["noise"]


@app.get("/api/runbooks")
def get_runbooks():
    return STATE["result"]["runbooks"]


@app.get("/api/analytics")
def get_analytics():
    return STATE["result"]["analytics"]


# ---------------------------------------------------------------------------
# Serve the built (static) frontend from frontend/dist at the root path.
# No build step at judge time - these are plain, already-built HTML/JS/CSS
# files committed to the repo.
# ---------------------------------------------------------------------------
if os.path.isdir(FRONTEND_DIR):
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIR), name="assets")

    @app.get("/")
    def index():
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

    @app.get("/{path:path}")
    def catch_all(path: str):
        candidate = os.path.join(FRONTEND_DIR, path)
        if os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
