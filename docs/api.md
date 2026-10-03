# ListingLab API Contract

> **Version:** 1.0.0  
> **Base URL (dev):** `http://localhost:8000`  
> **Base URL (prod):** `https://<your-backend-domain>`

All responses are JSON. All error responses follow the same shape:
```json
{ "error": "ERROR_CODE", "message": "Human readable description." }
```

---

## Endpoints

### 1. POST /api/upload

**Purpose:** Upload a product image to Cloudinary. Must be called first.  
The `publicId` in the response is the key for all subsequent calls.

#### Request

```
POST /api/upload
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | binary | ✅ | Image file (JPEG, PNG, WEBP, HEIC, etc.) |

**Limits:**
- Max size: 20 MB
- Only `image/*` MIME types accepted

#### Response — 200 OK

```json
{
  "publicId": "listinglab/originals/my-shoe_abc123",
  "bytes": 1827364,
  "width": 1200,
  "height": 1600,
  "tags": ["shoe", "sneaker", "fashion"],
  "moderation": {
    "status": "approved"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `publicId` | string | Cloudinary public ID — pass this to `/api/process` |
| `bytes` | integer | Original file size in bytes |
| `width` | integer | Image width in pixels |
| `height` | integer | Image height in pixels |
| `tags` | string[] | AI-generated tags (empty if add-on not active) |
| `moderation` | object\|null | `{ "status": "approved"\|"rejected"\|"pending" }` |

#### Error Responses

| Status | Error Code | Trigger |
|--------|-----------|---------|
| 400 | `INVALID_FILE` | Not an image, or file is empty |
| 413 | `FILE_TOO_LARGE` | File exceeds 20 MB |
| 500 | `UPLOAD_FAILED` | Cloudinary upload failed |
| 503 | `CLOUDINARY_UNAVAILABLE` | Cannot reach Cloudinary |

---

### 2. GET /api/process

**Purpose:** Generate Cloudinary transformation URLs for the Result screen.  
Call this immediately after `POST /api/upload` using the returned `publicId`.

#### Request

```
GET /api/process?publicId=listinglab/originals/my-shoe_abc123
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `publicId` | string | ✅ | Cloudinary public ID from upload |

#### Response — 200 OK

```json
{
  "urls": {
    "original":    "https://res.cloudinary.com/.../listinglab/originals/my-shoe_abc123",
    "optimized":   "https://res.cloudinary.com/.../f_auto,q_auto/listinglab/originals/my-shoe_abc123",
    "instagram":   "https://res.cloudinary.com/.../w_1080,h_1080,c_fill,g_auto/...",
    "feed":        "https://res.cloudinary.com/.../w_1080,h_1350,c_fill,g_auto/...",
    "marketplace": "https://res.cloudinary.com/.../w_900,h_1200,c_fill,g_auto/...",
    "banner":      "https://res.cloudinary.com/.../w_1600,h_900,c_fill,g_auto/..."
  },
  "sizeSavedPct": 68.4
}
```

| Field | Description |
|-------|-------------|
| `urls.original` | Raw original image |
| `urls.optimized` | `f_auto,q_auto` — auto format + quality |
| `urls.instagram` | 1080×1080 (1:1) crop |
| `urls.feed` | 1080×1350 (4:5) crop |
| `urls.marketplace` | 900×1200 (3:4) crop |
| `urls.banner` | 1600×900 (16:9) crop |
| `sizeSavedPct` | Real size reduction % (original vs optimized) |

#### Transformations Applied

| Export | Width | Height | Ratio | Crop | Gravity |
|--------|-------|--------|-------|------|---------|
| Optimized | — | — | — | — | — |
| Instagram | 1080 | 1080 | 1:1 | fill | auto |
| Feed | 1080 | 1350 | 4:5 | fill | auto |
| Marketplace | 900 | 1200 | 3:4 | fill | auto |
| Banner | 1600 | 900 | 16:9 | fill | auto |

#### Error Responses

| Status | Error Code | Trigger |
|--------|-----------|---------|
| 400 | `INVALID_FILE` | publicId missing or empty |
| 404 | `ASSET_NOT_FOUND` | publicId does not exist in Cloudinary |
| 503 | `CLOUDINARY_UNAVAILABLE` | Cannot reach Cloudinary |

---

### 3. GET /api/library

**Purpose:** List all uploaded images from Cloudinary for the Library screen.

#### Request

```
GET /api/library
GET /api/library?tag=shoe
GET /api/library?status=approved
GET /api/library?tag=shoe&status=approved
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `tag` | string | ❌ | Filter by tag (e.g. `shoe`, `watch`) |
| `status` | string | ❌ | Filter by moderation status: `approved`, `rejected`, `pending` |

#### Response — 200 OK

```json
[
  {
    "publicId": "listinglab/originals/shoe-123",
    "tags": ["shoe", "fashion"],
    "moderation": {
      "status": "approved"
    },
    "createdAt": "2026-10-03T10:20:00Z",
    "thumbUrl": "https://res.cloudinary.com/.../w_400,h_400,c_fill/..."
  }
]
```

| Field | Description |
|-------|-------------|
| `publicId` | Cloudinary public ID |
| `tags` | Array of tags |
| `moderation` | `{ "status": "..." }` or `null` |
| `createdAt` | ISO 8601 upload timestamp |
| `thumbUrl` | 400×400 thumbnail URL for grid display |

Returns an empty array `[]` if no images match.

#### Error Responses

| Status | Error Code | Trigger |
|--------|-----------|---------|
| 503 | `CLOUDINARY_UNAVAILABLE` | Cannot reach Cloudinary Search API |

---

### 4. GET /api/stats

**Purpose:** Return aggregated analytics for the Analytics screen.

#### Request

```
GET /api/stats
```

No parameters.

#### Response — 200 OK

```json
{
  "processed": 24,
  "mbSaved": 74.8,
  "avgReductionPct": 67.3,
  "flagged": 2,
  "topTags": ["shoe", "fashion", "watch"]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `processed` | integer | Total images in the library |
| `mbSaved` | float | Total MB saved across all images |
| `avgReductionPct` | float | Mean size reduction % |
| `flagged` | integer | Images with moderation status `rejected` |
| `topTags` | string[] | Top 3 most frequent tags |

#### Error Responses

| Status | Error Code | Trigger |
|--------|-----------|---------|
| 503 | `CLOUDINARY_UNAVAILABLE` | Cannot reach Cloudinary |

---

## Universal Error Shape

Every error response uses this exact JSON structure:

```json
{
  "error": "ERROR_CODE",
  "message": "Human readable description."
}
```

No stack traces. No Cloudinary credentials. No internal paths.

---

## Development

### Run the server

```bash
# Install dependencies
pip install -r requirements.txt

# Start dev server with auto-reload (port 5000 avoids Windows port 8000 CLOSE_WAIT conflicts)
uvicorn app.main:app --reload --port 5000
```

### Interactive API explorer

Open `http://localhost:5000` in your browser for the Interactive Test Console, or `http://localhost:5000/docs` for Swagger UI.

### Health check

```
GET http://localhost:5000/health
→ { "status": "ok", "service": "listinglab-backend" }
```
