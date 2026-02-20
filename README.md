# Product & User Management (Next.js + Prisma + PostgreSQL)

Aplikasi dashboard modern untuk mengelola produk dan user menggunakan:

- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- Next.js API Routes sebagai backend
- Tailwind CSS untuk UI modern

## Fitur

- Dashboard overview analytics
- CRUD User melalui `/api/users`
- CRUD Product melalui `/api/products`
- UI management untuk user dan produk
- AI Support chat pada `/dashboard/ai-support` melalui `/api/ai/chat`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Salin env:
   ```bash
   cp .env.example .env
   ```
3. Jalankan migrasi dan generate prisma client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. (Opsional) Seed data awal:
   ```bash
   npm run prisma:seed
   ```
5. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

Buka `http://localhost:3000`.
