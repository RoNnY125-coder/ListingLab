"""
app/routers/upload.py
----------------------
POST /api/upload

Receives a multipart image file, validates it, uploads it to Cloudinary
under listinglab/originals, and returns an UploadResponse DTO.
"""
from __future__ import annotations

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from app.exceptions.errors import FileTooLargeException, InvalidFileException
from app.schemas.upload import ModerationInfo, UploadResponse
from app.services import cloudinary_service

router = APIRouter(tags=["upload"])

# ── Limits ─────────────────────────────────────────────────────────────────────
_MAX_SIZE_BYTES = 10 * 1024 * 1024          # 10 MB
_ALLOWED_MIME_PREFIXES = ("image/",)


@router.post(
    "/upload",
    response_model=UploadResponse,
    summary="Upload a product image",
    description=(
        "Upload a product image to Cloudinary. "
        "The image is stored under listinglab/originals. "
        "Returns the publicId and metadata needed to call GET /api/process."
    ),
)
async def upload_image(file: UploadFile = File(...)) -> UploadResponse:
    """
    Controller flow:
        1. Receive multipart image.
        2. Validate MIME type.
        3. Read bytes and validate size.
        4. Call CloudinaryService.upload_image().
        5. Map result to UploadResponse and return.
    """
    # ── 1. Validate MIME type ──────────────────────────────────────────────────
    content_type = file.content_type or ""
    if not any(content_type.startswith(prefix) for prefix in _ALLOWED_MIME_PREFIXES):
        raise InvalidFileException(
            f"File type '{content_type}' is not supported. "
            "Please upload a valid image (JPEG, PNG, WEBP, HEIC, etc.)."
        )

    # ── 2. Read file bytes ─────────────────────────────────────────────────────
    file_bytes = await file.read()

    # ── 3. Validate size ───────────────────────────────────────────────────────
    if len(file_bytes) > _MAX_SIZE_BYTES:
        raise FileTooLargeException(
            f"Image exceeds the 20 MB size limit "
            f"({len(file_bytes) / (1024*1024):.1f} MB uploaded)."
        )

    if len(file_bytes) == 0:
        raise InvalidFileException("Uploaded file is empty.")

    # ── 4. Upload to Cloudinary ────────────────────────────────────────────────
    result = cloudinary_service.upload_image(
        file_bytes=file_bytes,
        filename=file.filename or "upload",
    )

    # ── 5. Build and return UploadResponse ────────────────────────────────────
    # Extract moderation status (list of dicts in Cloudinary response)
    moderation_info: ModerationInfo | None = None
    raw_moderation = result.get("moderation")
    if raw_moderation and isinstance(raw_moderation, list) and raw_moderation:
        mod_status = raw_moderation[0].get("status", "pending")
        moderation_info = ModerationInfo(status=mod_status)
    elif isinstance(raw_moderation, dict):
        moderation_info = ModerationInfo(status=raw_moderation.get("status", "pending"))

    # Extract tags (may come from auto-tagging add-on)
    tags = result.get("tags") or []
    
    # Extract EXIF metadata if available
    img_meta = result.get("image_metadata", {})
    camera_model = img_meta.get("Model") or img_meta.get("Make") or "Unknown Camera"
    lens = img_meta.get("LensModel") or img_meta.get("Lens") or "Unknown Lens"
    
    return UploadResponse(
        publicId=result["public_id"],
        bytes=result.get("bytes", len(file_bytes)),
        width=result.get("width", 0),
        height=result.get("height", 0),
        tags=tags,
        moderation=moderation_info,
        cameraModel=camera_model,
        lens=lens,
        format=result.get("format", "unknown").upper(),
        resolution=f"{result.get('width', 0)} x {result.get('height', 0)}"
    )
