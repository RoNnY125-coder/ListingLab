"""
app/services/image_processing.py
----------------------------------
Processing workflow service:
    upload result → generate transformations → build URLs → calculate size savings

Size savings are calculated using real HTTP HEAD requests to the optimized URL,
reading the Content-Length response header to get the actual byte size.
"""
from __future__ import annotations

import httpx

from app.schemas.process import ImageUrls, ProcessResponse
from app.services import cloudinary_service


# Maximum time (seconds) to wait for Cloudinary HEAD response
_HEAD_TIMEOUT = 60.0


def get_all_urls(public_id: str) -> ImageUrls:
    """
    Generate all six Cloudinary transformation URLs for the given publicId.
    """
    return ImageUrls(
        original=cloudinary_service.generate_original_url(public_id),
        optimized=cloudinary_service.generate_optimized_url(public_id),
        instagram=cloudinary_service.generate_instagram_url(public_id),
        feed=cloudinary_service.generate_feed_url(public_id),
        marketplace=cloudinary_service.generate_marketplace_url(public_id),
        banner=cloudinary_service.generate_banner_url(public_id),
    )


def _get_content_length(url: str) -> int:
    """
    Send a synchronous HEAD request and return the Content-Length in bytes.
    Returns 0 if the header is absent or the request fails.
    """
    try:
        with httpx.Client(timeout=_HEAD_TIMEOUT, follow_redirects=True) as client:
            response = client.head(url)
            length = response.headers.get("content-length")
            if length and length.isdigit():
                return int(length)
    except Exception:
        pass
    return 0


def calculate_size_savings(original_url: str, optimized_url: str) -> float:
    """
    Calculate the real size reduction percentage by comparing:
        - original_url  → size of the source image
        - optimized_url → size after f_auto + q_auto

    Formula:
        sizeSavedPct = ((originalBytes - optimizedBytes) / originalBytes) * 100

    Returns 0.0 if sizes cannot be determined (missing Content-Length header,
    network error, etc.).
    """
    original_bytes = _get_content_length(original_url)
    optimized_bytes = _get_content_length(optimized_url)

    if original_bytes <= 0 or optimized_bytes <= 0:
        return 0.0

    saved = ((original_bytes - optimized_bytes) / original_bytes) * 100
    # Clamp to [0, 100] — optimized should never be larger, but guard against it
    return round(max(0.0, min(100.0, saved)), 1)


def build_process_response(public_id: str) -> ProcessResponse:
    """
    Full processing pipeline for a single publicId:
        1. Generate all transformation URLs.
        2. Calculate real size savings via HEAD requests.
        3. Return a ProcessResponse DTO.
    """
    urls = get_all_urls(public_id)
    size_saved_pct = calculate_size_savings(urls.original, urls.optimized)

    return ProcessResponse(
        urls=urls,
        sizeSavedPct=size_saved_pct,
    )
