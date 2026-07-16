# NowArt Plicell — Online Curtain Store

A full-stack e-commerce web application for an online curtain / window-treatment retailer, built with Next.js 15 (App Router + Pages Router), TypeScript, Prisma ORM, and MySQL.

> `package.json` name field: `plise`. Public-facing branding in the codebase (page titles, seed data, legal-page content) is "NowArt" / "NowArt Plicell".

---

## Overview

The application is a customer-facing storefront for curtains (Plicell, Zebra, Stor, and "Ahsap-Jaluzi" / wood venetian blinds), plus an admin panel for managing products, orders, blog posts, and users. It uses:

- **Next.js App Router** for the storefront, admin panel, and most API routes
- **Next.js Pages Router** for a single legacy API route (`pages/api/payment.ts`) that integrates with the iyzico payment gateway
- **Prisma ORM** against a **MySQL** database
- **NextAuth.js (Credentials provider)** with **bcrypt** password hashing for authentication

This README documents only what is verifiable in the current source tree. Sections or details that could not be confirmed from the code are called out explicitly rather than assumed.

---

## Features

Verified from `app/`, `components/`, and `app/api/` source:

### Customer-facing
- Product catalog with category/sub-category browsing (`app/products`, `components/products/filter.tsx`)
- Product detail pages (`app/products/[id]`) with reviews (`app/api/review`)
- Full-text-style search (`app/search`, `app/api/products` filtering)
- Shopping cart backed by the `CartItem` table, scoped to the logged-in user (`app/api/cart`)
- Favorites / wishlist (`app/api/favorites`)
- Multi-step checkout (Address → Cargo → Payment) using `components/checkout/*`
- iyzico card payment via `pages/api/payment.ts`, with order creation on success (`app/api/order`)
- Order history and self-service order cancellation (`app/api/order/user`)
- User profile editing and saved addresses (`app/api/user`, `app/api/address`)
- Email/password registration and login (NextAuth Credentials provider)
- "Forgot password" / "reset password" email flow (`app/api/account/forgot_password`, `app/api/account/reset_password`)
- Blog listing and detail pages (`app/blog`)
- Turkish address cascading dropdowns backed by the public `turkiyeapi.dev` API (`app/api/location/ilceler/[ilId]`, `app/api/location/mahalleler/[ilceId]`) — **this calls an external third-party API at request time, not local data**, despite `public/city.json` also existing in the repo
- Static informational, institutional, and legal pages (`app/info/*`, `app/institutional/*`, `app/contracts/*`), including a KVKK (Turkish data-protection law) page and a downloadable PDF (`public/docs/NowartPlicell.pdf`)

### Admin panel (`app/admin/*`)
- Dashboard, product management, order management, blog management, and user list pages
- Each admin page checks `session.user.role === "ADMIN"` server-side and redirects to `/admin` (the login page) if not authenticated as an admin — **see the Authentication and Security sections below: this page-level check is not consistently mirrored in the underlying API routes.**

### Not verifiable / not present
- No `LICENSE` file exists in the repository, despite the previous README claiming an MIT license — omitted below.
- No screenshot images exist for documentation purposes (only product/hero/UI photography used by the live site) — Screenshots section omitted.
- The `/seed` directory contains `products.json`, `blogs.json`, and `orders.json`, but **`prisma/seed.ts` does not read or reference any of these files** — see Database section.

---

## Technology Stack

