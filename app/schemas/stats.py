"""
app/schemas/stats.py
---------------------
DTOs for GET /api/stats.
"""
from __future__ import annotations

from typing import List
from pydantic import BaseModel


class StatsResponse(BaseModel):
    """Aggregated analytics returned by GET /api/stats."""
    processed: int
    mbSaved: float
    avgReductionPct: float
    flagged: int
    topTags: List[str] = []
