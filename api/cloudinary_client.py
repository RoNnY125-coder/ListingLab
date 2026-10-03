"""
app/cloudinary_client.py
------------------------
Initialises the Cloudinary SDK once at startup using settings from config.py.
Import `cloudinary` from here (or directly from the sdk) after this module
has been imported in main.py so the global config is already applied.
"""
import cloudinary
from api.config import settings

cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret,
    secure=True,          # always use https:// URLs
)
