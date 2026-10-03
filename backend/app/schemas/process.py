"""
app/schemas/process.py
-----------------------
DTOs for GET /api/process.
"""
from __future__ import annotations

from pydantic import BaseModel


class ImageUrls(BaseModel):
    """All Cloudinary transformation URLs for a single asset."""
    original: str
    optimized: str
    instagram: str
    feed: str
    marketplace: str
    banner: str


class ProcessResponse(BaseModel):
    """Response returned by GET /api/process."""
    urls: ImageUrls
    sizeSavedPct: float
