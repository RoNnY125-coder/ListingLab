"""
app/exceptions/handlers.py
---------------------------
Global exception handlers — equivalent to GlobalExceptionHandler.java.
Returns clean JSON errors.  Never exposes stack traces or credentials.
"""
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from api.exceptions.errors import ListingLabException


def register_exception_handlers(app: FastAPI) -> None:
    """Register all exception handlers on the FastAPI app instance."""

    @app.exception_handler(ListingLabException)
    async def listinglab_exception_handler(
        request: Request, exc: ListingLabException
    ) -> JSONResponse:
        """
        Catch every custom ListingLab exception and return a clean JSON body:
        { "error": "ERROR_CODE", "message": "Human readable description." }
        """
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.error_code,
                "message": exc.message,
            },
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        """
        Catch-all for unexpected errors.
        Returns 500 without exposing the internal error details.
        """
        return JSONResponse(
            status_code=500,
            content={
                "error": "INTERNAL_ERROR",
                "message": "An unexpected error occurred. Please try again.",
            },
        )
