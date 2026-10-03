"""
app/config.py
-------------
Reads environment variables via pydantic-settings.
Raises a clear error at startup if Cloudinary credentials are missing.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ── Cloudinary ──────────────────────────────────────────────────────────
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str

    # ── CORS ─────────────────────────────────────────────────────────────────
    # Override in .env for production (e.g. https://listinglab.vercel.app)
    frontend_url: str = "http://localhost:3000"


# Singleton — imported everywhere
settings = Settings()
