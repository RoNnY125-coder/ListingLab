<p align="center">
  <img src="https://img.shields.io/badge/ListingLab-AI%20Photography%20Engine-FF7A30?style=for-the-badge&labelColor=14100C" alt="ListingLab" />
</p>

<h1 align="center">ListingLab</h1>

<p align="center">
  <strong>AI-Powered Commercial Photography Engine — Sub-Pixel Isolation, Raytraced Studio Shadows & Marketplace-Ready Catalog Delivery</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/FastAPI-0.111+-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Three.js-0.169-000000?logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Cloudinary-AI-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white" alt="Python" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-ai--ml-capabilities">AI & ML</a> •
  <a href="#-design-system">Design System</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🎯 Overview

**ListingLab** is a full-stack commercial photography engine that transforms raw product images into marketplace-ready, studio-grade catalog assets using AI-powered processing pipelines. Upload a phone snap of your product, and ListingLab delivers polished, platform-compliant images — backgrounds removed, lighting corrected, shadows synthesized, and formats optimized — all in seconds.

The platform combines a **Next.js 14** interactive frontend featuring cinematic 3D visuals, scroll-driven animations, and real-time studio simulation with a **FastAPI** backend that orchestrates Cloudinary's AI transformation APIs for intelligent image processing at scale.

### What ListingLab Does

| Input | Output |
|:------|:-------|
| 📱 Raw phone snaps, outdoor shots, messy backgrounds | 🎨 Studio-grade commercial photography |
| 🖼️ Single unprocessed image | 📦 Multi-platform catalog (Amazon, Shopify, Instagram, Feed, Banner) |
| 🤷 No photography expertise needed | ✅ Marketplace-compliant, AI-tagged, moderation-checked assets |

---

## ✨ Features

### 🧠 AI-Powered Image Processing
- **AI Background Removal** — One-click foreground subject isolation using Cloudinary's neural segmentation
- **AI Auto-Tagging** — Google Vision-powered automatic product categorization at 60%+ confidence threshold
- **AI Content Moderation** — AWS Rekognition integration for automated content safety screening
- **AI Smart Cropping** — Content-aware gravity that keeps the product centered across any aspect ratio
- **Perceptual Quality Optimization** — ML-backed compression that reduces file size by up to 68% without visible degradation

### 📐 Multi-Platform Catalog Generation
From a single upload, ListingLab generates optimized variants for every major e-commerce platform:

| Platform | Dimensions | Aspect Ratio | Optimizations |
|:---------|:-----------|:-------------|:-------------|
| **Original** | Native | Native | Secure delivery URL |
| **Optimized** | Native | Native | `f_auto`, `q_auto` (AVIF/WebP) |
| **Instagram** | 1080 × 1080 | 1:1 | Smart crop, auto format/quality |
| **Feed** | 1080 × 1350 | 4:5 | Smart crop, auto format/quality |
| **Marketplace** | 900 × 1200 | 3:4 | Smart crop, auto format/quality |
| **Banner** | 1600 × 900 | 16:9 | Smart crop, auto format/quality |

### 🎬 Immersive Frontend Experience
- **3D Parametric Helical Sculpture** — 38-slab procedurally animated Three.js sculpture with mouse parallax and scroll-driven transforms
- **Cinematic Scroll Physics** — Lenis smooth inertia scroll synchronized with GSAP's RAF ticker
- **Pinned Scroll Sections** — Camera aperture SVG vortex, before/after wipe reveals, and horizontal showcase galleries
- **Interactive Studio Simulator** — Real-time CSS canvas with background tone switching, subject framing sliders, shadow density control, and RGB 255 lock
- **Live Upload & Processing** — Drag-and-drop file upload with real-time EXIF extraction, processing pipeline visualization, and downloadable assets
- **Marketplace Compliance Engine** — Switch between Amazon Pure White, Shopify Plus, and Chrono24 presets with real-time compliance checks

