"""
app/schemas/library.py
-----------------------
DTOs for GET /api/library.
"""
from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel

from app.schemas.upload import ModerationInfo


class LibraryItemResponse(BaseModel):
    """One image entry returned by the Library endpoint."""
    publicId: str
    tags: List[str] = []
    moderation: Optional[ModerationInfo] = None
    createdAt: str        # ISO 8601 string, e.g. "2026-10-03T10:20:00Z"
    thumbUrl: str
