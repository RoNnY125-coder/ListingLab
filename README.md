# ListingLab

A full-stack application for intelligent image listing and processing.

## Project Structure

```
ListingLab/
├── backend/          # FastAPI backend with Cloudinary integration
│   ├── app/          # Python application code
│   │   ├── routers/  # API endpoints
│   │   ├── schemas/  # Pydantic models
│   │   ├── services/ # Business logic
│   │   └── exceptions/
│   └── requirements.txt
├── frontend/         # Next.js frontend with React & Tailwind CSS
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components (UI, layout, sections, 3D)
│   ├── lib/          # Utility functions
│   └── public/       # Static assets
├── docs/             # API documentation
├── DESIGN.md         # Design document
└── README.md
```

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tech Stack
- **Backend**: Python, FastAPI, Cloudinary
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Three.js