| Category | Technology | Notes (from `package.json`) |
|---|---|---|
| Framework | Next.js 15.5.9 | `next dev --turbopack`, `next build --turbopack` |
| UI library | React 19.1.0 | |
| Language | TypeScript 5 | |
| Styling | Tailwind CSS 4 | via `@tailwindcss/postcss` |
| UI primitives | Radix UI | ~20 `@radix-ui/react-*` packages, shadcn/ui "new-york" style (`components.json`) |
| Animation | Framer Motion 12.23.22 | |
| Icons | Lucide React 0.544.0 | |
| Carousel | Embla Carousel React 8.6.0 | |
| Forms | React Hook Form 7.64.0 + `@hookform/resolvers` | |
| Validation | Zod 4.1.11 | |
| Charts | Recharts 2.15.4 | admin dashboard |
| Toasts | Sonner 2.0.7 | |
| Theming | next-themes 0.4.6 | |
| Dates | date-fns 4.1.0 | |
| ORM | Prisma 6.18.0 (`prisma`, `@prisma/client`) | `@prisma/client` is a **devDependency**, not a regular dependency — confirmed present |
| Database | MySQL | `provider = "mysql"` in `prisma/schema.prisma` |
| Auth | next-auth 4.24.11 | Credentials provider, JWT session strategy |
| Password hashing | bcrypt 6.0.0 | |
| Email | Nodemailer 6.10.1 | custom SMTP host/port |
| Images | `cloudinary` 2.8.0 SDK | used directly in `app/api/upload/route.ts` |
| Payments | iyzipay 2.0.64 | Turkish payment gateway |
| Seed runner | tsx 4.20.6 | runs `prisma/seed.ts` |
| Unused (present in `package.json`, no code import found) | `next-session`, `sharp`, `next-cloudinary`, `formidable` | see note below |

**Dead/unused dependency note:** the following packages are listed in `package.json` but have **no matching import** anywhere in `.ts`/`.tsx` source (verified by repo-wide search):
- `next-session` — `lib/session.ts` configures it, but nothing imports `lib/session.ts`; all real session handling goes through NextAuth.
- `sharp` — not imported anywhere; `app/api/upload/route.ts` even has a comment noting the Cloudinary upload is done "without sharp" (`sharp olmadan`).
- `next-cloudinary` — not imported anywhere; the actual Cloudinary integration in `app/api/upload/route.ts` uses the plain `cloudinary` SDK directly.
- `formidable` — no `import ... from "formidable"` found; only its type declarations (`types/formidable.d.ts`) exist. `pages/api/payment.ts` reads `req.body` directly and does not use `formidable`.

---

## Architecture

- **App Router (`app/`)** serves the storefront pages, the admin panel, and almost all API routes (`app/api/**/route.ts`), using Next.js Route Handlers (`GET`/`POST`/`PUT`/`PATCH`/`DELETE` exports).
- **Pages Router (`pages/api/payment.ts`)** hosts exactly one API endpoint — the iyzico payment call — kept on the legacy Pages Router API format.
- **Prisma** (`prisma/schema.prisma`) defines the MySQL schema. The generated Prisma Client is emitted to a **custom output path**, `lib/generated/prisma` (not the default `node_modules/.prisma/client`), per the `generator client { output = "../lib/generated/prisma" }` block. `lib/db.ts` imports from `@/lib/generated/prisma` and exports a singleton `PrismaClient`, cached on `globalThis` in non-production to avoid exhausting connections during hot reload.
- **Authentication** is handled by NextAuth (`next-auth/next`, `getServerSession`) using a Credentials provider defined in two places — `auth.ts` at the project root and `lib/auth.ts` (`authOptions`) — both implementing the same email/password + bcrypt logic (see Authentication section).
- **External API dependency:** the district/neighborhood lookup routes (`app/api/location/*`) proxy to the public `https://api.turkiyeapi.dev` service at request time rather than reading from the bundled `public/city.json`.

```
Browser
   │
   ▼
Next.js 15 (Turbopack dev/build)
 ├─ App Router pages (storefront, /admin/*)
 ├─ App Router API routes (app/api/**/route.ts)
 └─ Pages Router API route (pages/api/payment.ts) ──► iyzico
        │                         │
        ▼                         ▼
   Prisma Client            Cloudinary (image upload)
   (lib/generated/prisma)   Nodemailer (SMTP email)
        │
      MySQL
```

---

## Folder Structure