### 📊 Analytics Dashboard
- Total images processed
- Cumulative storage saved (MB)
- Average file size reduction percentage
- Flagged/rejected content count
- Top product category tags

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                             │
│                                                                     │
│   Next.js 14 App Router  ←→  Three.js  ←→  GSAP + Lenis           │
│   React 18 + TypeScript      WebGL 3D      Scroll Physics          │
│   Tailwind CSS               Scenes        Animations              │
└─────────────────┬───────────────────────────────────────────────────┘
                  │  REST API (JSON)
                  │  POST /api/upload
                  │  GET  /api/process
                  │  GET  /api/library
                  │  GET  /api/stats
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     BACKEND (FastAPI + Uvicorn)                      │
│                                                                     │
│   ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│   │ Routers  │→ │   Services   │→ │   Schemas    │  │ Exception │ │
│   │          │  │              │  │  (Pydantic)  │  │ Handlers  │ │
│   │ upload   │  │ cloudinary   │  │              │  │           │ │
│   │ process  │  │ image_proc   │  │ camelCase    │  │ Domain    │ │
│   │ library  │  │ analytics    │  │ DTOs for     │  │ specific  │ │
│   │ stats    │  │ library      │  │ frontend     │  │ errors    │ │
│   │ dashboard│  │              │  │              │  │           │ │
│   └──────────┘  └──────┬───────┘  └──────────────┘  └───────────┘ │
└─────────────────────────┼───────────────────────────────────────────┘
                          │  Cloudinary SDK
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CLOUDINARY CLOUD                                 │
│                                                                     │
│   📁 listinglab/originals/     — Uploaded assets                    │
│   📁 listinglab/processed/     — Transformed variants               │
│                                                                     │
│   🤖 Google Vision Auto-Tagging                                     │
│   🛡️ AWS Rekognition Moderation                                     │
│   ✂️ AI Background Removal                                          │
│   🎯 Content-Aware Smart Cropping                                   │
│   📦 Dynamic Format (AVIF/WebP) + Quality Optimization              │
└─────────────────────────────────────────────────────────────────────┘
```

### Design Patterns

| Pattern | Implementation |
|:--------|:---------------|
| **Layered Service Architecture** | Routers → Services → Cloudinary SDK (no direct SDK calls from routers) |
| **Graceful Fallback** | Paid AI add-ons (tagging, moderation) fail gracefully to plain upload if not subscribed |
| **Performance Sampling** | Analytics caps HEAD probes to 50 images for fast response at scale |
| **Singleton Configuration** | Cloudinary config initializes before any router loads |
| **Domain Exception Hierarchy** | Custom exception classes with HTTP status codes and error codes |
| **CORS Deduplication** | Automatic origin deduplication across dev ports and production URL |

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Python** | 3.10+ | Runtime environment |
| **FastAPI** | ≥ 0.111.0 | High-performance async web framework with auto-generated OpenAPI docs |
| **Uvicorn** | ≥ 0.29.0 | Lightning-fast ASGI server |
| **Cloudinary SDK** | ≥ 1.40.0 | Image upload, transformation URL generation, search, and admin APIs |
| **Pydantic Settings** | ≥ 2.2.0 | Typed configuration management with `.env` file parsing |
| **HTTPX** | ≥ 0.27.0 | Modern HTTP client for HEAD requests to measure real byte savings |
| **python-multipart** | ≥ 0.0.9 | Streaming multipart form-data upload parsing |
| **python-dotenv** | ≥ 1.0.0 | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Next.js** | 14.2.15 | React framework with App Router, SSR, and optimized font loading |
| **React** | 18.3.1 | Component-based UI library |
| **TypeScript** | 5.6.3 | Type-safe development with compile-time verification |
| **Tailwind CSS** | 3.4.13 | Utility-first CSS with custom design tokens |
| **Three.js** | 0.169.0 | WebGL 3D rendering for parametric sculptures and particle systems |
| **GSAP** | 3.12.5 | Professional-grade animation (ScrollTrigger, pinning, scrubbing) |
| **Lenis** | 1.1.14 | Smooth scroll engine with custom easing curves |
| **Lucide React** | 0.453.0 | Consistent icon system |
| **clsx + tailwind-merge** | Latest | Dynamic class name composition with conflict resolution |

---

## 📁 Project Structure

```
ListingLab/
│
├── 📂 backend/                          # FastAPI Python Backend
│   ├── 📂 app/
│   │   ├── __init__.py
│   │   ├── main.py                      # App factory, CORS, router registration
│   │   ├── config.py                    # Pydantic Settings (env vars)
│   │   ├── cloudinary_client.py         # Cloudinary SDK initialization
│   │   │
│   │   ├── 📂 routers/                  # API endpoint controllers
│   │   │   ├── upload.py                # POST /api/upload
│   │   │   ├── process.py               # GET  /api/process
│   │   │   ├── library.py               # GET  /api/library
│   │   │   ├── stats.py                 # GET  /api/stats
│   │   │   └── dashboard.py             # GET  /dashboard (embedded test UI)
│   │   │
│   │   ├── 📂 schemas/                  # Pydantic request/response models
│   │   │   ├── upload.py                # UploadResponse, ModerationInfo
│   │   │   ├── process.py               # ProcessResponse, ImageUrls
│   │   │   ├── library.py               # LibraryItemResponse
│   │   │   └── stats.py                 # StatsResponse
│   │   │
│   │   ├── 📂 services/                 # Business logic layer
│   │   │   ├── cloudinary_service.py    # Cloudinary SDK wrapper (upload, URLs, search)
│   │   │   ├── image_processing.py      # Transformation pipeline & size calculation
│   │   │   ├── analytics_service.py     # Library-wide stats aggregation
│   │   │   └── library_service.py       # Search results → frontend DTOs
│   │   │
│   │   └── 📂 exceptions/              # Error handling
│   │       ├── errors.py                # Domain exception hierarchy
│   │       └── handlers.py              # Global exception handlers
│   │
│   ├── .env.example                     # Backend environment template
│   ├── .gitignore
│   └── requirements.txt                 # Python dependencies
│
├── 📂 frontend/                         # Next.js React Frontend
│   ├── 📂 app/
│   │   ├── page.tsx                     # Main landing page (section composition)
│   │   ├── layout.tsx                   # Root layout (fonts, metadata, providers)
│   │   └── globals.css                  # Custom scrollbar, selection, Lenis overrides
│   │
│   ├── 📂 components/
│   │   ├── 📂 3d/                       # Three.js WebGL components
│   │   │   ├── HeroScene.tsx            # Torus-knot scene with particles & parallax
│   │   │   ├── HeroSceneFallback.tsx    # CSS fallback for non-WebGL devices
│   │   │   └── HeroSculpture.tsx        # 38-slab parametric helical sculpture
│   │   │
│   │   ├── 📂 layout/
│   │   │   ├── Navbar.tsx               # Fixed header with backdrop blur & mobile menu
│   │   │   └── Footer.tsx               # Editorial 5-column footer
│   │   │
│   │   ├── 📂 providers/
│   │   │   └── SmoothScrollProvider.tsx  # Lenis + GSAP ScrollTrigger integration
│   │   │
│   │   ├── 📂 sections/                 # Page sections (scroll-driven)
│   │   │   ├── HeroSection.tsx          # Blueprint grid hero with 3D sculpture
│   │   │   ├── FullscreenBeforeAfterScroll.tsx  # Pinned scroll wipe reveal
│   │   │   ├── NeuralInspectorSection.tsx       # Marquee watermark + capability cards
│   │   │   ├── ParametricVortexSection.tsx      # SVG aperture scroll transition
│   │   │   ├── FeaturesSection.tsx              # Interactive studio simulator
│   │   │   ├── HowItWorksSection.tsx            # 4-stage pipeline with live upload
│   │   │   ├── HorizontalShowcaseSection.tsx    # Horizontal scroll product gallery
│   │   │   ├── ScrollGallery.tsx                # Parallax product card gallery
│   │   │   ├── PlaygroundSection.tsx            # Live before/after experiment console
│   │   │   ├── StatsStrip.tsx                   # Animated metrics strip
│   │   │   └── ContactSection.tsx               # Editorial onboarding form
│   │   │
│   │   └── 📂 ui/                       # Reusable UI primitives
│   │       ├── BeforeAfterSlider.tsx     # Drag-to-compare image slider
│   │       ├── Button.tsx               # Polymorphic button (4 variants, 3 sizes)
│   │       └── Badge.tsx                # Status badge (5 variants)
│   │
│   ├── 📂 lib/
│   │   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│   │
│   ├── 📂 public/
│   │   └── images/                      # Static image assets
│   │
│   ├── .env.example                     # Frontend environment template
│   ├── .gitignore
│   ├── next.config.mjs                  # Next.js config (remote image patterns)
│   ├── package.json                     # Node dependencies
│   ├── tailwind.config.ts               # Custom design tokens & theme
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── postcss.config.js
│   └── postcss.config.mjs
│
├── 📂 docs/
│   └── api.md                           # API documentation
│
├── DESIGN.md                            # Design system specification
├── README.md                            # ← You are here
├── .gitignore                           # Root gitignore
├── code.html                            # Standalone code reference
├── HOMEPAGE.mp4                         # Homepage demo video
└── ZANGO.mp4                            # Product demo video
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18+ and **npm** 9+
- A **Cloudinary** account ([free tier](https://cloudinary.com/users/register_free))
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/RoNnY125-coder/ListingLab.git
cd ListingLab
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env` with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

```bash
# Start the backend server
uvicorn app.main:app --reload --port 8000
```

The backend will be available at:
- **API**: `http://localhost:8000`
- **Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **Test Dashboard**: `http://localhost:8000/dashboard`
- **Health Check**: `http://localhost:8000/health`

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

```bash
# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 4. Verify Everything Works

1. Open `http://localhost:3000` — you should see the immersive landing page with the 3D sculpture
2. Scroll to the **"How It Works"** section and upload a product image
3. Watch the AI pipeline process your image in real-time
4. Check `http://localhost:8000/docs` for the interactive API documentation

---

## 📡 API Reference

### `POST /api/upload`

Upload a product image for AI processing.

**Request:**
```
Content-Type: multipart/form-data
Body: file (image/*, max 20 MB)
```

**Response** `200 OK`:
```json
{
  "publicId": "listinglab/originals/sneaker_abc123",
  "bytes": 2458901,
  "width": 4032,
  "height": 3024,
  "tags": ["shoe", "sneaker", "fashion", "footwear"],
  "moderation": {
    "status": "approved"
  }
}
```

**Error Codes:** `400 INVALID_FILE` · `413 FILE_TOO_LARGE` · `500 UPLOAD_FAILED` · `503 CLOUDINARY_UNAVAILABLE`

---

### `GET /api/process?publicId={id}`

Generate all platform-optimized transformation URLs with real byte savings calculation.

**Response** `200 OK`:
```json
{
  "urls": {
    "original": "https://res.cloudinary.com/.../original.jpg",
    "optimized": "https://res.cloudinary.com/.../f_auto,q_auto/original.jpg",
    "instagram": "https://res.cloudinary.com/.../c_fill,g_auto,w_1080,h_1080/...",
    "feed": "https://res.cloudinary.com/.../c_fill,g_auto,w_1080,h_1350/...",
    "marketplace": "https://res.cloudinary.com/.../c_fill,g_auto,w_900,h_1200/...",
    "banner": "https://res.cloudinary.com/.../c_fill,g_auto,w_1600,h_900/..."
  },
  "sizeSavedPct": 62.4
}
```

**Error Codes:** `400 INVALID_FILE` · `404 ASSET_NOT_FOUND` · `503 CLOUDINARY_UNAVAILABLE`

---

### `GET /api/library`

Query uploaded images with optional filtering.

**Query Parameters:**
| Parameter | Type | Description |
|:----------|:-----|:------------|
| `tag` | string (optional) | Filter by AI-generated tag |
| `status` | string (optional) | Filter by moderation status (`approved`, `rejected`, `pending`) |

**Response** `200 OK`:
```json
[
  {
    "publicId": "listinglab/originals/sneaker_abc123",
    "tags": ["shoe", "sneaker"],
    "moderation": { "status": "approved" },
    "createdAt": "2025-01-15T10:30:00Z",
    "thumbUrl": "https://res.cloudinary.com/.../c_fill,w_400,h_400/..."
  }
]
```

---

### `GET /api/stats`

Aggregate analytics across the entire image library.

**Response** `200 OK`:
```json
{
  "processed": 847,
  "mbSaved": 1243.7,
  "avgReductionPct": 58.3,
  "flagged": 12,
  "topTags": ["footwear", "electronics", "jewelry"]
}
```

---

### `GET /health`

Liveness probe for deployment health checks.

**Response** `200 OK`:
```json
{
  "status": "ok",
  "service": "listinglab-backend"
}
```

---

## 🤖 AI & ML Capabilities

ListingLab leverages multiple AI/ML services through Cloudinary's ecosystem:

### 1. Google Vision Auto-Tagging
```
categorization="google_tagging", auto_tagging=0.6
```
Automatically analyzes uploaded images and generates semantic product tags (e.g., `shoe`, `leather`, `watch`, `electronics`) at a 60% confidence threshold. Tags are searchable and filterable via the Library API.

### 2. AWS Rekognition Content Moderation
```
moderation="aws_rek"
```
Screens every upload for prohibited or inappropriate content, assigning `approved`, `rejected`, or `pending` status. Ensures catalog integrity without manual review.

### 3. AI Content-Aware Gravity
```
crop="fill", gravity="auto"
```
Analyzes saliency, edges, and subject boundaries to intelligently center products during aspect ratio conversions — preventing cropped-out products across Instagram squares, feed portraits, and banner landscapes.

### 4. Neural Background Removal
```
effect="background_removal"
```
Sub-pixel alpha matting isolates the foreground product from any background — outdoor, cluttered, or uneven lighting — producing transparent PNG masks for studio compositing.

### 5. Perceptual Quality Optimization
```
quality="auto"
```
ML-driven compression algorithm evaluates image structure, texture density, and color complexity to find the optimal quality-to-size ratio. Achieves **up to 68% file size reduction** without human-perceptible quality loss.

### 6. Dynamic Format Selection
```
fetch_format="auto"
```
Serves modern formats (AVIF, WebP, JPEG XL) based on the requesting browser's capabilities, maximizing compression efficiency transparently.

> **💡 Graceful Fallback:** If your Cloudinary account doesn't have Google Tagging or AWS Rekognition add-ons enabled, ListingLab automatically falls back to standard uploads — no errors, no broken workflows.

---

## 🎨 Design System

ListingLab follows the **"Luminescent Precision"** design philosophy — combining utilitarian minimalism with luxury editorial aesthetics.

### Color Palette

| Token | Hex | Usage |
|:------|:----|:------|
| `bg` | `#14100C` | Primary deep charcoal ground |
| `surface` | `#1D1712` | Elevated card surfaces |
| `surface-raised` | `#26201A` | Higher elevation containers |
| `beige` | `#E8DCC8` | Archival sand — headlines, hero canvas |
| `beige-dim` | `#B8AC96` | Muted body text on dark |
| `orange` | `#FF7A30` | Burnt orange accent — CTAs, active states |
| `orange-glow` | `rgba(255,122,48,0.35)` | Ambient glow effects |

### Typography

| Role | Font | Usage |
|:-----|:-----|:------|
| **Headlines** | Space Grotesk | Hero titles, section headers, navigation |
| **Body** | Inter | Editorial copy, descriptions, form labels |
| **Monospace** | JetBrains Mono | Telemetry, badges, API responses, data metrics |

### Motion Design

| Technique | Implementation |
|:----------|:---------------|
| **Smooth Scroll** | Lenis (duration 1.1, exponential ease) synced to GSAP ticker |
| **Scroll Scrubbing** | GSAP ScrollTrigger with pinned sections and progress-mapped transforms |
| **3D Parallax** | Mouse position → lerped camera/group offsets in Three.js scenes |
| **Aperture Transition** | 32 concentric SVG rectangles rotating and expanding on scroll |
| **Infinite Marquee** | 80-second continuous `xPercent` GSAP tween |
| **Reduced Motion** | Respects `prefers-reduced-motion` media query |

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `CLOUDINARY_CLOUD_NAME` | ✅ Yes | — | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ Yes | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ Yes | — | Cloudinary API secret |
| `FRONTEND_URL` | No | `http://localhost:3000` | Allowed CORS origin for production |

### Frontend (`frontend/.env.local`)

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `CLOUDINARY_CLOUD_NAME` | ✅ Yes | — | Cloudinary cloud name for media delivery |
| `CLOUDINARY_API_KEY` | ✅ Yes | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ Yes | — | Cloudinary API secret (server-side only) |
| `FRONTEND_URL` | No | `http://localhost:3000` | Frontend origin URL |

---

## 🛡️ Error Handling

The backend implements a **domain-specific exception hierarchy** with global handlers:

| Exception | HTTP Status | Error Code | Trigger |
|:----------|:------------|:-----------|:--------|
| `InvalidFileException` | 400 | `INVALID_FILE` | Non-image MIME type or missing file |
| `FileTooLargeException` | 413 | `FILE_TOO_LARGE` | Upload exceeds 20 MB |
| `AssetNotFoundException` | 404 | `ASSET_NOT_FOUND` | Public ID doesn't exist in Cloudinary |
| `CloudinaryUnavailableException` | 503 | `CLOUDINARY_UNAVAILABLE` | Cloudinary API unreachable |
| `UploadFailedException` | 500 | `UPLOAD_FAILED` | Unexpected upload error |

All errors return a consistent JSON envelope:
```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description"
}
```

> **🔒 Security:** Stack traces, file paths, and API credentials are never exposed to clients.

---

## 🖥️ Frontend Sections Deep Dive

The landing page is composed of cinematic, scroll-driven sections:

| # | Section | Key Feature |
|:--|:--------|:------------|
| 1 | **Hero** | Blueprint grid canvas with embedded 3D parametric sculpture, editorial manifesto, and entry CTAs |
| 2 | **Before/After** | Fullscreen pinned scroll-scrubbed wipe revealing raw → studio-grade transformation |
| 3 | **Neural Inspector** | Giant marquee watermark, floating glass capability cards with staggered entrance |
| 4 | **Parametric Vortex** | 32-ring SVG aperture that rotates and expands during scroll — a camera shutter transition |
| 5 | **Features** | Interactive "Commercial Consistency Engine" with live canvas controls (background, framing, shadow, RGB lock) |
| 6 | **How It Works** | 4-stage pipeline: Raw Ingestion → Neural Calibration → Rule Engine → Catalog Deployment, with real file upload |
| 7 | **Contact** | Minimalist editorial form with instant workspace provisioning confirmation |
| 8 | **Footer** | 5-column archival directory |

### Three.js 3D Scenes

**Helical Sculpture** (`HeroSculpture.tsx`):
- 38 stacked `BoxGeometry` slabs with procedural sine-wave color interpolation
- Helical rotation: `angle = (i / slabCount) × π × 1.8`
- Triple animation: idle undulation + mouse parallax + scroll scrub
- Studio lighting rig: ambient fill, beige key light, burnt orange rim light

**Torus-Knot Scene** (`HeroScene.tsx`):
- `MeshPhysicalMaterial` with clearcoat and reflectivity
- Additive glow halo ring
- 120-particle dust field with dual-color buffer attributes
- ACES Filmic tone mapping
- Automatic WebGL detection with CSS fallback

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request against `main`

### Branch Strategy

| Branch | Purpose |
|:-------|:--------|
| `main` | Production-ready merged monorepo |
| `backend` | Legacy standalone backend (archived) |
| `frontend` | Legacy standalone frontend (archived) |

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Formatting, no code change
- `refactor:` Code restructuring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Build process or auxiliary tool changes

---

## 📄 License

This project is open-source. See the repository for license details.

---

<p align="center">
  <strong>Built with 🔥 by the ListingLab Team</strong>
  <br />
  <sub>Transforming raw captures into commercial masterpieces — one pixel at a time.</sub>
</p>
