# 🪟 NowArt Plicell — Premium Online Curtain Store

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.9-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Turkey's leading online curtain retailer — Plicell, Zebra, Stor & Wood Venetian Blinds**

**🌐 [nowartplicell.com](https://www.nowartplicell.com)**

[Features](#-features) • [Tech Stack](#️-technology-stack) • [Installation](#-installation) • [API](#-api-endpoints) • [Database](#️-database-schema) • [Deployment](#-deployment)

</div>

---

## 📋 About the Project

**NowArt Plicell** is a modern full-stack e-commerce platform built for one of Turkey's leading curtain retailers. The platform offers a curated catalog of premium window treatments — Plicell, Zebra, Stor, and Wood Venetian Blind (Ahşap Jaluzi) — along with detailed product pages, color profile previews, measurement guides, and a seamless checkout experience powered by iyzico.

The application is built on Next.js 15 with Turbopack, TypeScript, Prisma ORM, and MySQL, featuring a complete admin panel, password reset flow, blog system, institutional pages, and Turkish location data (city/district/neighborhood) for address management.

---

## ✨ Features

### 🛍️ Customer Features

- **Product Catalog** — Browse all curtain types with filtering by category and subcategory
- **Product Detail Pages** — Multi-image gallery with zoom, color profile previews, size/variant selection
- **Measurement Guide** — Dedicated measurement instruction page with visual guides (`/info/measure`)
- **Search** — Full-text product search with instant results
- **Shopping Cart** — Persistent cart with quantity management and real-time totals
- **Wishlist / Favorites** — Save products for later
- **Multi-Step Checkout** — Address → Cargo → Payment guided flow with iyzico integration
- **Secure Payment** — iyzico payment gateway with installment support for Turkish bank cards
- **Order Tracking** — Order history and status from the user profile
- **User Profile** — Manage personal information and delivery addresses
- **Password Reset** — Forgot password and reset password email flow
- **Blog** — Curtain care tips, decoration guides, and news
- **FAQ Page** — Frequently asked questions
- **Institutional Pages** — About, Bank Accounts, Documents (PDF download), Measurement, Why Us
- **Info Pages** — Advantages, Measurement Guide, Terms & Conditions, Why NowArt
- **Legal Pages** — Distance Sale Agreement, KVKK, Payment Options, Personal Data Policy
- **Location API** — Turkish city/district/neighborhood cascading dropdowns for address forms
- **Responsive Design** — Mobile-first layout for all screen sizes
- **Social Sidebar** — Persistent social media quick links

### 🔧 Admin Features

- **Admin Dashboard** — Sales analytics with Recharts graphs, order volume, revenue metrics
- **Product Management** — Add, edit, delete products with category/subcategory, color profiles, images, Cloudinary upload
- **Order Management** — Full order list with detailed dialog view and status updates
- **User Management** — List all registered users and manage accounts
- **Blog Management** — Create, update, delete blog posts with rich content and images
- **Protected Routes** — Admin area secured by NextAuth session

### ⚙️ Technical Features

- **Next.js 15 with Turbopack** — Fast development builds and optimized production output
- **Pages Router for Payment** — iyzico payment endpoint lives in `pages/api/payment.ts` for compatibility
- **Prisma ORM + MySQL** — Type-safe relational data access with full migration history
- **NextAuth.js** — Session management for both customers and admin
- **Password Reset Flow** — Email-based reset token generation and validation
- **Cloudinary + next-cloudinary** — Image upload, optimization, and CDN delivery
- **Sharp** — Server-side image processing and optimization
- **Nodemailer** — Transactional emails (contact form, password reset)
- **Seed System** — JSON-based seed files for products, blogs, and orders

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Description |
|-----------|---------|-------------|
| Next.js | 15.5.9 | App Router + Pages Router, SSR/SSG, Turbopack |
| React | 19.1.0 | Component-based UI |
| TypeScript | 5 | Type-safe development |
| Tailwind CSS | 4 | Utility-first styling |
| Radix UI | 1.x | Accessible UI primitives (20+ components) |
| Framer Motion | 12.23.22 | Animations and transitions |
| Lucide React | 0.544.0 | Icon library |
| Embla Carousel | 8.6.0 | Product image carousel |
| React Hook Form | 7.64.0 | Form state management |
| Zod | 4.1.11 | Schema validation |
| Recharts | 2.15.4 | Admin dashboard analytics |
| Sonner | 2.0.7 | Toast notifications |
| next-themes | 0.4.6 | Theme management |
| date-fns | 4.1.0 | Date formatting |

### Backend & Database

| Technology | Version | Description |
|-----------|---------|-------------|
| Prisma | 6.18.0 | ORM & database migrations |
| MySQL | 8.0 | Relational database |
| NextAuth.js | 4.24.11 | Authentication & session management |
| bcrypt | 6.0.0 | Password hashing |
| Nodemailer | 6.10.1 | Transactional email delivery |
| Cloudinary | 2.8.0 | Image storage & CDN |
| next-cloudinary | 6.16.2 | Next.js Cloudinary integration |
| Sharp | 0.34.4 | Server-side image processing |
| iyzipay | 2.0.64 | iyzico payment gateway SDK |
| formidable | 3.5.4 | Multipart form/file parsing |
| tsx | 4.20.6 | TypeScript seed script runner |

### Infrastructure

| Technology | Description |
|-----------|-------------|
| Vercel | Frontend deployment (recommended) |
| Cloudinary | CDN & image management |
| MySQL (cloud) | Managed DB (PlanetScale / Railway / AWS RDS) |

---

## 🏗️ Architecture Overview

```
Browser / Client
       │
       ▼
  Next.js 15 (Turbopack)
  ┌─────────────────────────────────────────────────┐
  │  App Router (SSR / SSG / API Routes)            │
  │                                                 │
  │  Public Pages                                   │
  │  ├── / (Homepage)                               │
  │  ├── /products & /products/[id]                 │
  │  ├── /blog & /blog/[id]                         │
  │  ├── /cart, /checkout, /favorites               │
  │  ├── /profile (orders, addresses)               │
  │  ├── /search                                    │
  │  ├── /contact, /faq, /reset-password            │
  │  ├── /info/* (advantage, measure, terms, why)   │
  │  ├── /institutional/* (about, bank, docs...)    │
  │  └── /contracts/* (kvkk, distance_sale...)      │
  │                                                 │
  │  Admin Pages (/admin/*)                         │
  │  ├── dashboard, products, orders                │
  │  ├── blogs, users                               │
  │                                                 │
  │  App Router API (/api/*)                        │
  │  Pages Router API (pages/api/payment.ts) ◄──── iyzico
  └─────────────────────────────────────────────────┘
         │                    │
         ▼                    ▼
       MySQL              Cloudinary
    (via Prisma)          (Images/CDN)
         │
      iyzico           Nodemailer
    (Payments)        (Email / Reset)
```

> **Note:** The payment endpoint lives in `pages/api/payment.ts` (Pages Router) rather than the App Router for iyzico SDK compatibility with `formidable` multipart parsing.

---

## 📁 Project Structure

```
NowArt/
├── app/
│   ├── page.tsx                            # Homepage
│   ├── layout.tsx                          # Root layout
│   ├── not-found.tsx                       # 404 page
│   ├── globals.css
│   │
│   ├── products/
│   │   ├── page.tsx                        # Product listing with filters
│   │   └── [id]/page.tsx                   # Product detail page
│   │
│   ├── blog/
│   │   ├── page.tsx                        # Blog listing
│   │   └── [id]/page.tsx                   # Blog detail
│   │
│   ├── cart/page.tsx                       # Shopping cart
│   ├── favorites/page.tsx                  # Wishlist
│   ├── search/page.tsx                     # Search results
│   ├── contact/page.tsx                    # Contact form
│   ├── faq/page.tsx                        # FAQ
│   ├── reset-password/page.tsx             # Password reset page
│   │
│   ├── checkout/
│   │   ├── page.tsx                        # Multi-step checkout
│   │   ├── success/page.tsx                # Payment success
│   │   └── unsuccess/page.tsx              # Payment failure
│   │
│   ├── profile/
│   │   ├── page.tsx                        # Profile overview
│   │   ├── orders/page.tsx                 # Order history
│   │   └── addresses/page.tsx             # Saved addresses
│   │
│   ├── info/                               # Informational pages
│   │   ├── advantage/page.tsx              # Why choose NowArt
│   │   ├── measure/page.tsx                # Measurement guide
│   │   ├── terms/page.tsx                  # Terms & conditions
│   │   └── why/page.tsx                    # Why NowArt
│   │
│   ├── institutional/                      # Company pages
│   │   ├── about/page.tsx
│   │   ├── bank_accounts/page.tsx
│   │   ├── documents/page.tsx              # PDF document download
│   │   ├── measurement/page.tsx
│   │   └── why_us/page.tsx
│   │
│   ├── contracts/                          # Legal pages
│   │   ├── distance_sale/page.tsx
│   │   ├── kvkk/page.tsx
│   │   ├── payment_options/page.tsx
│   │   └── personal_data/page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx                        # Admin login
│   │   ├── dashboard/page.tsx
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── blogs/page.tsx
│   │   └── users/page.tsx
│   │
│   └── api/                                # App Router API handlers
│       ├── auth/[...nextauth]/             # NextAuth
│       ├── auth/logout/
│       ├── account/check/                  # Email existence check
│       ├── account/register/               # User registration
│       ├── account/forgot_password/        # Send reset email
│       ├── account/reset_password/         # Reset password with token
│       ├── products/                       # Product CRUD
│       ├── products/[id]/
│       ├── cart/                           # Cart management
│       ├── cart/[id]/
│       ├── order/                          # Order creation
│       ├── order/user/                     # User orders
│       ├── favorites/                      # Wishlist
│       ├── favorites/[id]/
│       ├── review/                         # Product reviews
│       ├── review/[id]/
│       ├── blog/                           # Blog CRUD
│       ├── blog/[id]/
│       ├── address/                        # User addresses
│       ├── address/[id]/
│       ├── user/                           # User profile
│       ├── user/all/                       # Admin user list
│       ├── user/all/[id]/
│       ├── location/ilceler/[ilId]/        # Districts by province
│       ├── location/mahalleler/[ilceId]/   # Neighborhoods by district
│       ├── send-mail/                      # Contact email
│       └── upload/                         # Cloudinary upload
│
├── pages/
│   └── api/
│       └── payment.ts                      # iyzico payment (Pages Router)
│
├── components/
│   ├── admin/
│   │   ├── login/login.tsx
│   │   ├── sideBar.tsx
│   │   ├── dashboard/dashboard.tsx
│   │   ├── products/                       # Add, update, table, list
│   │   ├── orders/                         # Orders table + detail dialog
│   │   ├── blogs/                          # Add, update, list
│   │   └── users/users.tsx
│   ├── blog/
│   │   ├── blog.tsx                        # Blog listing component
│   │   └── blogDetail.tsx                  # Blog detail component
│   ├── cart/
│   │   ├── cart.tsx
│   │   ├── cartItem.tsx
│   │   └── cartSummary.tsx
│   ├── checkout/
│   │   ├── checkout.tsx                    # Stepper controller
│   │   ├── paymentStepper.tsx              # Step indicator UI
│   │   ├── stepAddress.tsx                 # Address selection
│   │   ├── stepCargo.tsx                   # Cargo info
│   │   ├── stepPayment.tsx                 # iyzico payment
│   │   ├── cartSummary.tsx                 # Order summary sidebar
│   │   ├── success.tsx
│   │   └── unsuccess.tsx
│   ├── contracts/
│   │   ├── distanceSale.tsx
│   │   ├── kvkk.tsx
│   │   ├── paymentOptions.tsx
│   │   └── personalData.tsx
│   ├── favorites/
│   │   ├── favorites.tsx
│   │   └── productCard.tsx
│   ├── home/
│   │   ├── heroes.tsx                      # Hero image slider (34 WebP images)
│   │   ├── about.tsx                       # Brand intro section
│   │   ├── mostPreffered.tsx               # Bestseller products
│   │   ├── productCard.tsx                 # Home product card
│   │   └── promo.tsx                       # Promotional banner
│   ├── info/
│   │   ├── advantage.tsx
│   │   ├── measure.tsx
│   │   ├── termsCondition.tsx
│   │   └── why.tsx
│   ├── institutional/
│   │   ├── about.tsx
│   │   ├── bank_accounts.tsx
│   │   ├── documents.tsx
│   │   ├── measurement.tsx
│   │   └── why_us.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── topbar.tsx
│   │   ├── ClientLayoutWrapper.tsx
│   │   ├── breadCrumb.tsx
│   │   ├── cartDropdown.tsx                # Navbar cart preview
│   │   ├── cartItem.tsx
│   │   ├── contact.tsx
│   │   ├── faq.tsx
│   │   ├── login.tsx                       # Modal login form
│   │   ├── register.tsx                    # Modal register form
│   │   ├── forgotPassword.tsx              # Forgot password modal
│   │   ├── reset-password.tsx              # Reset password form
│   │   ├── imageZoom.tsx
│   │   ├── loading.tsx
│   │   ├── pagination.tsx
│   │   ├── scrollToTop.tsx
│   │   ├── socialSidebar.tsx
│   │   └── unauthorized.tsx
│   ├── products/
│   │   ├── products.tsx                    # Product listing grid
│   │   ├── productCard.tsx
│   │   ├── productDetail.tsx               # Full product detail
│   │   ├── descriptionAndReview.tsx        # Tabs: description & reviews
│   │   ├── filter.tsx                      # Category/subcategory filter
│   │   └── measureModal.tsx                # Measurement guide modal
│   ├── profile/
│   │   ├── sideBar.tsx
│   │   ├── myPersonalInformation.tsx
│   │   ├── orders.tsx
│   │   ├── addresses.tsx
│   │   └── addressForm.tsx
│   ├── search/
│   │   ├── search.tsx
│   │   └── productCard.tsx
│   └── ui/                                 # 50+ Radix-based UI primitives
│
├── contexts/
│   └── cartContext.tsx                      # Global cart state
│
├── hooks/
│   └── use-mobile.ts                        # Mobile breakpoint hook
│
├── lib/
│   ├── auth.ts                              # NextAuth configuration
│   ├── db.ts                               # Prisma client singleton
│   ├── session.ts                           # Session helpers
│   └── utils.ts                             # cn() and general utilities
│
├── auth.ts                                  # Auth config (root-level export)
│
├── prisma/
│   ├── schema.prisma                        # Database schema
│   ├── seed.ts                              # Seed script (tsx runner)
│   └── migrations/                          # 11 migration files
│
├── seed/
│   ├── products.json                        # Product seed data
│   ├── blogs.json                           # Blog seed data
│   └── orders.json                          # Order seed data
│
├── types/                                   # TypeScript type definitions
│   ├── next-auth.d.ts
│   ├── iyzipay.d.ts
│   ├── nodemailer.d.ts
│   ├── formidable.d.ts
│   ├── bcrypt.d.ts
│   └── order.ts
│
├── utils/
│   └── cart.ts                              # Cart calculation helpers
│
└── public/
    ├── heroes/                              # 34 hero slider images (WebP)
    ├── products/                            # Product images (main + sub)
    ├── profiles/                            # Color profile swatches (7 colors)
    ├── measure/                             # Measurement guide images
    ├── iyzico/                              # Payment branding assets
    ├── logo/                                # Site logos
    ├── docs/NowartPlicell.pdf               # Downloadable company document
    ├── uploads/products/                    # Cloudinary-uploaded product images
    ├── city.json                            # Turkish city/province data
    └── og-image.webp                        # Open Graph image
```

---

## 🗄️ Database Schema

All models are managed with Prisma and stored in MySQL.

### Core Tables

```
User              → Customer accounts (name, email, hashed password, role, phone, resetToken, resetTokenExpiry)
Admin             → Admin accounts (username, hashed password) — seeded via env vars

Product           → Curtain products (name, price, description, images[], mainImage,
                    category, subCategory, colorProfiles[], stock, isFeatured)
Category          → Top-level categories (Plicell, Zebra, Stor, Ahşap Jaluzi)
SubCategory       → Sub-level categories linked to Category

CartItem          → Items in user's active cart (userId, productId, quantity, variant, color)
Favorite          → User wishlist (userId, productId)
Review            → Product reviews (rating, comment, userId, productId)

Order             → Customer orders (status, total, cargoCompany, trackingNo, timestamps)
OrderItem         → Line items (productId, quantity, price, extras)
OrderAddress      → Delivery address snapshot at order time (including tcNo for legal compliance)

Address           → Saved user delivery addresses (city, district, neighborhood, detail, tcNo)
Blog              → Blog posts (title, content, image, slug, publishedAt)
```

### Key Relationships

- `Product` belongs to `Category` and optionally `SubCategory`
- `Product` has many `CartItem`, `Favorite`, `Review`, `OrderItem`
- `Order` belongs to `User`, has one `OrderAddress` and many `OrderItem`
- `OrderAddress` captures a complete address snapshot including Turkish identity number (`tcNo`) for Distance Selling Law compliance
- `User` has `resetToken` and `resetTokenExpiry` fields for the password reset flow
- `Admin` is seeded from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)

### Migration History

| Migration | Description |
|-----------|-------------|
| `20251020` | Add extra fields to OrderItem |
| `20251021` | Add reset token fields to User |
| `20251101` | Add default main image to Product |
| `20251101` | Add Category model |
| `20251101` | Initial full schema |
| `20251101` | Add SubCategory model |
| `20251101` | Add category/subcategory to Product |
| `20251105` | Make User nullable on CartItem |
| `20251120` | Add tcNo to Address |
| `20251120` | Schema re-init |
| `20251122` | Fix OrderAddress tcNo column |

---

## 🚀 Installation

### Prerequisites

- Node.js **18+**
- MySQL **8.0+**
- npm or yarn
- Cloudinary account
- iyzico account *(for payment processing)*

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd NowArt
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/nowart_db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Admin Account (seeded on first run)
ADMIN_EMAIL="admin@nowartplicell.com"
ADMIN_PASSWORD="your-secure-admin-password"
ADMIN_NAME="Admin"
ADMIN_SURNAME="User"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# iyzico Payment Gateway
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"  # Use production URL for live

# Email (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> **Admin Seeding:** The admin account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` during the seed step. Change these to secure values before running in production.

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords to generate a dedicated SMTP password for Nodemailer.

---

### 4. Set Up the Database

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed initial data (products, blogs, orders, admin account)
npm run seed
```

---

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The dev server uses **Turbopack** for fast refresh and substantially faster builds.

---

### Production Build

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | NextAuth sign-in handler |
| POST | `/api/auth/logout` | Destroy session |
| GET | `/api/account/check` | Check if email is registered |
| POST | `/api/account/register` | Register new user |
| POST | `/api/account/forgot_password` | Send password reset email |
| POST | `/api/account/reset_password` | Reset password with token |

### 📦 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (with filters) |
| POST | `/api/products` | Create product (Admin) |
| GET | `/api/products/[id]` | Get product by ID |
| PUT | `/api/products/[id]` | Update product (Admin) |
| DELETE | `/api/products/[id]` | Delete product (Admin) |

### 🛒 Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's active cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/[id]` | Update cart item quantity |
| DELETE | `/api/cart/[id]` | Remove item from cart |

### 📋 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order` | Create new order |
| GET | `/api/order/user` | Get current user's orders |

### 💳 Payment

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/pages/api/payment` | Initiate iyzico payment (Pages Router) |

### ❤️ Favorites

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favorites` | Get user's wishlist |
| POST | `/api/favorites` | Add to favorites |
| DELETE | `/api/favorites/[id]` | Remove from favorites |

### ⭐ Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/review` | List reviews |
| POST | `/api/review` | Submit a review |
| DELETE | `/api/review/[id]` | Delete review (Admin/Owner) |

### 📝 Blog

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog` | List all blog posts |
| POST | `/api/blog` | Create blog post (Admin) |
| GET | `/api/blog/[id]` | Get post by ID |
| PUT | `/api/blog/[id]` | Update blog post (Admin) |
| DELETE | `/api/blog/[id]` | Delete blog post (Admin) |

### 📍 Addresses & Location

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/address` | Get user's saved addresses |
| POST | `/api/address` | Add new address |
| PUT | `/api/address/[id]` | Update address |
| DELETE | `/api/address/[id]` | Delete address |
| GET | `/api/location/ilceler/[ilId]` | Get districts by province ID |
| GET | `/api/location/mahalleler/[ilceId]` | Get neighborhoods by district ID |

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get current user profile |
| PUT | `/api/user` | Update user profile |
| GET | `/api/user/all` | List all users (Admin) |
| PUT | `/api/user/all/[id]` | Update user (Admin) |
| DELETE | `/api/user/all/[id]` | Delete user (Admin) |

### 📬 Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/send-mail` | Send contact form email |
| POST | `/api/upload` | Upload image to Cloudinary |

---

## 💳 Payment Integration — iyzico

NowArt Plicell uses [iyzico](https://iyzico.com) for secure payment processing with installment support for major Turkish bank cards.

### Why Pages Router for Payment?

The payment endpoint is located at `pages/api/payment.ts` rather than the App Router. This is because iyzico's Node.js SDK relies on `formidable` for multipart form parsing, which requires the traditional Pages Router request/response objects for full compatibility.

### Checkout Flow

1. User reviews cart and proceeds to `/checkout`
2. **Step 1 — Address**: Select or add a delivery address (with Turkish city/district/neighborhood cascading)
3. **Step 2 — Cargo**: Review shipping details
4. **Step 3 — Payment**: Card details submitted to iyzico via `pages/api/payment.ts`
5. On success → order created in DB → redirect to `/checkout/success`
6. On failure → redirect to `/checkout/unsuccess`

### Supported Cards

Axess, Bonus, Maximum, World, Paraf, BankKart Combo

> **Sandbox Testing:** Set `IYZICO_BASE_URL=https://sandbox-api.iyzipay.com` and use iyzico's [official test card numbers](https://dev.iyzipay.com/en/test-cards) during development.

---

## 🔐 Password Reset Flow

NowArt Plicell includes a complete email-based password reset system.

```
1. User visits /profile or navbar → clicks "Forgot Password"
2. POST /api/account/forgot_password
   → Generates resetToken + resetTokenExpiry (1 hour)
   → Stores token on User record
   → Sends email with reset link via Nodemailer
3. User clicks link → /reset-password?token=...
4. POST /api/account/reset_password
   → Validates token and expiry
   → Hashes new password with bcrypt
   → Clears resetToken fields
```

---

## 🔐 Security

- **NextAuth.js** — User and admin sessions with encrypted JWT in HttpOnly cookies
- **bcrypt** — Password hashing (salt rounds: 12)
- **Reset Token** — Time-limited password reset tokens stored on the User model (expires in 1 hour)
- **Zod** — Schema validation on all API route inputs
- **Role-based access** — Admin API routes validate session role before executing
- **TC Identity Number** — `tcNo` stored on `Address` and `OrderAddress` for Turkish Distance Selling Law compliance
- **Cloudinary signed uploads** — Server-generated signatures for all upload requests
- **Environment isolation** — All secrets in `.env.local`, never exposed to the client bundle
- **KVKK compliance** — Dedicated KVKK, Personal Data, and Distance Sale Agreement pages

---

## 🏷️ Product Color Profiles

NowArt Plicell includes color profile swatch images for curtain variant selection. Available swatches in `public/profiles/`:

| File | Color |
|------|-------|
| `antrasit_gri.webp` | Anthracite Grey |
| `beyaz.webp` | White |
| `gri.webp` | Grey |
| `kahverengi.webp` | Brown |
| `krem.webp` | Cream |
| `parlak_bronz.webp` | Shiny Bronze |
| `siyah.webp` | Black |

These are displayed in the product detail page as clickable color selectors.

---

## 🧪 Development Tools

### Database Management

```bash
# Open Prisma Studio (visual DB editor)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name describe-your-change

# Reset and re-seed
npx prisma migrate reset && npm run seed
```

### Seed System

Seed data is stored as JSON files in the `/seed` directory and loaded via `prisma/seed.ts`:

```bash
npm run seed   # Runs: tsx prisma/seed.ts
```

Seeded data includes: products (with images and variants), blog posts, sample orders, and the admin account.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and configures the build

```bash
# CLI deployment
npx vercel --prod
```

### Docker

```bash
# Build the image
docker build -t nowart-plicell .

# Run the container
docker run -p 3000:3000 --env-file .env nowart-plicell
```

### Production Checklist

- Set `NODE_ENV=production`
- Update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain
- Switch `IYZICO_BASE_URL` to `https://api.iyzipay.com`
- Use a managed MySQL instance (PlanetScale, Railway, or AWS RDS)
- Configure Cloudinary for the production environment
- Set strong `ADMIN_EMAIL` / `ADMIN_PASSWORD` before seeding
- Enable HTTPS (automatic on Vercel; use Let's Encrypt for VPS)
- Remove `uploads/products/` from version control — use Cloudinary for all images in production

---

## 🤝 Contributing

1. **Fork** this repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. Push your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a **Pull Request**

### Code Standards

- Use **TypeScript** — avoid `any`, type all props and API responses
- Validate all API inputs with **Zod**
- Follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`)
- Run `npm run build` before submitting PRs to catch type errors

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

- 🌐 Website: [nowartplicell.com](https://www.nowartplicell.com)
- 📧 Email: info@nowartplicell.com

---

<div align="center">

*NowArt Plicell — Elegance for every window.* 🪟

</div>