```
NowArt/
├── app/                     # App Router pages and API routes
│   ├── admin/               # Admin panel pages (dashboard, products, orders, blogs, users)
│   ├── api/                 # App Router API route handlers (see API section)
│   ├── products/, blog/, cart/, checkout/, favorites/, search/,
│   │   profile/, contact/, faq/, reset-password/,
│   │   info/, institutional/, contracts/   # storefront + informational/legal pages
│   ├── layout.tsx, page.tsx, not-found.tsx, globals.css
├── pages/
│   └── api/payment.ts       # iyzico payment endpoint (Pages Router)
├── components/              # UI components grouped by feature (admin/, blog/, cart/,
│                             # checkout/, home/, layout/, products/, profile/, search/, ui/)
├── contexts/cartContext.tsx # Global cart React context
├── hooks/use-mobile.ts      # Mobile breakpoint hook
├── lib/
│   ├── auth.ts              # NextAuth authOptions (Credentials provider)
│   ├── db.ts                # Prisma client singleton
│   ├── session.ts           # next-session config (unused elsewhere — see stack note)
│   ├── utils.ts             # cn() helper, etc.
│   └── generated/prisma/    # Generated Prisma Client (custom output path)
├── auth.ts                  # Root-level NextAuth handlers/config (duplicate of lib/auth.ts)
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts               # Seeds admin account + categories/sub-categories only
│   └── migrations/          # 11 migrations
├── seed/                    # products.json, blogs.json, orders.json — present but unused by seed.ts
├── types/                   # next-auth.d.ts, iyzipay.d.ts, nodemailer.d.ts, formidable.d.ts, bcrypt.d.ts, order.ts
├── utils/cart.ts             # Cart calculation helpers
└── public/                  # heroes/, products/, profiles/, measure/, iyzico/, logo/,
                              # docs/NowartPlicell.pdf, uploads/{products,blogs}/, city.json, og-image.webp
```

---

## Installation

### Prerequisites
- Node.js and npm
- A MySQL database
- Cloudinary account (for `/api/upload` and `next-cloudinary`)
- iyzico account (sandbox or production) for payment processing
- SMTP credentials (e.g. an email provider) for Nodemailer

> No `.engines` field is declared in `package.json`, so no specific Node.js version is enforced by the project itself.

### 1. Install dependencies
```bash
npm install
```
`postinstall` automatically runs `prisma generate`.

### 2. Configure environment variables
Create a `.env` (or `.env.local`) file at the project root. The variable **names** below are read directly from the codebase — see the Environment Variables table for what each one is used for. Do not commit real secret values.

### 3. Apply the database schema
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Seed the database (optional)
```bash
npm run seed
```
This creates the admin `User` record (from `ADMIN_*` env vars) and the fixed set of `Category`/`SubCategory` rows hardcoded in `prisma/seed.ts`. It does **not** load `seed/products.json`, `seed/blogs.json`, or `seed/orders.json`.

### 5. Run the dev server
```bash
npm run dev
```
Opens on `http://localhost:3000` (Next.js default) using Turbopack.

---

## Environment Variables

Names and usages below were confirmed by grepping `process.env.*` across the source tree and cross-checking against the project's `.env` file (values were **not** read into this document).

