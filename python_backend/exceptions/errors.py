"""
app/exceptions/errors.py
-------------------------
Custom exception classes used across services and routers.
Each carries an HTTP status code and a short machine-readable error code.
"""


class ListingLabException(Exception):
    """Base class for all ListingLab backend exceptions."""
    status_code: int = 500
    error_code: str = "INTERNAL_ERROR"

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class InvalidFileException(ListingLabException):
    """Raised when the uploaded file is not a valid image or is malformed."""
    status_code = 400
    error_code = "INVALID_FILE"


class FileTooLargeException(ListingLabException):
    """Raised when the uploaded file exceeds the size limit."""
    status_code = 413
    error_code = "FILE_TOO_LARGE"


class AssetNotFoundException(ListingLabException):
    """Raised when a publicId does not exist in Cloudinary."""
    status_code = 404
    error_code = "ASSET_NOT_FOUND"


class CloudinaryUnavailableException(ListingLabException):
    """Raised when Cloudinary returns a server-side error or is unreachable."""
    status_code = 503
    error_code = "CLOUDINARY_UNAVAILABLE"


class UploadFailedException(ListingLabException):
    """Raised when the Cloudinary upload call fails."""
    status_code = 500
    error_code = "UPLOAD_FAILED"
