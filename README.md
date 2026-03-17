# EPay-Store — My Stickies Online Store

A production-ready, full-stack e-commerce platform built with the **MERN stack** (MongoDB, Express, React, Node.js) for a small business selling stickers, posters, brooches, and digital e-services. The storefront is in Arabic (RTL) and the admin dashboard is in English, with full multi-currency support (SYP / USD).

> **Port note:** The backend defaults to port **8000** (set via the `PORT` environment variable). If you were running an older version of this project on port 5000, update your frontend `REACT_APP_API_URL` accordingly.

---

## ✨ Features

### 🛍️ Customer Storefront
- **Product Catalog** — Browse all products and e-services with images, descriptions, and prices
- **Search & Filter** — Real-time search by name; filter by category and sub-category
- **Shopping Cart** — Add / remove items, adjust quantities, persistent across sessions (localStorage)
- **Checkout** — Customer information form with auto-generated order numbers (`ORD-{timestamp}`)
- **Product Ratings & Reviews** — 1–5 star ratings with text comments on any product
- **Multi-Currency** — Toggle between Syrian Pound (SYP) and US Dollar (USD) at any time
- **E-Services Section** — Dedicated page for digital services separate from physical products
- **Most-Visited Products** — Highlighted section for trending items
- **Responsive Design** — Mobile-first layout, works on all screen sizes

### 🔧 Admin Dashboard
- **Secure Authentication** — JWT-based login / registration, 7-day token expiry, role support (`admin`, `super_admin`)
- **Product Management** — Full CRUD, set prices, discounts (0–100%), stock levels, active/inactive toggle, batch updates
- **Category & Sub-category Management** — Hierarchical categories with default price, discount, and currency per category
- **Order Management** — View all orders; advance status through `pending → confirmed → processing → shipped → delivered` (or `cancelled`)
- **Email Notifications** — HTML order-confirmation emails sent automatically via Nodemailer on every new order
- **App Settings** — Configure global display currency (SYP / USD) from the dashboard

### ⚙️ Technical Highlights
- **RESTful API** with Express.js and full input validation (express-validator)
- **JWT authentication** middleware protecting all admin routes
- **bcryptjs** password hashing
- **MongoDB / Mongoose** with virtual computed fields (`finalPrice`, `averageRating`, `reviewCount`)
- **CORS** enabled for cross-origin frontend–backend communication
- **Docker** support (`Dockerfile` included, Node 20-slim base)
- **Bilingual UI** — Arabic RTL for the storefront, English LTR for admin (i18next)
- **Nginx** configuration for static-file serving included
- **Deployable for free** on Render (backend) + Vercel (frontend) + MongoDB Atlas (database)

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend runtime | Node.js | ≥ 18.0.0 |
| Web framework | Express.js | 4.18.2 |
| Database | MongoDB / Mongoose | 7.0.0 |
| Authentication | jsonwebtoken | 9.0.0 |
| Password security | bcryptjs | 2.4.3 |
| Email | Nodemailer | 8.0.1 |
| Frontend library | React | 18.2.0 |
| Client-side routing | react-router-dom | 6.8.0 |
| HTTP client | Axios | 1.3.0 |
| Internationalisation | i18next + react-i18next | 21.10.0 |
| Build tool | Create React App | 5.0.1 |
| Container | Docker | Node 20-slim |

---

## 📁 Project Structure

```
EPay-Store/
├── backend/
│   ├── models/
│   │   ├── Admin.js          # Admin user (username, email, password, role)
│   │   ├── Product.js        # Product (price, discount, ratings, reviews)
│   │   ├── Order.js          # Order (customer info, items, status)
│   │   ├── Category.js       # Category (slug, currency, default price)
│   │   ├── SubCategory.js    # Sub-category (parent reference)
│   │   └── Settings.js       # App-wide settings (currency)
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── subcategories.js
│   │   ├── orders.js
│   │   └── settings.js
│   ├── controllers/          # Business logic (auth, products, orders, …)
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── utils/
│   │   └── emailService.js   # Nodemailer order-notification emails
│   ├── server.js             # Express app entry point
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── Home.js
    │   │   ├── Products.js
    │   │   ├── EServices.js
    │   │   ├── ProductDetails.js
    │   │   ├── Cart.js
    │   │   └── Sidebar.js
    │   ├── admin/
    │   │   ├── AdminLogin.js
    │   │   └── AdminDashboard.js
    │   ├── context/
    │   │   └── CurrencyContext.js
    │   ├── locales/           # Arabic & English translation files
    │   ├── styles/            # Component CSS files
    │   ├── utils/
    │   │   └── api.js         # Axios instance with JWT interceptor
    │   ├── i18n.js
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── nginx.conf
    ├── vercel.json
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** (bundled with Node.js)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)
- **Gmail account** with 2-Step Verification (for email notifications)

---

### 1 · Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/my-stickies
JWT_SECRET=replace_with_a_random_secure_string_at_least_32_characters
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_gmail_app_password
ADMIN_EMAIL=admin@yourdomain.com
PORT=8000
NODE_ENV=development
```

> **Tip — Gmail App Password**: Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), generate a password for "Mail", and paste the 16-character result as `EMAIL_PASSWORD`.

Start the development server (auto-reloads on file changes):

