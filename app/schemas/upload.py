"""
app/schemas/upload.py
----------------------
DTOs for POST /api/upload.
Field names match the contract exactly (camelCase) so the frontend
receives the expected keys without any extra mapping.
"""
from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel


class ModerationInfo(BaseModel):
    """
    Cloudinary moderation result.
    status: "approved" | "rejected" | "pending"
    """
    status: str


class UploadResponse(BaseModel):
    """Response returned after a successful image upload to Cloudinary."""
    publicId: str
    bytes: int
    width: int
    height: int
    tags: List[str] = []
    moderation: Optional[ModerationInfo] = None
    cameraModel: Optional[str] = None
    lens: Optional[str] = None
    format: Optional[str] = None
    resolution: Optional[str] = None
