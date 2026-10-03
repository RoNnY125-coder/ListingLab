<p align="center">
  <img src="https://img.shields.io/badge/ListingLab-AI%20Photography%20Engine-FF7A30?style=for-the-badge&labelColor=14100C" alt="ListingLab" />
</p>

<h1 align="center">ListingLab</h1>

<p align="center">
  <strong>Turn raw product photos into marketplace-ready, studio-grade images — in seconds.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Cloudinary-AI-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

---

## What is ListingLab?

ListingLab is an AI-powered commercial photography engine. Upload a phone snap of any product — shoes, watches, bags, electronics — and get back polished, platform-ready catalog images with backgrounds removed, lighting corrected, and formats optimized for every marketplace.

**No photography skills required. No Photoshop. Just upload and ship.**

| Upload This | Get This |
|:------------|:---------|
| 📱 Phone snaps, messy backgrounds, bad lighting | 🎨 Studio-grade images, transparent backgrounds, perfect crops |
| 🖼️ One raw image | 📦 6 optimized variants (Instagram, Feed, Marketplace, Banner + more) |

---

## ✨ Key Features

- **🧠 AI Background Removal** — Instantly isolate products from any background
- **🏷️ Auto-Tagging** — AI detects and tags product categories automatically
- **🛡️ Content Moderation** — Automated safety screening on every upload
- **✂️ Smart Cropping** — Products stay centered across every aspect ratio
- **📦 Multi-Platform Export** — One upload → optimized images for Amazon, Shopify, Instagram & more
- **⚡ Up to 68% Smaller Files** — ML-driven compression with zero visible quality loss
- **🎬 Immersive 3D Landing Page** — Cinematic scroll animations, interactive studio simulator, and live before/after comparisons

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A free [Cloudinary](https://cloudinary.com/users/register_free) account

### 1. Clone

```bash
git clone https://github.com/RoNnY125-coder/ListingLab.git
cd ListingLab
```

### 2. Start the Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
cp .env.example .env          # ← Add your Cloudinary keys here
uvicorn app.main:app --reload --port 8000
```

### 3. Start the Frontend

```bash
cd frontend
npm install
cp .env.example .env.local    # ← Add your Cloudinary keys here
npm run dev
```

### 4. Open

- **App** → [http://localhost:3000](http://localhost:3000)
- **API Docs** → [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚙️ Environment Variables

Create `.env` (backend) and `.env.local` (frontend) from the provided `.env.example` files. You'll need:

| Variable | Description |
|:---------|:------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL (defaults to `http://localhost:3000`) |

---

## 📡 API Endpoints

| Method | Endpoint | What It Does |
|:-------|:---------|:-------------|
| `POST` | `/api/upload` | Upload a product image (max 20 MB) |
| `GET` | `/api/process?publicId=...` | Get optimized URLs for all platforms |
| `GET` | `/api/library` | Browse uploaded images (filter by tag/status) |
| `GET` | `/api/stats` | View analytics (images processed, storage saved, top tags) |
| `GET` | `/health` | Health check |

Full interactive docs available at `/docs` (Swagger) or `/redoc` when the backend is running.

---

## 📁 Project Structure

```
ListingLab/
├── backend/          # Python FastAPI server
│   ├── app/          # Routes, services, schemas, error handling
│   └── requirements.txt
├── frontend/         # Next.js 14 + React + Tailwind + Three.js
│   ├── app/          # Pages and layouts
│   ├── components/   # UI components, 3D scenes, page sections
│   └── package.json
├── docs/             # API documentation
├── DESIGN.md         # Design system reference
└── README.md
```

---

## 🛠 Built With

| | Technology | Role |
|:--|:-----------|:-----|
| ⚡ | **FastAPI** + **Uvicorn** | Backend API server |
| ☁️ | **Cloudinary** | AI image processing, storage & CDN |
| ⚛️ | **Next.js 14** + **React 18** | Frontend framework |
| 🎨 | **Tailwind CSS** | Styling |
| 🧊 | **Three.js** | 3D visuals & WebGL scenes |
| 🎬 | **GSAP** + **Lenis** | Scroll animations & smooth scrolling |
| 📝 | **TypeScript** | Type safety |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push & open a Pull Request against `main`

---

<p align="center">
  <strong>Built with 🔥 by the ListingLab Team</strong>
  <br />
  <sub>Raw captures → Commercial masterpieces, one pixel at a time.</sub>
</p>
