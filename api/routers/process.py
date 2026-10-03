"""
app/routers/process.py
-----------------------
GET /api/process?publicId=<PUBLIC_ID>

Generates all Cloudinary transformation URLs for the Result screen and
returns the real optimised-size savings percentage.
"""
from __future__ import annotations

from fastapi import APIRouter, Query

from api.exceptions.errors import InvalidFileException
from api.schemas.process import ProcessResponse
from api.services import image_processing

router = APIRouter(tags=["process"])


@router.get(
    "/process",
    response_model=ProcessResponse,
    summary="Generate transformation URLs for an uploaded image",
    description=(
        "Given a Cloudinary publicId (returned by POST /api/upload), "
        "generates optimised transformation URLs for all platforms and "
        "calculates the real file size savings percentage."
    ),
)
def process_image(
    publicId: str = Query(
        ...,
        description="The Cloudinary publicId returned by POST /api/upload.",
        min_length=1,
    ),
) -> ProcessResponse:
    """
    Controller flow:
        1. Validate publicId is present and non-empty.
        2. Delegate to ImageProcessingService.
        3. Return ProcessResponse.
    """
    # FastAPI's min_length=1 already rejects empty strings,
    # but an explicit guard keeps the error message meaningful.
    if not publicId.strip():
        raise InvalidFileException(
            "publicId query parameter is required and must not be empty."
        )

    return image_processing.build_process_response(public_id=publicId)
