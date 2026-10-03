"""
app/main.py
-----------
FastAPI application entry point.
- Configures CORS for the Next.js frontend.
- Registers all routers under /api.
- Registers global exception handlers.
- Overrides Swagger UI to use jsDelivr CDN (avoids unpkg.com blocks).
"""
import api.cloudinary_client  # noqa: F401 — triggers SDK init before any router runs

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.responses import HTMLResponse, RedirectResponse

from api.config import settings
from api.exceptions.handlers import register_exception_handlers
from api.routers import upload, process, library, stats, dashboard

# Disable built-in docs so we can serve from a reliable CDN
app = FastAPI(
    title="ListingLab API",
    description=(
        "Backend API that connects the ListingLab Next.js frontend to Cloudinary. "
        "Handles image upload, transformation URL generation, library search, and analytics."
    ),
    version="1.0.0",
    docs_url=None,    # we serve /docs manually below
    redoc_url=None,   # we serve /redoc manually below
)

# ── CORS ─────────────────────────────────────────────────────────────────────
# Allow the local dev frontend and the deployed production frontend.
# Do NOT use "*" once authentication is introduced.
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    settings.frontend_url,
]
# Deduplicate in case FRONTEND_URL is already localhost:3000
allowed_origins = list(dict.fromkeys(allowed_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ── Exception Handlers ────────────────────────────────────────────────────────
register_exception_handlers(app)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(upload.router, prefix="/api")
app.include_router(process.router, prefix="/api")
app.include_router(library.router, prefix="/api")
app.include_router(stats.router, prefix="/api")
app.include_router(dashboard.router)


# ── Custom Swagger UI (jsDelivr CDN - reliable globally) ─────────────────────
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui() -> HTMLResponse:
    """Serve Swagger UI using jsDelivr CDN instead of unpkg.com."""
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="ListingLab API - Swagger UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
    )


@app.get("/redoc", include_in_schema=False)
async def custom_redoc() -> HTMLResponse:
    """Serve ReDoc using jsDelivr CDN."""
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="ListingLab API - ReDoc",
        redoc_js_url="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js",
    )


@app.get("/health", tags=["health"])
def health_check():
    """Quick liveness probe."""
    return {"status": "ok", "service": "listinglab-backend"}