| Variable | Used in | Purpose |
|---|---|---|
| `DATABASE_URL` | `prisma/schema.prisma` | MySQL connection string for Prisma |
| `NEXTAUTH_SECRET` | `auth.ts`, `lib/auth.ts` | NextAuth JWT signing secret |
| `ADMIN_EMAIL` | `prisma/seed.ts` | Email for the seeded admin `User` |
| `ADMIN_PASSWORD` | `prisma/seed.ts` | Plaintext password for the seeded admin, hashed with bcrypt before insert |
| `ADMIN_NAME` | `prisma/seed.ts` | First name for the seeded admin `User` |
| `ADMIN_SURNAME` | `prisma/seed.ts` | Surname for the seeded admin `User` |
| `CLOUD_NAME` | `app/api/upload/route.ts` | Cloudinary `cloud_name` |
| `API_KEY` | `app/api/upload/route.ts` | Cloudinary `api_key` |
| `API_SECRET` | `app/api/upload/route.ts` | Cloudinary `api_secret` |
| `IYZICO_API_KEY` | `pages/api/payment.ts` | iyzico API key |
| `IYZICO_SECRET_KEY` | `pages/api/payment.ts` | iyzico secret key |
| `IYZICO_BASE_URL` | `pages/api/payment.ts` | iyzico API base URL (sandbox vs. production) |
| `EMAIL_HOST` | `app/api/send-mail/route.ts` | SMTP host for Nodemailer |
| `EMAIL_PORT` | `app/api/send-mail/route.ts` | SMTP port (465 triggers TLS, otherwise plain) |
| `EMAIL_USER` | `app/api/send-mail/route.ts` | SMTP auth username / "from" address |
| `EMAIL_PASS` | `app/api/send-mail/route.ts` | SMTP auth password |
| `NEXT_PUBLIC_BASE_URL` | multiple API routes (`order`, `order/user`, `account/forgot_password`, `products`) | Base URL used for server-to-server `fetch()` calls between the app's own API routes (e.g. order creation calling the payment endpoint) |

**Present in `.env` but not found referenced in any `.ts`/`.tsx` source file:** `MNG_KEY`, `MNG_SECRET`. These appear to be unused/legacy variables — documented here for completeness, purpose unverifiable.

**Referenced in code but not present in the project's `.env` file:** none found beyond the above — `NEXTAUTH_URL`, which the previous README documented, is **not** set in `.env`; NextAuth v4 can infer it from the request in most environments, but this could not be verified from static code alone.

---

## Available Scripts

Exact contents of the `scripts` block in `package.json`:

| Script | Command | Behavior |
|---|---|---|
| `npm run dev` | `next dev --turbopack` | Starts the Next.js development server with Turbopack |
| `npm run build` | `next build --turbopack` | Production build using Turbopack |
| `npm start` | `next start` | Serves the production build (run `build` first) |
| `npm run seed` | `tsx prisma/seed.ts` | Seeds the admin account and category/sub-category data (see Database section). Uses `prisma.user.create` / `findFirst`+`create` — safe to re-run (skips existing records), does **not** delete data. |
| `npm install` (implicit) | `postinstall`: `prisma generate` | Regenerates the Prisma Client into `lib/generated/prisma` after every install |

No `test` or `lint` script is defined in `package.json`.

**Destructive commands referenced elsewhere in this README** (not `package.json` scripts, but standard Prisma CLI commands relevant to this project):
- `npx prisma migrate reset` — **destructive**: drops and recreates the database, discarding all data, before reapplying migrations.

---

## Development

```bash
npm run dev
```
Runs on Turbopack. Prisma Studio (`npx prisma studio`) can be used to inspect/edit data directly against the configured `DATABASE_URL`.

## Build

```bash
npm run build
npm start
```

---

## API

All endpoints below were confirmed by reading each `route.ts` handler under `app/api/` and `pages/api/payment.ts`. "Auth" reflects what the handler itself checks via `getServerSession`, not what any UI page around it may check.

### Authentication
| Method | Path | Auth | Purpose |
|---|---|---|---|
| * | `/api/auth/[...nextauth]` | — | NextAuth Credentials sign-in/callback handler |
| POST | `/api/auth/logout` | none | Clears the NextAuth session cookie |
| GET | `/api/account/check` | none | Returns the current session's user (or `null`) via `getServerSession` |
| POST | `/api/account/register` | none | Creates a new `User` with a bcrypt-hashed password |
| POST | `/api/account/forgot_password` | none | Generates a reset token (`Math.random` based, 30-minute expiry), stores it on the `User`, and calls `/api/send-mail` |
| POST | `/api/account/reset_password` | none (token-based) | Validates the reset token/expiry and sets a new bcrypt-hashed password |

