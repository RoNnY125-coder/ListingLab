"""
app/routers/library.py
-----------------------
GET /api/library
GET /api/library?tag=shoe
GET /api/library?status=approved
GET /api/library?tag=shoe&status=approved

Returns images stored in Cloudinary for the Library screen.
"""
from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Query

from app.schemas.library import LibraryItemResponse
from app.services import library_service

router = APIRouter(tags=["library"])


@router.get(
    "/library",
    response_model=List[LibraryItemResponse],
    summary="List images in the library",
    description=(
        "Returns all product images stored in Cloudinary under listinglab/originals. "
        "Optionally filter by tag and/or moderation status."
    ),
)
def get_library(
    tag: Optional[str] = Query(
        default=None,
        description="Filter images by tag (e.g. 'shoe', 'watch').",
    ),
    status: Optional[str] = Query(
        default=None,
        description="Filter by moderation status: 'approved', 'rejected', or 'pending'.",
    ),
) -> List[LibraryItemResponse]:
    """
    Controller flow:
        1. Read optional query parameters.
        2. Call LibraryService.
        3. Return list of LibraryItemResponse DTOs.
    """
    return library_service.get_library(tag=tag, status=status)
