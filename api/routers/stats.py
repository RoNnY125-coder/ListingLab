"""
app/routers/stats.py
---------------------
GET /api/stats

Returns aggregated analytics for the Analytics screen.
"""
from __future__ import annotations

from fastapi import APIRouter

from api.schemas.stats import StatsResponse
from api.services import analytics_service

router = APIRouter(tags=["stats"])


@router.get(
    "/stats",
    response_model=StatsResponse,
    summary="Get analytics statistics",
    description=(
        "Returns aggregated analytics across all processed images: "
        "total count, MB saved, average reduction %, moderation flags, and top tags."
    ),
)
def get_stats() -> StatsResponse:
    """
    Controller flow:
        1. Call AnalyticsService.
        2. Return StatsResponse.
    """
    return analytics_service.get_stats()