### Products
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/products` | **none** | List all products with category/sub-category included |
| POST | `/api/products` | **none** | Create a product (uploads main/sub images via `/api/upload` first) — **no session check in the handler** |
| GET | `/api/products/[id]` | **none** | Get a single product by ID |
| PUT | `/api/products/[id]` | **none** | Update a product — **no session check in the handler** |
| DELETE | `/api/products/[id]` | **none** | Delete a product — **no session check in the handler** |

### Cart
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/cart` | session required | Get the current user's cart items |
| POST | `/api/cart` | session required | Add an item to the cart |
| DELETE | `/api/cart` | session required | Clear the current user's cart |
| PATCH | `/api/cart/[id]` | session required | Update a cart item's quantity |
| DELETE | `/api/cart/[id]` | session required | Remove a single cart item |

### Orders
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/order` | **none** | Create an order: calls the internal payment endpoint, then creates `Order`/`OrderItem`/`OrderAddress` records and sends confirmation emails |
| GET | `/api/order` | **none** | List **all** orders in the system, with items/addresses/user included — **no session check in the handler** |
| PATCH | `/api/order` | **none** | Update any order's status by `orderId` — **no session check in the handler** |
| GET | `/api/order/user` | session required | List the current user's own orders |
| PATCH | `/api/order/user` | session required | Cancel the current user's own order (only if not already shipped/delivered/cancelled, and only the order's owner) |

### Payment
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/pages/api/payment` (Pages Router route, requested as `/api/payment`) | none | Submits card + buyer + basket data to iyzico via the `iyzipay` SDK and returns the result |

### Favorites
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/favorites` | session required | List the current user's favorites |
| POST | `/api/favorites` | session required | Add a product to favorites |
| DELETE | `/api/favorites/[id]` | session required | Remove a favorite |

### Reviews
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/review` | session required | Create a review for a product (rating 1–5; unique per user/product) |
| GET | `/api/review/[id]` | **none** | List reviews for a product — `[id]` is a **product ID**, not a review ID |

> No `GET /api/review` (list all) or `DELETE /api/review/[id]` (delete a review) endpoint exists, despite the previous README documenting both.

### Blog
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/blog` | session required | List all blog posts — **requires a logged-in session**, so it is not directly usable by anonymous visitors of the public blog pages |
| POST | `/api/blog` | session required (not role-checked) | Create a blog post |
| PUT | `/api/blog/[id]` | session required (not role-checked) | Update a blog post, deleting its old image file if replaced |
| DELETE | `/api/blog/[id]` | session required (not role-checked) | Delete a blog post and its image file from `public/upload/blogs` |

> No `GET /api/blog/[id]` (single post) endpoint exists, despite the previous README documenting one.

### Addresses & Location
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/address` | session required | List the current user's saved addresses |
| POST | `/api/address` | session or guest `userId` in body | Create an address (requires a valid 11-digit `tcno`) |
| PATCH | `/api/address/[id]` | session required, ownership checked | Update an address owned by the current user |
| DELETE | `/api/address/[id]` | session required, ownership checked | Delete an address owned by the current user |
| GET | `/api/location/ilceler/[ilId]` | none | Districts for a province — proxies `api.turkiyeapi.dev` |
| GET | `/api/location/mahalleler/[ilceId]` | none | Neighborhoods for a district — proxies `api.turkiyeapi.dev` |

### Users
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/user` | session required | Get the current user's profile + addresses |
| PATCH | `/api/user` | session required | Update the current user's name/surname/phone |
| GET | `/api/user/all` | session required (role check commented out) | List all users — **any authenticated user, not just admins, per current code** |
| DELETE | `/api/user/all/[id]` | **none** | Delete a user by ID — **no session check in the handler** |

### Utilities
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/send-mail` | none | Sends an email via Nodemailer (used internally by other routes and by contact forms) |
| POST | `/api/upload` | none | Uploads a file to Cloudinary under `products/<folderName>` and returns the secure URL |

---

## Database

MySQL via Prisma (`prisma/schema.prisma`). Model names as declared (note the lowercase `product` model, unlike every other model which is capitalized):

