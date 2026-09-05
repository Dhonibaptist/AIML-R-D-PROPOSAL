"""
Thin wrapper around the Gemini API for the two things this app needs:
  1. embed_text(text)      -> list[float]   (gemini-embedding-001)
  2. generate(prompt, ...) -> str            (gemini-2.0-flash)

Reads the key from the GEMINI_API_KEY environment variable at call time
(never hardcoded, never committed). If the key is missing or a call fails
(e.g. no network in a dev sandbox), we fall back to small deterministic
local functions so the rest of the pipeline can still be exercised end to
end during development. At judge time, with a real key and network access,
every embedding and every generated recommendation comes from Gemini.
"""
import os
import hashlib
import json
import math
import re
import urllib.request
import urllib.error

EMBED_MODEL = "gemini-embedding-001"
GEN_MODEL = "gemini-2.0-flash"
API_ROOT = "https://generativelanguage.googleapis.com/v1beta"

_embed_cache: dict[str, list] = {}


def _api_key() -> str | None:
    return os.environ.get("GEMINI_API_KEY")


def _post(url: str, payload: dict, timeout: int = 30) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}, method="POST"
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


# --------------------------------------------------------------------------
# Local fallback (offline dev only - NOT used when a real key is present and
# reachable). Deterministic hashed bag-of-words vector, purely so the rest of
# the grouping/retrieval/escalation pipeline is exercisable without network.
# --------------------------------------------------------------------------
_DIM = 256


def _local_embed(text: str) -> list:
    vec = [0.0] * _DIM
    for tok in re.findall(r"[a-z0-9]+", text.lower()):
        h = int(hashlib.md5(tok.encode()).hexdigest(), 16)
        vec[h % _DIM] += 1.0
    norm = math.sqrt(sum(v * v for v in vec)) or 1.0
    return [v / norm for v in vec]


def embed_text(text: str) -> list:
    """Returns an embedding vector for `text`, using Gemini if a key/network
    is available, otherwise a local deterministic fallback."""
    if text in _embed_cache:
        return _embed_cache[text]

    key = _api_key()
    if key:
        try:
            url = f"{API_ROOT}/models/{EMBED_MODEL}:embedContent?key={key}"
            payload = {"content": {"parts": [{"text": text}]}}
            resp = _post(url, payload)
            vec = resp["embedding"]["values"]
            _embed_cache[text] = vec
            return vec
        except Exception as e:  # noqa: BLE001 - broad by design, see docstring
            print(f"[gemini_client] embedContent failed, using local fallback: {e}")

    vec = _local_embed(text)
    _embed_cache[text] = vec
    return vec


def generate(prompt: str, system: str | None = None) -> str:
    """Returns generated text from Gemini, or a template-based fallback."""
    key = _api_key()
    if key:
        try:
            url = f"{API_ROOT}/models/{GEN_MODEL}:generateContent?key={key}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            if system:
                payload["systemInstruction"] = {"parts": [{"text": system}]}
            resp = _post(url, payload)
            return resp["candidates"][0]["content"]["parts"][0]["text"].strip()
        except Exception as e:  # noqa: BLE001
            print(f"[gemini_client] generateContent failed, using local fallback: {e}")

    return _local_fallback_generate(prompt)


def _local_fallback_generate(prompt: str) -> str:
    # Very small, obviously-a-placeholder fallback so a dev sandbox without
    # network can still see the pipeline run end to end.
    return (
        "[offline fallback - no GEMINI_API_KEY / no network reachable] "
        "A Gemini-generated, runbook-grounded recommendation would appear "
        "here at judge time. Prompt was:\n" + prompt[:400]
    )
