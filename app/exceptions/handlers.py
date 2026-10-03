"""
app/exceptions/handlers.py
---------------------------
Global exception handlers — equivalent to GlobalExceptionHandler.java.
Returns clean JSON errors.  Never exposes stack traces or credentials.
"""
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.exceptions.errors import ListingLabException


def register_exception_handlers(app: FastAPI) -> None:
    """Register all exception handlers on the FastAPI app instance."""

    @app.exception_handler(ListingLabException)
    async def listinglab_exception_handler(
        request: Request, exc: ListingLabException
    ) -> JSONResponse:
        import traceback
        print(f"ListingLabException: {exc.error_code} - {exc.message}")
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
        import traceback
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={
                "error": "INTERNAL_ERROR",
                "message": f"An unexpected error occurred: {str(exc)}",
            },
        )
