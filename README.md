# Snitch — Modern Menswear E-Commerce Platform

Full-stack MERN e-commerce application inspired by Snitch, featuring contemporary apparel catalog browsing, size-aware inventory management, cart workflows, multi-step order processing, and a role-protected seller portal.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Application-blue?style=for-the-badge&logo=render)](https://snitch-cxnr.onrender.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🌐 Live Demo](https://snitch-cxnr.onrender.com/)

---

## 1. Project Overview

**Snitch** is a full-stack e-commerce web application tailored for contemporary menswear. The project bridges customer storefront operations—such as catalog discovery, real-time search, size-specific cart persistence, and order placement—with back-office inventory and product lifecycle management for sellers.

Online apparel retail requires precise inventory handling at the variant level (such as size and stock) rather than simple generic product counts. Snitch addresses this by structuring catalog items with per-size stock matrices, enforcing stock limits during cart operations, and capturing immutable price/address snapshots when an order is finalized.

Built using the MERN stack (MongoDB, Express.js, React, Node.js) with Redux Toolkit for state management and Tailwind CSS for interface design, Snitch isolates buyer and merchant workflows through JSON Web Token (JWT) role-based authorization.

---

## 2. Key Features

### 🛍️ Shopping Experience
* **Catalog Discovery**: Server-paginated product listings with category filtering across menswear segments (Shirts, Oversized T-Shirts, Jeans, Trousers, Jackets, Accessories).
* **Search & Filter**: Keyword-based search query matching against titles and descriptions with debounce handling.
* **Product Detail Page (PDP)**: Multi-angle image preview galleries, expandable fabric care accordions, price presentation, and instant stock indicators.
* **Variant-Aware Cart**: Item selections track both product ID and chosen size (`XS`, `S`, `M`, `L`, `XL`, `XXL`). Cart operations validate quantity against available size stock.
* **Slide-Over Bag Drawer**: Persistent cart drawer with quantity increments, removals, subtotal calculation, and direct checkout progression.
* **Direct Order Placement**: Address collection flow validating shipping details (Street, House, City, State, ZIP) that captures the current cart snapshot into an order.
* **Order History & Tracking**: Dedicated account view displaying chronological orders, itemized receipts, and fulfillment status tags (`PLACED`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
* **Order Cancellation**: Customers can self-cancel orders directly while in the `PLACED` status.

### 🔐 Authentication & Security
* **JWT-Based Authentication**: Stateless authentication utilizing Bearer tokens passed via HTTP Authorization headers.
* **Role-Based Access Control (RBAC)**: Distinct permissions for standard buyers (`role: 'user'`) and merchants (`role: 'seller'`).
* **Protected Routes**: Client-side navigation guards (`ProtectedRoute.jsx`, `SellerRoute.jsx`) redirect unauthenticated visitors and restrict seller views.
* **Password Hashing**: Secure salted credential storage using `bcryptjs`.
* **Token Verification Middleware**: Server-side request guards validating token integrity and decoding user identity before executing protected controller logic.

### 🏢 Seller Portal & Catalog Management
* **Merchant Dashboard**: Dedicated portal (`/seller`) providing inventory summaries, catalog visibility stats, and direct action items.
* **Product Publishing**: Multi-field product creation with title, description, category assignment, pricing, and individual size stock allotments (`XS` to `XXL`).
* **Asset Upload Pipeline**: Multi-image file intake handled via `multer` memory storage and dispatched directly to the ImageKit CDN.
* **Catalog Control**: Inline toggles to switch products between published and draft states without deleting inventory records.
* **Inventory Editing**: Modal-based editing interface for updating descriptions, price amounts, and size stock allocations.
* **Order Status Progression**: Merchant endpoint allowing authorized order status updates from `PLACED` through to `DELIVERED`.

### 📱 UI / UX & Design System
* **Theme Switching**: Custom light and dark mode implementation managed via React Context, synced with `localStorage`, and powered by semantic CSS variables.
* **FOUC Prevention**: Inline pre-render script in `index.html` preventing light/dark theme flash on initial browser parse.
* **Responsive Architecture**: Breakpoint-tailored layouts (mobile drawer navigation, collapsible filter bars, adaptive 2-to-4 column product grids).
* **Feedback States**: Component-level loading skeletons, zero-item empty states, and descriptive error alerts.

---

## 3. Technical Highlights

* **Variant-Level Stock Architecture**: Implemented an embedded sub-document array schema for product sizes (`sizes: [{ size: String, stock: Number }]`), ensuring inventory is accurately tied to garment dimensions rather than aggregate counts.
* **Centralized Redux Toolkit State**: Engineered modular slices (`auth`, `products`, `cart`, `orders`, `ui`) with `createAsyncThunk` routines to handle asynchronous API calls, request lifecycles, and cache invalidation.
* **Stateless Token-Based Authorization**: Structured backend middleware (`protect`, `authorizeRoles`) to verify cryptographic JWT signatures, query user records, and attach verified user payloads to Express request contexts.
* **Defensive Cart & Checkout Mechanics**: Designed cart controllers to validate active inventory levels before cart pushes, and mapped order checkout to copy an immutable product snapshot, preventing downstream price edits from altering past order receipts.
* **Zero-Flash Theme Engine**: Integrated an early-execution DOM script evaluating system preferences and cached theme tokens prior to stylesheet execution, guaranteeing seamless transitions between light and dark modes.
* **Asset Upload & Cloud Media Storage**: Integrated Multer memory buffering with ImageKit's Node.js SDK to offload media assets directly to a cloud CDN, storing secure URLs and file IDs in MongoDB.

---

## 4. Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18, JavaScript (ES6+), Vite 5 |
| **State Management** | Redux Toolkit, React-Redux |
| **Routing** | React Router v6 |
| **Styling & UI** | Tailwind CSS 3, Custom CSS Variables, Lucide React Icons |
| **Backend Runtime** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose 8 (ODM) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| **File Handling & CDN** | Multer, ImageKit Node.js SDK |
| **HTTP Client** | Axios (with central instance & request interceptor) |
| **Deployment** | Render (Static Site for Client, Web Service for API) |
| **Version Control** | Git, GitHub |

---

## 5. Application Architecture

```
User Action (Browser)
       │
       ▼
React Components (Pages / Slices / Modals)
       │
       ▼
Redux Toolkit Dispatches / Context Hooks
       │
       ▼
Axios Client Instance (src/api/client.js — Auto Bearer JWT Injection)
       │
       ▼ [HTTPS REST Request]
Express.js Router Layer (server/src/routes/)
       │
       ▼
Middleware Layer (cors, express.json, auth.middleware [JWT verify + RBAC])
       │
       ▼
Controller Layer (auth, product, cart, order controllers)
       │
       ▼
Mongoose ODM Models (User, Product, Cart, Order)
       │
       ▼
MongoDB Database Instance (Atlas Cluster)
```

### Authentication & Request Flow
1. **User Login**: The client submits email and password credentials to `POST /api/auth/login`.
2. **Token Generation**: The server verifies the password with `bcrypt.compare`. Upon success, it signs a JWT containing the user's `id` and `role`.
3. **Client Storage**: The frontend persists the token and basic user object in `localStorage` and commits the auth record to the Redux `authSlice`.
4. **Subsequent Calls**: An Axios request interceptor pulls the token from storage and injects it as an `Authorization: Bearer <token>` header on outbound requests.
5. **Route Protection**: Protected backend endpoints pass incoming requests through `protect`, which decodes the token with `jwt.verify` and verifies role constraints via `authorizeRoles('seller')`.

---

## 6. Project Structure

```
Snitch/
├── client/                     # Frontend SPA (React + Vite)
│   ├── public/                 # Static public assets (icons, favicon)
│   ├── src/
│   │   ├── api/                # Axios instance with baseURL & auth interceptors
│   │   ├── components/         # Reusable presentation components
│   │   │   ├── common/         # Navbar, Footer, Modal, Skeleton loaders
│   │   │   ├── product/        # ProductCard, ProductGrid, FilterBar
│   │   │   ├── cart/           # CartDrawer, CartItem
│   │   │   └── seller/         # Metric cards, Inventory tables, AddProductModal
│   │   ├── context/            # ThemeContext (Light / Dark mode controller)
│   │   ├── pages/              # Route views (Home, Shop, ProductDetails, Cart,
│   │   │                       #             Checkout, Orders, SellerDashboard)
│   │   ├── routes/             # Route definitions, ProtectedRoute, SellerRoute
│   │   ├── store/              # Redux Toolkit store and feature slices
│   │   │   └── slices/         # authSlice, cartSlice, productSlice, orderSlice, uiSlice
│   │   ├── App.jsx             # Top-level layout and routing tree
│   │   ├── index.css           # Tailwind directives & CSS design system variables
│   │   └── main.jsx            # React root mount with Redux Provider & ThemeProvider
│   ├── index.html              # HTML entry point with zero-flash theme script
│   ├── tailwind.config.js      # Custom theme color mappings and responsive tokens
│   ├── vite.config.js          # Vite build options and proxy configuration
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Database connection (db.js) & ImageKit config
│   │   ├── controller/         # Request handling & business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── cart.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/         # auth.middleware.js, upload.middleware.js
│   │   ├── models/             # Mongoose schemas (User, Product, Cart, Order)
│   │   ├── routes/             # REST route definitions
│   │   │   ├── auth.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── order.routes.js
│   │   │   └── product.routes.js
│   │   ├── utils/              # Image upload handlers & helper functions
│   │   └── app.js              # Express app initialization & middleware registration
│   ├── server.js               # HTTP listener entry point
│   └── package.json
│
└── README.md                   # Project documentation
```

---

## 7. Core User Flows

### Customer Shopping & Ordering Flow
```
Visit Storefront (/shop)
       │
       ├─ Filter by category (e.g. Shirts, Oversized, Jeans) or search keywords
       │
       ▼
Select Product Card
       │
       ▼
View Product Details (/product/:id)
       │
       ├─ Select size variant (XS - XXL) with live stock verification
       │
       ▼
Click "Add to Cart" ──► Triggers cart API sync & opens slide-over Cart Drawer
       │
       ▼
Proceed to Checkout (/checkout)
       │
       ├─ (Unauthenticated users are prompted to Register/Login)
       │
       ▼
Enter Shipping Address (Street, House, City, State, ZIP)
       │
       ▼
Confirm Order ──► Order snapshot created with status 'PLACED'
       │
       ▼
View Order Confirmation & History (/orders)
       │
       └─ Self-cancel permitted while status remains 'PLACED'
```

### Seller Management Flow
```
Login as Seller (/login)
       │
       ▼
Navigate to Seller Portal (/seller)
       │
       ├─ Review Catalog Metrics (Total Products, Active Listings, Out of Stock)
       │
       ├─ Click "Add Product" ──► Upload images, assign categories, define size-stock matrix
       │
       ├─ Toggle "Published / Draft" status per product
       │
       └─ Review Orders & Advance Fulfillment Status ('CONFIRMED' ➔ 'SHIPPED' ➔ 'DELIVERED')
```

---

## 8. REST API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account (`name`, `email`, `password`, `role`) | Public |
| `POST` | `/api/auth/login` | Validate credentials and receive JWT | Public |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Private (User / Seller) |

### Products (`/api/products`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Fetch paginated catalog (`category`, `search`, `page`, `limit`) | Public |
| `GET` | `/api/products/:id` | Fetch single product details by MongoDB ID | Public |
| `GET` | `/api/products/seller` | Fetch seller's own inventory with pagination | Private (Seller only) |
| `POST` | `/api/products` | Create product with multipart image upload & size matrix | Private (Seller only) |
| `PATCH` | `/api/products/update/:id` | Update product details, prices, and size-specific stock | Private (Seller only) |
| `PATCH` | `/api/products/publish/:id` | Toggle product published / draft status | Private (Seller only) |
| `DELETE` | `/api/products/image/:id/:imageId` | Remove image from ImageKit storage and document array | Private (Seller only) |

### Cart (`/api/cart`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Retrieve user's active cart with populated product data | Private (User / Seller) |
| `POST` | `/api/cart/add/product/:productId` | Add item or increment quantity for specific `size` | Private (User / Seller) |
| `DELETE` | `/api/cart/remove/product/:productId` | Decrement quantity or remove item variant from cart | Private (User / Seller) |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Create new order from current cart and shipping address | Private (User / Seller) |
| `GET` | `/api/orders` | Fetch authenticated user's order history | Private (User / Seller) |
| `PATCH` | `/api/orders/cancel/:orderid` | Cancel placed order (valid only if status is `PLACED`) | Private (User / Seller) |
| `PATCH` | `/api/orders/status/:orderid` | Update fulfillment status (`CONFIRMED`, `SHIPPED`, etc.) | Private (Seller only) |

---

## 9. Database Design

Data persistence is managed via MongoDB using Mongoose schemas with referential integrity and embedded subdocuments:

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│              User               │           │             Product             │
├─────────────────────────────────┤           ├─────────────────────────────────┤
│ _id: ObjectId                   │◄────┐     │ _id: ObjectId                   │
│ name: String                    │     │     │ title: String                   │
│ email: String (Unique)          │     │     │ description: String             │
│ passwordHash: String            │     │     │ price: { amount, currency }     │
│ role: 'user' | 'seller'         │     │     │ categories: [String]            │
│ createdAt: Date                 │     │     │ images: [{ imagekitId, url }]   │
└─────────────────────────────────┘     │     │ sizes: [{ size, stock }]        │
                                        │     │ seller: ObjectId ───────────────┘
                                        │     │ isPublished: Boolean            │
                                        │     └─────────────────────────────────┘
                                        │                      ▲
┌─────────────────────────────────┐     │                      │
│              Cart               │     │                      │
├─────────────────────────────────┤     │                      │
│ _id: ObjectId                   │     │                      │
│ user: ObjectId ─────────────────┼─────┤                      │
│ products: [                     │     │                      │
│   {                             │     │                      │
│     product: ObjectId ──────────┼─────┼──────────────────────┘
│     quantity: Number            │     │
│     size: String                │     │
│   }                             │     │
│ ]                               │     │
└─────────────────────────────────┘     │
                                        │
┌─────────────────────────────────┐     │
│              Order              │     │
├─────────────────────────────────┤     │
│ _id: ObjectId                   │     │
│ user: ObjectId ─────────────────┼─────┘
│ address: {                      │
│   street, house, city,          │
│   state, zip                    │
│ }                               │
│ products: [                     │
│   {                             │
│     productId: ObjectId         │
│     title: String               │
│     price: Number               │
│     size: String                │
│     quantity: Number            │
│     image: String               │
│   }                             │
│ ]                               │
│ totalPrice: Number              │
│ status: String                  │
│ createdAt: Date                 │
└─────────────────────────────────┘
```

### Schema Responsibilities:
* **User**: Stores authentication credentials, identity data, and authorization role tags.
* **Product**: Contains title, catalog category tags, pricing object, ImageKit CDN image identifiers, and the embedded per-size inventory array (`sizes`). References the merchant `User` ID.
* **Cart**: One-to-one relationship with `User`. Stores item records pairing referenced product IDs with requested garment sizes and quantities.
* **Order**: Stores immutable snapshots of ordered items (preserving price, title, image, and size at the exact moment of order placement) along with structured shipping addresses and lifecycle status flags.

---

## 10. Local Development Setup

### Prerequisites
* **Node.js** (v18.x or later recommended)
* **npm** (v9.x or later)
* **MongoDB** instance (local daemon or MongoDB Atlas connection string)
* Free **ImageKit** account (for media upload functionality)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naitik-work/Snitch.git
   cd Snitch
   ```

2. **Backend Setup:**
   ```bash
   # Navigate to server directory
   cd server

   # Install dependencies
   npm install

   # Create environment configuration
   cp .env.example .env
   # Populate .env with your MongoDB URI, JWT Secret, and ImageKit keys
   ```

3. **Frontend Setup:**
   ```bash
   # In a separate terminal, navigate to client directory
   cd ../client

   # Install dependencies
   npm install

   # Create environment configuration
   cp .env.example .env
   # Configure VITE_API_URL if connecting to a remote backend, or leave default for local proxy
   ```

4. **Running Development Servers:**
   * **Terminal 1 (Backend API):**
     ```bash
     cd server
     npm run dev
     ```
     *Server launches on `http://localhost:5000` (or configured `PORT`).*

   * **Terminal 2 (Frontend Client):**
     ```bash
     cd client
     npm run dev
     ```
     *Vite dev server launches on `http://localhost:5173`.*

---

## 11. Environment Variables

The project requires the following environment variables. Do not commit actual secrets to version control.

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint_id
```

### Frontend (`client/.env`)
```env
# Optional: Set base API URL for production deployment.
# In local development, leaving this empty defaults to the Vite local proxy configuration.
VITE_API_URL=https://your-backend-service.onrender.com/api
```

---

## 12. Deployment Configuration

The live web application is hosted on **Render**:

* **Live Demo URL**: [https://snitch-cxnr.onrender.com/](https://snitch-cxnr.onrender.com/)

### Architecture Breakdown
* **Client Frontend**: Deployed as a Render **Static Site**.
  * **Root Directory**: `client`
  * **Build Command**: `npm install && npm run build`
  * **Publish Directory**: `dist`
  * **SPA Routing Rewrite Rule**: Configured with a rewrite rule (`/*` → `/index.html`) to allow React Router to handle deep links and page refreshes cleanly without 404 errors.
* **Backend API**: Deployed as a Render **Web Service**.
  * **Root Directory**: `server`
  * **Build Command**: `npm install`
  * **Start Command**: `npm start` (`node server.js`)
  * **CORS Whitelist**: Configured to accept incoming cross-origin requests from the client domain.

---

## 13. Engineering Challenges & Solutions

### 1. Variant-Aware Inventory Bounding
* **Challenge**: Apparel products exist across varying sizes (`S`, `M`, `L`, etc.), each having unique inventory counts. Storing a single global quantity count on a product record would cause out-of-stock overselling on popular sizes.
* **Approach**: Structured product schemas with a dedicated `sizes` subdocument array (`[{ size, stock }]`). Updated cart logic (`cart.controller.js`) and order checkout routines to evaluate available stock specifically for the requested size attribute before allowing additions.
* **Result**: Prevents size overselling and surfaces real-time stock indicators (e.g., "Out of Stock" or low-stock warnings) on the product detail page during size selection.

### 2. Zero-Flash Semantic Theme Engine (Light / Dark Mode)
* **Challenge**: Modern React applications often encounter a "flash of unstyled content" (FOUC) when switching themes on reload, because the JavaScript bundle must load and execute before the user's stored preference is read.
* **Approach**: Injected an inline pre-render script in the `<head>` of `index.html` that reads `localStorage.getItem('snitch_theme')` or system `prefers-color-scheme` immediately and sets the `.dark` class on the root `<html>` element before HTML rendering begins. Mapped colors to high-level CSS variables in `index.css`.
* **Result**: Instantaneous, flicker-free page loads in both light and dark modes with comprehensive UI theme consistency.

### 3. Immutable Order Receipts vs. Evolving Catalogs
* **Challenge**: If an order simply references a `Product` document ID, subsequent merchant changes (such as price alterations, title revisions, or deleted listings) would corrupt historical customer purchase receipts.
* **Approach**: Designed the `Order` model to duplicate an immutable snapshot of item attributes (`title`, `price`, `size`, `image`, `productId`) during order creation.
* **Result**: Customer order receipts remain permanent and historically accurate regardless of future edits to the merchant's active catalog.

### 4. Direct Cloud Media Ingestion
* **Challenge**: Persisting binary image uploads directly to local application storage or database records causes high memory overhead, slow query performance, and disk persistence issues in containerized cloud environments like Render.
* **Approach**: Configured `multer` memory storage to buffer uploads in memory, piped files to the ImageKit Node.js SDK, and persisted only the resulting CDN URL and file ID into MongoDB.
* **Result**: High-speed image delivery via CDN caching and zero local disk dependency on backend servers.

---

## 14. What I Learned

* **Full-Stack MERN Architecture**: Building decoupled, production-grade applications with clean separation between presentation, state orchestration, routing, business logic, and database operations.
* **Granular Data Modeling with Mongoose**: Structuring relational and embedded schemas for complex e-commerce logic, managing subdocument mutations, and handling reference population.
* **State Orchestration with Redux Toolkit**: Implementing predictable global state flows with async thunks, error handling, and optimistic client-side feedback.
* **Security & Authentication Flow**: Implementing stateless JWT authentication with encrypted passwords, role-based route protection, and HTTP header interceptors.
* **Responsive E-Commerce UX**: Engineering responsive layouts, modal drawers, and keyboard-accessible interfaces optimized for varying viewport dimensions.
* **Cloud Asset Management & Deployment**: Managing cloud media pipelines with ImageKit and configuring multi-service production environments on Render.

---

## 15. Future Improvements

* **Payment Gateway Integration**: Integrate Stripe or Razorpay webhooks to process online payments, transition from direct checkout to secure pre-order payment authorization, and handle automated refunds.
* **Automated Test Coverage**: Implement backend unit and integration test suites using Jest/Supertest alongside frontend component and user flow tests using Vitest and React Testing Library.
* **Order Item Multi-Seller Splitting**: Extend order processing to split orders containing items from multiple distinct sellers into individual merchant fulfillment workflows.
* **Customer Wishlist & Saved Items**: Add a dedicated user wishlist collection in MongoDB with instant toggle states on catalog cards.
* **Automated Email Notifications**: Integrate Nodemailer or SendGrid to dispatch order confirmation receipts, status updates, and password reset workflows.

---

## 16. Author

**Naitik Chitransh**
* **GitHub**: [@naitik-work](https://github.com/naitik-work)
* **Live Project**: [Snitch E-Commerce](https://snitch-cxnr.onrender.com/)