| Model | Key fields | Notes |
|---|---|---|
| `User` (`@@map("user")`) | `email` (unique), `password` (bcrypt hash), `role` (`UserRole`: `USER`/`ADMIN`), `phone`, `tcno`, `resetToken`, `resetTokenExpires` | No separate `Admin` table — admins are `User` rows with `role = ADMIN` |
| `product` (`@@map` none, table name `product`) | `title`, `pricePerM2`, `rating`, `reviewCount`, `mainImage`, `subImage`, `categoryId`, `subCategoryId` | No `description`, `images[]`, `stock`, `isFeatured`, or `colorProfiles[]` fields exist on this model |
| `Category` (`@@map("category")`) | `name` | Has many `SubCategory` and `product` |
| `SubCategory` (`@@map("sub_category")`) | `name`, `categoryId` | Belongs to `Category` |
| `CartItem` (`@@map("cartitem")`) | `userId` (nullable — guest carts), `productId`, `quantity`, `profile`, `width`, `height`, `m2`, `device` | |
| `Favorite` (`@@map("favorite")`) | `userId`, `productId` | Unique per user/product |
| `Review` (`@@map("review")`) | `rating`, `title`, `comment`, `userId`, `productId` | Unique per user/product |
| `Order` (`@@map("order")`) | `userId`, `status` (`OrderStatus`), `totalPrice`, `paidPrice`, `currency`, `paymentMethod`, `transactionId` | Has many `OrderItem` and `OrderAddress` |
| `OrderItem` (`@@map("orderitem")`) | `orderId`, `productId`, `quantity`, `unitPrice`, `totalPrice`, `profile`, `width`, `height`, `m2`, `device` | |
| `OrderAddress` (`@@map("orderaddress")`) | `orderId`, `type` (`"shipping"`/`"billing"`), `tcno` | Snapshot copy of the address at order time |
| `Address` (`@@map("address")`) | `userId`, `title`, `firstName`, `lastName`, `address`, `neighborhood`, `district`, `city`, `zip`, `tcno`, `phone`, `country` | User's saved addresses |
| `Blog` (`@@map("blog")`) | `title`, `content`, `image`, `category` | No `slug` or `publishedAt` field exists |

**Enums:** `OrderStatus` (`pending`, `paid`, `shipped`, `delivered`, `cancelled`), `UserRole` (`USER`, `ADMIN`).

**Key relationships:**
- `product` belongs to `Category`, optionally `SubCategory`; has many `CartItem`, `Favorite`, `Review`, `OrderItem`
- `Order` belongs to `User`; has many `OrderItem` and `OrderAddress`
- `Address` and `OrderAddress` both store a Turkish national ID (`tcno`), consistent with the `tcNo`-related legal/contract pages in `app/contracts`

**Migrations:** 11 migrations under `prisma/migrations/` — `add_orderitem_extra_fields`, `add_reset_token_fields`, `add_default_main_image`, `add_category_model`, `init`, `add_sub_category`, `add_category_subcategory_to_product`, `make_user_nullable`, `add_tcno_to_address`, `init` (re-init), `fix_orderaddress_tcno`.

**Seeding:** `prisma/seed.ts` only creates (a) one admin `User` from `ADMIN_*` env vars, and (b) the fixed `Category`/`SubCategory` set (`Plicell`, `Zebra`, `Stor`, `Ahsap-Jaluzi`, and 10 hardcoded Plicell sub-categories). It does not touch products, blogs, or orders, despite `seed/products.json`, `seed/blogs.json`, and `seed/orders.json` existing in the repo.

---

## Authentication

