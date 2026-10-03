"""
app/services/library_service.py
---------------------------------
Library service — queries Cloudinary Search API and maps results to
LibraryItemResponse DTOs.  No Cloudinary SDK calls directly; delegates
to cloudinary_service.
"""
from __future__ import annotations

from typing import List, Optional

from api.schemas.library import LibraryItemResponse
from api.schemas.upload import ModerationInfo
from api.services import cloudinary_service


def get_library(
    tag: Optional[str] = None,
    status: Optional[str] = None,
) -> List[LibraryItemResponse]:
    """
    Fetch and filter images from the listinglab/originals Cloudinary folder.

    Args:
        tag:    Optional tag to filter by (e.g. "shoe").
        status: Optional moderation status to filter by (e.g. "approved").

    Returns:
        A list of LibraryItemResponse DTOs, sorted newest first.
    """
    raw = cloudinary_service.search_images(tag=tag, status=status)
    resources = raw.get("resources", [])

    items: List[LibraryItemResponse] = []
    for resource in resources:
        public_id = resource.get("public_id", "")

        # ── Tags ──────────────────────────────────────────────────────────────
        tags: List[str] = resource.get("tags") or []

        # ── Moderation ────────────────────────────────────────────────────────
        moderation_info: Optional[ModerationInfo] = None
        moderation_list = resource.get("moderation")
        if moderation_list and isinstance(moderation_list, list):
            # Cloudinary returns a list; take the first entry's status
            mod_entry = moderation_list[0]
            raw_status = mod_entry.get("status", "pending")
            moderation_info = ModerationInfo(status=raw_status)
        elif isinstance(moderation_list, dict):
            raw_status = moderation_list.get("status", "pending")
            moderation_info = ModerationInfo(status=raw_status)

        # ── Timestamps ────────────────────────────────────────────────────────
        created_at: str = resource.get("created_at", "")

        # ── Thumbnail URL ─────────────────────────────────────────────────────
        thumb_url = cloudinary_service.generate_thumbnail_url(public_id, size=400)

        items.append(
            LibraryItemResponse(
                publicId=public_id,
                tags=tags,
                moderation=moderation_info,
                createdAt=created_at,
                thumbUrl=thumb_url,
            )
        )

    return items
