# Campaign Intelligence Platform

A full-stack web application built for an advertising agency to manage campaigns, generate AI creative briefs, and monitor real-time performance alerts.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Charts | Recharts |
| Backend | Node.js + Express.js |
| Database | PostgreSQL + Prisma ORM |
| Real-time | Socket.io |
| AI Service | Simulated (Anthropic Claude-ready) |
| PDF Export | jsPDF + html2canvas |

---

## Project Structure
campaign-platform/
├── frontend/        # React 18 + Vite + Tailwind
├── backend/         # Express.js REST API
└── ai-service/      # AI Content Generation Microservice

---

## Features

### Dashboard (Task 1.1)
- KPI cards: Impressions, Clicks, CTR, Conversions, Spend, ROAS
- 30-day performance line chart (Recharts)
- Sortable & filterable campaign table with status badges
- Date range picker (Last 7d, 30d, 90d)
- Dark mode (persisted in localStorage)
- Fully responsive (1440px, 1024px, 768px)

### AI Creative Brief Builder (Task 1.2)
- 4-step form with validation
- Simulated AI output (Claude-ready)
- Export as PDF (jsPDF + html2canvas)

### Campaign REST API (Task 2.1)
- Full CRUD with JWT auth
- Filter, sort, pagination
- Soft delete
- Rate limiting (100 req/min)
- Input validation

### AI Microservice (Task 2.2)
- POST /generate/copy (SSE streaming)
- POST /generate/social
- POST /generate/hashtags
- GET /health
- Docker ready

### Real-Time Notifications (Task 2.3)
- WebSocket via Socket.io
- Configurable alert rules per campaign
- Bell icon + unread badge + dropdown
- Alert history in PostgreSQL

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (or Neon account)

---

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/campaign-platform.git
cd campaign-platform
```

---

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your DATABASE_URL and JWT_SECRET in .env
npx prisma migrate dev
npm run seed
npm run dev
```

---

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### 4. AI Microservice Setup
```bash
cd ai-service
npm install
cp .env.example .env
npm run dev
```

---

### 5. Docker (AI Microservice)
```bash
cd ai-service
docker-compose up --build
```

---

## API Documentation

- OpenAPI YAML: `backend/openapi.yaml`
- Postman Collection: `backend/postman_collection.json`
- Schema SQL: `backend/prisma/schema.sql`

### Test Credentials
Email:    admin@agency.com
Password: admin123


---

## Deployment

| Service | Platform |
|---------|---------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon (PostgreSQL) |

---

## Environment Variables

See `.env.example` files in each folder.

**Never commit real `.env` files.**