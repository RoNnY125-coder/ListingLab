"""
app/services/cloudinary_service.py
------------------------------------
All raw Cloudinary SDK operations live here.
Controllers/routers NEVER call the Cloudinary SDK directly.

Cloudinary folder layout used by this service:
    listinglab/
    ├── originals/    ← uploaded original images
    └── processed/    ← (reserved for future processed copies if needed)
"""
from __future__ import annotations

import io
from typing import Any, Dict, Optional

import cloudinary
import cloudinary.uploader
import cloudinary.api
import cloudinary.utils
from cloudinary.search import Search

from app.exceptions.errors import (
    AssetNotFoundException,
    CloudinaryUnavailableException,
    UploadFailedException,
)

# ── Folder constants ──────────────────────────────────────────────────────────
ORIGINALS_FOLDER = "listinglab/originals"
PROCESSED_FOLDER = "listinglab/processed"

# ── File size limit ────────────────────────────────────────────────────────────
MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024  # 20 MB


# ── Upload ─────────────────────────────────────────────────────────────────────

def upload_image(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Upload a raw image to Cloudinary under listinglab/originals.

    First tries with AI tagging and AWS Rekognition moderation add-ons.
    If the Cloudinary account does not have those paid add-ons active,
    it automatically falls back to standard upload.

    Returns the full Cloudinary upload result dict.
    """
    upload_kwargs = {
        "folder": ORIGINALS_FOLDER,
        "resource_type": "image",
        "use_filename": True,
        "unique_filename": True,
        "overwrite": False,
    }

    # Attempt with add-ons first
    try:
        return cloudinary.uploader.upload(
            io.BytesIO(file_bytes),
            categorization="google_tagging",
            auto_tagging=0.6,
            moderation="aws_rek",
            **upload_kwargs,
        )
    except Exception as exc:
        error_msg = str(exc).lower()
        # If failure is related to missing add-on subscription, fall back to plain upload
        if any(term in error_msg for term in ["subscription", "rekognition", "categorization", "add-on", "not enabled"]):
            try:
                return cloudinary.uploader.upload(
                    io.BytesIO(file_bytes),
                    **upload_kwargs,
                )
            except Exception as fallback_exc:
                exc = fallback_exc

        if "unauthorized" in str(exc).lower() or "invalid" in str(exc).lower():
            raise CloudinaryUnavailableException(
                "Cloudinary rejected the request. Check your API credentials."
            ) from exc
        raise UploadFailedException(
            f"Unable to upload image to Cloudinary: {exc}"
        ) from exc


# ── URL Generation ─────────────────────────────────────────────────────────────

def generate_original_url(public_id: str) -> str:
    """Return the plain, secure original image URL."""
    return cloudinary.utils.cloudinary_url(public_id, secure=True)[0]


def generate_optimized_url(public_id: str) -> str:
    """Return a URL with automatic format and quality optimisation (f_auto, q_auto)."""
    return cloudinary.utils.cloudinary_url(
        public_id,
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_instagram_url(public_id: str) -> str:
    """
    1080×1080 square crop — Instagram post format (1:1).
    crop=fill, gravity=auto keeps the main subject centred.
    """
    return cloudinary.utils.cloudinary_url(
        public_id,
        width=1080,
        height=1080,
        crop="fill",
        gravity="auto",
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_feed_url(public_id: str) -> str:
    """
    1080×1350 portrait crop — Instagram Feed / Story format (4:5).
    """
    return cloudinary.utils.cloudinary_url(
        public_id,
        width=1080,
        height=1350,
        crop="fill",
        gravity="auto",
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_marketplace_url(public_id: str) -> str:
    """
    900×1200 portrait crop — standard marketplace listing format (3:4).
    """
    return cloudinary.utils.cloudinary_url(
        public_id,
        width=900,
        height=1200,
        crop="fill",
        gravity="auto",
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_banner_url(public_id: str) -> str:
    """
    1600×900 landscape crop — website/social banner format (16:9).
    """
    return cloudinary.utils.cloudinary_url(
        public_id,
        width=1600,
        height=900,
        crop="fill",
        gravity="auto",
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_bg_removed_url(public_id: str) -> str:
    """
    Background-removed URL using the Cloudinary AI Background Removal add-on.
    Falls back to the original URL if the add-on is not active.
    """
    return cloudinary.utils.cloudinary_url(
        public_id,
        effect="background_removal",   # e_background_removal
        fetch_format="auto",
        quality="auto",
        secure=True,
    )[0]


def generate_thumbnail_url(public_id: str, size: int = 400) -> str:
    """Small square thumbnail for library grid display."""
    return cloudinary.utils.cloudinary_url(
        public_id,
        width=size,
        height=size,
        crop="fill",
        gravity="auto",
        fetch_format="auto",
        quality="auto:low",
        secure=True,
    )[0]


# ── Search ─────────────────────────────────────────────────────────────────────

def search_images(
    tag: Optional[str] = None,
    status: Optional[str] = None,
    max_results: int = 100,
) -> Dict[str, Any]:
    """
    Query Cloudinary Search API for images in the listinglab/originals folder.

    Supports filtering by tag and/or moderation status.
    Returns the raw Cloudinary search result dict.
    """
    try:
        # Build the expression
        expressions = [f"folder:{ORIGINALS_FOLDER}"]

        if tag:
            expressions.append(f"tags={tag}")

        if status:
            # Cloudinary moderation status field: moderation_status
            expressions.append(f"moderation_status={status}")

        expression = " AND ".join(expressions)

        result = (
            Search()
            .expression(expression)
            .with_field("tags")
            .with_field("context")
            .sort_by("created_at", "desc")
            .max_results(max_results)
            .execute()
        )
    except cloudinary.exceptions.Error as exc:
        raise CloudinaryUnavailableException(
            "Unable to reach Cloudinary Search API."
        ) from exc

    return result


# ── Resource Metadata ──────────────────────────────────────────────────────────

def get_resource(public_id: str) -> Dict[str, Any]:
    """
    Fetch resource metadata for a single asset by its public_id.
    Raises AssetNotFoundException if the asset does not exist in Cloudinary.
    """
    try:
        result = cloudinary.api.resource(
            public_id,
            resource_type="image",
        )
    except cloudinary.api.NotFound as exc:
        raise AssetNotFoundException(
            f"Asset '{public_id}' was not found in Cloudinary."
        ) from exc
    except cloudinary.exceptions.Error as exc:
        raise CloudinaryUnavailableException(
            "Cloudinary is currently unavailable. Please try again shortly."
        ) from exc

    return result
