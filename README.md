# Barbz & Co. Creative — Website

**Your Vision. My Design. One Impactful Story.**

A premium creative-branding-studio website: brand identity & web design
services on one side, a custom-branded apparel shop on the other — built
as one seamless experience.

## Stack

- **Frontend:** React + TypeScript + Tailwind CSS + React Router (Vite)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Auth:** JWT

## Project structure

```
barbz-and-co/
  frontend/   React app — all customer-facing pages
  backend/    Express API — auth, products, orders, bookings, quotes, blog, contact
```

## Getting started

### 1. Database

Create a PostgreSQL database, then apply the schema:

```bash
cd backend
cp .env.example .env      # fill in DATABASE_URL, JWT_SECRET, etc.
npm install
npm run migrate           # runs src/db/schema.sql against DATABASE_URL
```

### 2. Backend API

```bash
cd backend
npm run dev                # http://localhost:4000
```

Health check: `GET /api/health`

Key routes (all under `/api`):

| Route | Notes |
|---|---|
| `POST /auth/register`, `POST /auth/login` | Returns `{ user, token }` |
| `GET /products`, `GET /products/:id` | Public; `POST` requires admin |
| `POST /custom-orders` | Public — accepts multipart form with `artwork` file field |
| `GET /custom-orders` | Requires auth (own orders, or all for admin) |
| `POST /bookings`, `GET /bookings` | Consultation booking |
| `POST /quotes` | Quote requests; `GET` is admin-only |
| `GET /blog`, `GET /blog/:slug`, `POST /blog` | Blog; write is admin-only |
| `GET /testimonials`, `POST /testimonials` | Read published; submissions need admin publish |
| `POST /contact` | Contact form messages |

Uploaded artwork is written to `backend/uploads/` and served at `/uploads/<filename>`.
For production, swap the local disk storage in `src/middleware/upload.ts` for S3 or
Cloudinary — the controller only needs a URL back.

### 3. Frontend

```bash
cd frontend
cp .env.example .env      # points VITE_API_URL at the backend
npm install
npm run dev                # http://localhost:5173
```

The dev server proxies `/api` to `http://localhost:4000` (see `vite.config.ts`), so the
frontend and backend can also just be run together without touching `VITE_API_URL`.

## Brand system (already wired into `tailwind.config.js`)

| Colour | Hex | Meaning |
|---|---|---|
| Royal Purple (primary) | `#3B0764` | Creativity, vision, bold thinking |
| Sky Blue (secondary) | `#4FB6E8` | Trust, clarity, professionalism |
| Metallic Gold (accent) | `#C9A227` | Excellence, prestige — used sparingly |
| White (neutral) | `#FFFFFF` | Simplicity, elegance, breathing room |

Fonts: **Montserrat** (primary), **Poppins** (secondary/body), **Cormorant Garamond**
(accent, for premium headings/quotes) — loaded via Google Fonts in `index.html`.

## What's scaffolded vs. what's next

Done and working end-to-end:
- All public pages (Home, About, Services, Shop, Portfolio, Custom Order, Booking,
  Quote, Blog, FAQs, Contact) with routing, responsive layout, and brand styling
- Custom order builder (apparel type, colours, placement, sizes/quantities, artwork
  upload, contact info) posting to the API
- Full Express API with JWT auth, PostgreSQL schema, and admin-gated write routes
- Contact form, booking, and quote request flows wired to the backend

Not yet built — natural next steps:
- Payments/checkout for the plain-product shop (Stripe/Paystack/M-Pesa)
- Admin dashboard UI (the API already supports admin actions like publishing
  testimonials, updating order status, and creating blog posts/products)
- Real product photography/mockups — `src/api/seedData.ts` currently points at
  placeholder image paths under `/assets/`
- Automated mockup generation for custom orders (currently a manual step: admin
  reviews the uploaded artwork and sends a mockup back to the client)
- Email/WhatsApp notifications when a booking, quote, or custom order comes in
