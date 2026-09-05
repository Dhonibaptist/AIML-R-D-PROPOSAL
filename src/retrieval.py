"""
Small local retrieval pipeline over the runbook library.

No hosted vector DB, no third-party RAG service - just:
  - parse the markdown runbooks (with a YAML-ish frontmatter block)
  - embed each one with Gemini at startup (cheap: half a dozen short docs)
  - cosine-similarity search at query time, in numpy, entirely local
"""
import math
import os
import re

from .gemini_client import embed_text

RUNBOOKS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "runbooks")

# Below this cosine similarity, an incident is escalated instead of matched.
# Calibrated for real Gemini embeddings (gemini-embedding-001), which separate
# genuinely-related text much more clearly than the local dev fallback does.
# Override with RUNBOOK_MATCH_THRESHOLD if you want to tune it for your own
# runbook set.
MATCH_THRESHOLD = float(os.environ.get("RUNBOOK_MATCH_THRESHOLD", 0.55))


def _parse_frontmatter(text: str) -> tuple[dict, str]:
    """Very small frontmatter parser for our own fixed runbook format."""
    meta = {}
    body = text
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if m:
        fm, body = m.group(1), m.group(2)
        for line in fm.splitlines():
            if ":" not in line:
                continue
            k, v = line.split(":", 1)
            k, v = k.strip(), v.strip()
            if v.startswith("[") and v.endswith("]"):
                v = [x.strip() for x in v[1:-1].split(",") if x.strip()]
            meta[k] = v
    return meta, body.strip()


def _cosine(a: list, b: list) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a)) or 1.0
    nb = math.sqrt(sum(y * y for y in b)) or 1.0
    return dot / (na * nb)


class RunbookIndex:
    def __init__(self):
        self.runbooks: list[dict] = []

    def load_and_embed(self):
        from concurrent.futures import ThreadPoolExecutor

        parsed = []
        for fname in sorted(os.listdir(RUNBOOKS_DIR)):
            if not fname.endswith(".md"):
                continue
            path = os.path.join(RUNBOOKS_DIR, fname)
            with open(path, "r", encoding="utf-8") as f:
                raw = f.read()
            meta, body = _parse_frontmatter(raw)
            parsed.append((fname, meta, body))

        # Embedding calls are I/O-bound (Gemini API round trips) - a handful
        # of short runbooks embed in parallel comfortably within the startup
        # time budget instead of one-by-one.
        def _embed_one(item):
            fname, meta, body = item
            embed_source = f"{meta.get('title', fname)}\n{body}"
            return {
                "id": meta.get("id", fname),
                "title": meta.get("title", fname),
                "applies_to": meta.get("applies_to", []),
                "file": fname,
                "body": body,
                "embedding": embed_text(embed_source),
            }

        with ThreadPoolExecutor(max_workers=min(8, len(parsed) or 1)) as pool:
            self.runbooks = list(pool.map(_embed_one, parsed))

        print(f"[retrieval] loaded and embedded {len(self.runbooks)} runbooks")
        return self

    def search(self, query_text: str) -> list[dict]:
        """Returns all runbooks ranked by similarity to query_text, highest first."""
        qvec = embed_text(query_text)
        scored = []
        for rb in self.runbooks:
            sim = _cosine(qvec, rb["embedding"])
            scored.append({**{k: v for k, v in rb.items() if k != "embedding"}, "score": sim})
        scored.sort(key=lambda r: r["score"], reverse=True)
        return scored

    def best_match(self, query_text: str) -> dict | None:
        ranked = self.search(query_text)
        if not ranked:
            return None
        best = ranked[0]
        best["all_candidates"] = ranked[:3]
        if best["score"] >= MATCH_THRESHOLD:
            return best
        return None