- **Mechanism:** NextAuth.js v4 with a single **Credentials provider**, defined identically in both `auth.ts` (root) and `lib/auth.ts` (`authOptions`) — two parallel copies of the same configuration.
- **Password verification:** on login, `prisma.user.findUnique({ where: { email } })` looks up the user, then `bcrypt.compare(password, user.password)` verifies the password. On registration and password reset, `bcrypt.hash(password, 10)` hashes the new password before storing it (the admin seed script uses the same `bcrypt.hash(..., 10)` call).
- **Session strategy:** JWT (`session: { strategy: "jwt" }`), signed with `NEXTAUTH_SECRET`. The JWT and session callbacks copy `id`, `name`, `surname`, `email`, and `role` onto the token/session.
- **Logout:** `POST /api/auth/logout` manually clears the `next-auth.session-token` (or `__Secure-next-auth.session-token` in production) cookie.
- **Password reset:** a reset token is generated with `Math.random().toString(36).substring(2, 15)` (not a cryptographically secure token generator) and stored on `User.resetToken` / `resetTokenExpires` with a 30-minute expiry; the reset link is emailed via `/api/send-mail`.
- **Role-based access control — page level vs. API level:**
  - Every page under `app/admin/*` (`dashboard`, `products`, `orders`, `blogs`, `users`) checks `session.user.role === "ADMIN"` server-side and redirects to `/admin` otherwise. This protection is real and consistently applied at the page level.
  - The underlying **API routes are not consistently protected the same way**: `app/api/products/route.ts` and `app/api/products/[id]/route.ts` (create/update/delete) have no session check at all; `app/api/order/route.ts` (list-all/update-status) has no session check; `app/api/user/all/route.ts` checks only that a session exists, with the admin-role check explicitly commented out in the source; `app/api/blog/*` and `app/api/user/all/[id]` require a session but do not check for the `ADMIN` role (or, for the user-delete route, no session check at all). Anyone who can reach these API routes directly (bypassing the admin UI) can perform the corresponding writes.

---

## Configuration

- **`components.json`**: shadcn/ui config — style `new-york`, Tailwind base color `zinc`, CSS variables enabled, path aliases `@/components`, `@/lib`, `@/components/ui`, `@/hooks`.
- **`tsconfig.json`**: path alias `@/*` → project root.
- **`next.config.ts`**: sets `images.domains: ["res.cloudinary.com"]` to allow Next/Image to load Cloudinary-hosted images. No other custom Next.js configuration (no rewrites, headers, or experimental flags) is present.
- **`prisma/schema.prisma`**: Prisma Client is generated to a non-default path, `lib/generated/prisma` — if you add or change models, remember `npx prisma generate` writes there, not to `node_modules/.prisma/client`.

---

## Troubleshooting

Issues realistic for this exact stack, based on what was found in the code:

- **`prisma generate` output path:** because the Prisma Client is generated into `lib/generated/prisma` instead of the default location, editors/type-checkers that assume the default `@prisma/client` import path may not resolve types correctly after a fresh clone — run `npx prisma generate` (or `npm install`, which triggers it via `postinstall`) before starting the dev server.
- **Public blog page failing to load data:** `GET /api/blog` requires an authenticated session in the current code. If the public-facing blog listing calls this endpoint directly without a logged-in user, it will receive a 401 rather than the blog list.
- **Product/order admin mutations reachable without login:** several write endpoints (`POST/PUT/DELETE /api/products*`, `GET/PATCH /api/order`, `DELETE /api/user/all/[id]`) have no server-side session check. If exposing this app beyond a trusted network, this is a functional gap to be aware of, not a documentation error.
- **`iyzico` sandbox vs. production:** `IYZICO_BASE_URL` must point at iyzico's sandbox host during development and their production host in production; using the wrong one will cause `pages/api/payment.ts` calls to fail or behave unexpectedly.
- **MySQL connection errors on `prisma migrate dev`:** confirm `DATABASE_URL` points at a running, reachable MySQL 8-compatible server before running migrations.
- **Turbopack-specific build issues:** both `dev` and `build` scripts pass `--turbopack`; if a dependency or plugin does not yet support Turbopack, fall back to plain `next dev` / `next build` (not defined as an npm script, but runnable via `npx next dev`) to isolate the issue.
- **Cloudinary uploads failing:** `app/api/upload/route.ts` reads `CLOUD_NAME` / `API_KEY` / `API_SECRET` (not the `CLOUDINARY_*`-prefixed names used by some Cloudinary docs/examples) — make sure your `.env` uses these exact names.

---

## License

No `LICENSE` file is present in the repository, so no license can be confirmed or documented here.
