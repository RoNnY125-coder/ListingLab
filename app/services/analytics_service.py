"""
app/services/analytics_service.py
-----------------------------------
Aggregates statistics across all images in listinglab/originals for the
/api/stats endpoint.

Statistics computed:
    processed       — total image count
    mbSaved         — sum of actual size savings (original - optimized) in MB
    avgReductionPct — mean reduction % across all assets
    flagged         — count of images with moderation status = "rejected"
    topTags         — top-3 most frequent tags

Size savings per image are estimated by comparing the stored `bytes` field
(original size) against a q_auto HEAD request.  HEAD requests are batched
and capped to avoid excessive latency; for very large libraries a sampling
strategy is used (first 50 images).
"""
from __future__ import annotations

from collections import Counter
from typing import List

import httpx

from app.schemas.stats import StatsResponse
from app.services import cloudinary_service

_HEAD_TIMEOUT = 8.0
_SAMPLE_LIMIT = 50   # max images to HEAD-probe for size savings


def _head_size(url: str) -> int:
    """Return Content-Length for a URL, or 0 on failure."""
    try:
        with httpx.Client(timeout=_HEAD_TIMEOUT, follow_redirects=True) as client:
            r = client.head(url)
            cl = r.headers.get("content-length", "0")
            return int(cl) if cl.isdigit() else 0
    except Exception:
        return 0


def get_stats() -> StatsResponse:
    """
    Compute and return aggregated analytics for the Analytics screen.
    """
    raw = cloudinary_service.search_images(max_results=500)
    resources = raw.get("resources", [])

    processed = len(resources)
    flagged = 0
    tag_counter: Counter = Counter()
    total_saved_bytes = 0
    reduction_samples: List[float] = []

    for idx, resource in enumerate(resources):
        public_id = resource.get("public_id", "")
        original_bytes: int = resource.get("bytes", 0)

        # ── Moderation flagging ───────────────────────────────────────────────
        moderation = resource.get("moderation")
        if moderation:
            mod_list = moderation if isinstance(moderation, list) else [moderation]
            for mod in mod_list:
                if isinstance(mod, dict) and mod.get("status") == "rejected":
                    flagged += 1
                    break

        # ── Tag aggregation ───────────────────────────────────────────────────
        tags: List[str] = resource.get("tags") or []
        tag_counter.update(tags)

        # ── Size savings (sample first N to keep response fast) ───────────────
        if idx < _SAMPLE_LIMIT and original_bytes > 0:
            optimized_url = cloudinary_service.generate_optimized_url(public_id)
            optimized_bytes = _head_size(optimized_url)
            if optimized_bytes > 0 and optimized_bytes < original_bytes:
                saved = original_bytes - optimized_bytes
                total_saved_bytes += saved
                pct = (saved / original_bytes) * 100
                reduction_samples.append(pct)

    # ── Aggregate calculations ────────────────────────────────────────────────
    mb_saved = round(total_saved_bytes / (1024 * 1024), 2)

    avg_reduction_pct = (
        round(sum(reduction_samples) / len(reduction_samples), 1)
        if reduction_samples
        else 0.0
    )

    top_tags: List[str] = [tag for tag, _ in tag_counter.most_common(3)]

    return StatsResponse(
        processed=processed,
        mbSaved=mb_saved,
        avgReductionPct=avg_reduction_pct,
        flagged=flagged,
        topTags=top_tags,
    )