```bash
npm run dev     # http://localhost:8000
```

---

### 2 · Frontend Setup

```bash
cd frontend
npm install
```

Optionally create a `.env` file in `frontend/`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Start the React development server:

```bash
npm start       # http://localhost:3000
```

---

### 3 · First-Time Admin Setup

1. Open `http://localhost:3000/admin`
2. Click **"Don't have an account? Register"**
3. Enter a username, email, and password
4. Log in and start adding categories and products from the dashboard

---

## 🐳 Docker (Backend)

```bash
# Build image
docker build -t epay-store:latest ./backend

# Run container (pass environment variables via .env file)
docker run -d -p 8000:8000 --env-file backend/.env epay-store:latest
```

---

## 📡 API Reference

### Authentication — `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register a new admin account |
| POST | `/login` | Public | Log in (returns JWT) |
| GET | `/me` | Admin | Get current admin info |

### Products — `/api/products`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all active products |
| GET | `/:id` | Public | Get a single product |
| POST | `/` | Admin | Create a product |
| PUT | `/:id` | Admin | Update a product |
| DELETE | `/:id` | Admin | Delete a product |
| POST | `/:id/review` | Public | Add a rating / review |
| PUT | `/batch` | Admin | Batch-update multiple products |

### Categories — `/api/categories`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all categories |
| POST | `/` | Admin | Create a category |
| PUT | `/:id` | Admin | Update a category |
| DELETE | `/:id` | Admin | Delete a category |

### Sub-categories — `/api/subcategories`
Same CRUD pattern as categories, scoped to a parent category.

### Orders — `/api/orders`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Place a new order (triggers email notification) |
| GET | `/` | Admin | List all orders |
| GET | `/:id` | Admin | Get a single order |
| PUT | `/:id` | Admin | Update order status |
| DELETE | `/:id` | Admin | Delete an order |

### Settings — `/api/settings`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get current app settings |
| PUT | `/` | Admin | Update settings (e.g., global currency) |

---

## 🗄️ Database Schema

### Product
```js
{
  name: String,          // required
  description: String,
  price: Number,
  type: 'product' | 'eservice',
  discount: Number,      // 0–100, default 0
  image: String,         // URL
  category: ObjectId,    // ref: Category
  subCategory: ObjectId, // ref: SubCategory (optional)
  stock: Number,         // -1 = unlimited
  active: Boolean,
  currency: 'SYP' | 'USD' | null,
  mostVisited: Boolean,
  ratings: [{ user, rating, createdAt }],
  reviews: [{ user, comment, rating, createdAt }],
  // Virtuals: finalPrice, averageRating, reviewCount
}
```

### Order
```js
{
  orderNumber: String,   // auto-generated: ORD-{timestamp}-{count}
  customer: {
    fullName, phoneNumber, city, email
  },
  items: [{
    product: ObjectId, productName, categoryName,
    subCategoryName, quantity, price, discount
  }],
  totalAmount: Number,
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  notes: String
}
```

### Admin
```js
{
  username: String,  // unique
  email: String,     // unique, lowercase
  password: String,  // bcrypt hashed
  role: 'admin' | 'super_admin'
}
```

---

## ☁️ Free-Tier Deployment

The entire stack can be hosted at **zero cost**:

| Service | Platform | Notes |
|---------|----------|-------|
| Backend | [Render](https://render.com) | Node.js Web Service (free tier) |
| Frontend | [Vercel](https://vercel.com) | Static deploy; set `REACT_APP_API_URL` |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | 512 MB shared cluster |
| Email | Gmail SMTP / [Brevo](https://brevo.com) | Gmail App Password or Brevo free tier |

**Required environment variables for production (backend):**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
EMAIL_USER=...
EMAIL_PASSWORD=...
ADMIN_EMAIL=...
NODE_ENV=production
PORT=8000
```

**Required environment variables for production (frontend):**
```env
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

---

## 🔐 Security

- All passwords hashed with **bcryptjs** (salt rounds 10)
- All admin routes protected by **JWT middleware**
- User inputs validated server-side with **express-validator**
- Sensitive configuration stored exclusively in **environment variables** — never commit `.env`
- Always serve both the backend and frontend over **HTTPS** in production

---

## 🩺 Troubleshooting

| Problem | Common Causes & Fixes |
|---------|----------------------|
| Backend won't start | Check `MONGODB_URI` is correct; verify port 8000 is free |
| Frontend API calls fail | Ensure backend is running; verify `REACT_APP_API_URL`; check browser console for CORS errors |
| Emails not sending | Use a Gmail **App Password** (not your account password); ensure 2-Step Verification is enabled |
| MongoDB connection refused | Check IP whitelist in Atlas; confirm the connection string format |

---

## 📄 CV Description

> **EPay-Store** — A full-stack MERN e-commerce platform featuring a bilingual (Arabic/English) storefront with RTL support, multi-currency pricing (SYP/USD), product ratings & reviews, a secure JWT-authenticated admin dashboard for inventory and order management, automated HTML email order notifications via Nodemailer, and Docker/Nginx-ready deployment configuration targeting Render, Vercel, and MongoDB Atlas.

---

## 📜 License

This project is proprietary to My Stickies. All rights reserved.
