# Nexora — Multi-Vendor Sales Portal

A control-tower console for multi-vendor commerce: Super Admin, Vendor, Field
Sales Officer, and Customer roles over a normalized MySQL schema, with a
premium 3D/glassmorphism React frontend.

**Status of this build:** the platform foundation (auth, RBAC, schema, Docker,
landing page, Super Admin dashboard + vendor approvals) is complete and
runnable end to end. Vendor/Customer/Field-Officer portals and the chat system
are scaffolded in the schema and stubbed in the UI — see "What's built vs.
what's next" at the bottom.

---

## Documentation

The full client-approved requirements document lives at [`docs/SRD.md`](docs/SRD.md) — project overview, scope per module (Client/Seller, Field Sales Officer, Super Admin, Chat), user roles, feature list, database collections, security, and timeline, plus a note reconciling the SRD's specified stack (MongoDB/Mongoose) against this codebase's actual stack (MySQL/Prisma).

---

## 1. Prerequisites

- Node.js 20+
- MySQL 8+ (local install, or use the provided Docker Compose)
- npm

## 2. Clone and install

```bash
cd nexora/backend && npm install
cd ../frontend && npm install
```

## 3. Configure the database

**Option A — Docker (fastest):**

```bash
cd nexora
docker compose up -d mysql
```

This starts MySQL on `localhost:3306` with database `nexora_db`, user
`nexora_user`, password `nexora_pass` (matches the `.env.example` default).

**Option B — local MySQL:**

```sql
CREATE DATABASE nexora_db;
CREATE USER 'nexora_user'@'%' IDENTIFIED BY 'nexora_pass';
GRANT ALL PRIVILEGES ON nexora_db.* TO 'nexora_user'@'%';
FLUSH PRIVILEGES;
```

## 4. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` — at minimum set real values for `JWT_ACCESS_SECRET` and
`JWT_REFRESH_SECRET` (any long random string; `openssl rand -hex 32` works).

## 5. Run migrations, apply triggers/views, and seed data

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate

# Optional but recommended — adds inventory triggers, a revenue view,
# and a rating stored procedure that Prisma's schema DSL can't express:
mysql -u nexora_user -p nexora_db < prisma/sql/extras.sql

npm run seed
```

Seed creates:
- Super Admin: `admin@nexora.dev` / `Passw0rd!`
- 3 sample vendors (2 approved, 1 pending — try the approval flow)
- 5 sample products with inventory
- 1 sample customer + delivered order

## 6. Start the backend

```bash
cd backend
npm run dev
```

API runs on `http://localhost:5000`. Swagger docs at
`http://localhost:5000/api/docs`. Health check at `/api/health`.

## 7. Start the frontend

```bash
cd frontend
npm run dev
```

App runs on `http://localhost:5173` (Vite proxies `/api` to the backend).

## 8. Log in

Go to `http://localhost:5173/login`, sign in as `admin@nexora.dev` /
`Passw0rd!`, and you'll land on the Super Admin console.

---

## Running tests

```bash
cd backend
npm run dev          # in one terminal — tests hit the running API
npm test              # in another terminal
```

---

## Full-stack deployment with Docker Compose

From the repo root:

```bash
cp backend/.env.example backend/.env   # set real JWT secrets first
docker compose up -d --build
```

This builds and runs:
- `mysql` — persistent volume, healthchecked
- `backend` — runs `prisma migrate deploy` on boot, then starts the API on `:5000`
- `frontend` — production Vite build served by nginx on `:8080`, proxying `/api` to the backend

After the stack is up, apply the raw SQL extras once:

```bash
docker compose exec mysql mysql -u nexora_user -pnexora_pass nexora_db < backend/prisma/sql/extras.sql
docker compose exec backend node prisma/seed.js
```

Visit `http://localhost:8080`.

### Deploying to a real environment

- **Database:** point `DATABASE_URL` at a managed MySQL instance (PlanetScale, RDS, Cloud SQL). Run `prisma migrate deploy` (not `migrate dev`) in CI/CD.
- **Backend:** deploy the `backend` image to any container host (Render, Fly.io, ECS, a VM). Set all secrets from `.env.example` as real environment variables — never commit `.env`.
- **Frontend:** the `frontend` Docker image is a static nginx build; deploy it to any container host, or run `npm run build` and upload `dist/` to a static host (Vercel, Netlify, S3+CloudFront) with `/api` reverse-proxied to the backend.
- **File uploads:** wire the `CLOUDINARY_*` env vars for product image uploads.
- **Payments:** wire `STRIPE_SECRET_KEY` or `RAZORPAY_KEY_*` before enabling checkout in production.

---

## Project structure

```
nexora/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # all core tables, relations, indexes
│   │   ├── seed.js
│   │   └── sql/extras.sql      # triggers, view, stored procedure
│   ├── src/
│   │   ├── config/prisma.js
│   │   ├── controllers/        # auth.controller.js, admin.controller.js
│   │   ├── middleware/auth.js  # JWT verify + RBAC
│   │   ├── routes/
│   │   └── server.js           # helmet, CORS, rate limiting, sockets, swagger
│   └── tests/auth.test.js
├── frontend/
│   └── src/
│       ├── components/         # GlassCard, OrbitScene (3D hero), AnimatedCounter, admin/*
│       ├── pages/               # Landing, Login, admin/*
│       ├── layouts/AdminLayout.jsx
│       ├── store/               # Redux Toolkit (auth, ui)
│       └── lib/api.js           # axios + silent refresh-token flow
└── docker-compose.yml
```

## What's built vs. what's next

**Built and working end-to-end:**
- JWT access + refresh token auth, bcrypt hashing, RBAC middleware
- Public self-registration (`/register`) for Customer, Seller/Vendor, and Field Sales Officer roles, with role-specific fields (store name + GST for sellers, region for field officers) and auto-created Vendor/Customer/FieldSalesOfficer records; new vendors land in `PENDING` status for Super Admin approval
- Full relational schema (users, roles, vendors, customers, field sales officers, products, categories, brands, inventory, orders, order_items, payments, transactions, carts, wishlists, reviews, coupons, notifications, activity_logs) with indexes and soft deletes
- MySQL triggers (auto stock decrement/restore), a revenue view, a stored procedure
- Super Admin: live dashboard (KPIs, revenue trend chart, recent orders), vendor approval workflow
- 3D animated landing page (orbital hero scene, glassmorphism, hover tilt cards, animated counters, testimonials, pricing, FAQ)
- Security stack: helmet, CORS, rate limiting, XSS sanitization, input validation
- Docker Compose for the full stack; Swagger docs; seed data; integration tests

**Scaffolded in the schema, not yet built in the UI (next phases):**
- Vendor portal (product/inventory management, vendor-side analytics)
- Customer storefront (browse/cart/checkout/wallet/order tracking)
- Field Sales Officer app (GPS check-in, leads, commissions)
- WhatsApp-style chat system (chat_rooms/messages tables exist; Socket.io server is wired but no chat UI yet)
- AI recommendations/chatbot, voice search, barcode scanning, multi-currency/multi-language
