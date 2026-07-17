# Sales Portal — Software Requirement Document (SRD)

*Multi-Vendor E-Commerce & Field Sales Platform*

> This document is the original client-approved SRD for the project, added here for reference alongside the codebase. See the **"SRD vs. current build"** note at the end for how the implemented stack compares to what's specified below.

---

## 1. Project Overview

The Sales Portal is a multi-vendor platform where businesses can launch and manage their own products (similar to how sellers operate on Amazon and Flipkart), field sales officers can register from any location and sell products (similar to how delivery/field partners operate on Zepto and Blinkit), and customers can browse and purchase products online. The entire ecosystem is managed centrally through a Super Admin Dashboard operated by the company.

In addition to the core buying/selling workflow, the platform includes a real-time chat system, order management, commission tracking for field sales officers, and analytics/reporting for business insights.

**Client's Original Requirement (as received):** *"Make one sales portal — 1) Client/customer part where they can launch their products like Amazon and Flipkart. 2) Field sales officers like Zepto and Blinkit field sales officers — anyone can join from any location and sell products. 3) Super Admin part / dashboard for the company. Also include chat features (similar to live-chat/support-chat platforms and WhatsApp) so that the client and field sales officer can chat with the company support team."*

---

## 2. Client Requirement — Interpreted Scope

### 2.1 Client / Seller Module (Amazon & Flipkart style)

Businesses (sellers) register on the platform, create a company profile, and list/manage their own products — mirroring the seller experience on marketplaces like Amazon and Flipkart.

- Seller registration, KYC/profile setup, and approval by Super Admin
- Product listing, editing, and deletion with images, price, stock, and variants
- Inventory and order tracking specific to the seller's own products
- Sales performance reports and dashboards for the seller

### 2.2 Field Sales Officer Module (Zepto & Blinkit style)

Independent field sales officers can join the platform from any location — similar to how gig/field partners onboard on quick-commerce apps like Zepto and Blinkit — and sell listed products to customers.

- Self-registration from any location with location/geo-tagging (Google Maps / Geolocation API)
- Access to a shared product catalogue to sell on the ground
- Ability to create orders on behalf of customers
- Real-time commission tracking and earnings dashboard
- Daily/weekly performance and leaderboard ranking

### 2.3 Super Admin Dashboard (Company Control Center)

A centralized dashboard for the company to control and monitor every part of the platform.

- Approve/reject seller and field officer registrations
- Manage products, categories, orders, payments, and commissions across the platform
- Monitor chats between company, sellers, field officers, and customers
- View consolidated reports, analytics, and platform settings

### 2.4 Chat Module (Live-Support & WhatsApp style)

A real-time chat system inspired by live-support/consultation chat products (the kind used on instant-help or advisory platforms) and everyday messaging apps like WhatsApp, so that sellers (clients) and field sales officers can directly chat with the company's support team.

- One-to-one real-time chat: Client ↔ Company, Field Officer ↔ Company, Customer ↔ Company, and Customer ↔ Field Officer
- Image and document sharing within chat
- Emoji support, typing indicators, and read receipts (WhatsApp-style UX)
- Push notifications for new messages and chat history storage
- Admin-side chat monitoring for quality/support oversight

---

## 3. User Roles & Responsibilities

### 3.1 Super Admin

- Manage all users on the platform
- Approve or reject client/seller registrations
- Manage products and categories
- Manage orders, commissions, and payments
- Manage and monitor chats
- View reports and analytics
- Send notifications
- Control overall platform settings

### 3.2 Client (Seller)

- Register / Login
- Create company profile
- Add, edit, and delete products
- Manage inventory
- Track orders
- View sales reports
- Chat with company support
- View field sales performance related to their products

### 3.3 Field Sales Officer

- Register from any location
- Login securely
- Create profile
- Browse available products
- Share products with customers
- Create customer orders
- Track commission and view earnings
- Access daily performance dashboard
- Chat with company support

### 3.4 Customer

- Register / Login
- Browse and search products
- Add to cart / Wishlist
- Place orders and pay online
- Track order status
- Submit product reviews
- Chat with support

---

## 4. Core Features

### 4.1 Authentication

- Email / Mobile OTP verification
- JWT-based authentication
- Role-based access control (Admin, Client, Field Officer, Customer)
- Forgot Password / Change Password

### 4.2 Product Management

- Categories and Subcategories
- Product images, price, stock, and discounts
- Product variants
- Product approval workflow by Super Admin

### 4.3 Order Management

- Cart and Checkout
- Order confirmation and invoice generation
- Shipping and delivery status tracking
- Order history

### 4.4 Field Sales Module

- Registration from any location
- Shared product catalogue access
- Sales creation and customer management
- Commission tracking and sales reports
- Performance ranking / leaderboard

### 4.5 Chat Module

- Real-time chat (Client ↔ Company, Field Officer ↔ Company, Customer ↔ Company, Customer ↔ Field Officer)
- Image and document sharing
- Emoji support, typing indicator, read receipts
- Push notifications and chat history

### 4.6 Notifications

- Email notifications
- SMS notifications
- Push notifications
- In-app notifications

### 4.7 Reports

- Sales, Revenue, Product, Customer, and Commission reports
- Export to Excel / PDF

---

## 5. Super Admin Dashboard — Modules

| Dashboard Widget | Description |
|---|---|
| Overview | Snapshot of total users, products, orders, and revenue |
| Active Field Officers | Live count and status of field sales officers |
| Commission Overview | Company-wide commission accrued and paid |
| Product Approval | Queue of pending product listings for review |
| Chat Monitoring | Oversight of ongoing support conversations |
| Payment Management | Track and reconcile all platform payments |
| Reports & Analytics | Detailed, exportable business reports |
| User Management | Manage all roles: clients, officers, customers |
| Settings | Platform-wide configuration |

---

## 6. Technology Stack (as specified in the SRD)

| Layer | Technologies |
|---|---|
| Frontend | React.js, HTML5, CSS3, Tailwind CSS / Bootstrap, Redux Toolkit, Axios |
| Backend | Node.js, Express.js, REST API, Socket.IO (real-time chat) |
| Database | MongoDB Atlas, Mongoose ORM |
| Authentication | JWT, bcrypt |
| File Storage | Cloudinary |
| Payment Gateway | Razorpay, Stripe (optional) |
| Maps & Location | Google Maps API, Geolocation API |
| Deployment | Frontend: Vercel · Backend: Render / AWS EC2 · Database: MongoDB Atlas |
| Version Control | Git, GitHub |

---

## 7. Project Folder Structure (as specified in the SRD)

### 7.1 Frontend

- Components
- Pages
- Services
- Context / Redux
- Assets
- Hooks
- Utils

### 7.2 Backend

- Controllers
- Routes
- Models
- Middleware
- Services
- Socket
- Config
- Utils

---

## 8. Database Collections (as specified in the SRD)

| # | Collection |
|---|---|
| 1 | Users |
| 2 | Clients |
| 3 | Customers |
| 4 | FieldSales |
| 5 | Products |
| 6 | Categories |
| 7 | Orders |
| 8 | Cart |
| 9 | Wishlist |
| 10 | Payments |
| 11 | Chats |
| 12 | Messages |
| 13 | Notifications |
| 14 | Commission |
| 15 | Reviews |

---

## 9. Security

- JWT Authentication
- Password Encryption (bcrypt)
- Role-based Authorization
- Input Validation
- Rate Limiting
- CORS
- Helmet
- Secure File Upload

---

## 10. Future Enhancements

- Mobile App (Android / iOS)
- Video Calling
- AI Chatbot
- Referral System
- Loyalty Rewards
- Multi-language Support
- GST Billing
- Warehouse Management
- Delivery Partner Integration
- CRM Integration

---

## 11. Estimated Timeline

| Phase | Duration |
|---|---|
| Requirement Analysis | 3 – 5 Days |
| UI/UX Design | 7 – 10 Days |
| Frontend Development | To be finalized with team |
| Backend Development | To be finalized with team |
| Chat Module (Socket.IO) Integration | To be finalized with team |
| Testing & QA | To be finalized with team |
| Deployment | To be finalized with team |

*Note: The original document was truncated after the Frontend Development phase. Team leads should confirm and fill in the remaining durations during the kickoff meeting.*

---

## 12. Team Submission Guidelines

As per the coordinator's note, all team members contributing to this project must share their work in the following standard format so progress can be consolidated and reviewed centrally:

| Deliverable | Details |
|---|---|
| Code | Complete, working source code (frontend/backend as applicable), pushed to the shared GitHub repository |
| Documents | Total work report in Word (.doc / .docx) format, summarizing tasks completed, modules covered, and pending items |
| Videos | Short screen-recorded demo/walkthrough of the completed work or feature |

Before development begins, all members are requested to review this document and share their thoughts/suggestions so the project scope is fully aligned before work starts at scale.

---

## 13. SRD vs. Current Build — Reconciliation Note

The SRD above specifies **MongoDB Atlas / Mongoose** as the database layer. The current codebase in this repository is implemented on **MySQL 8 with Prisma ORM** instead (see `backend/prisma/schema.prisma`), using a normalized relational schema (users, roles, vendors, customers, field sales officers, products, categories, orders, payments, commissions, chat rooms/messages, etc.) rather than MongoDB collections. Everything else — Node.js/Express backend, Socket.IO for chat, JWT + bcrypt auth, React/Redux Toolkit frontend, Docker deployment — matches the SRD's technology stack.

Current implementation status against this SRD's scope (see main `README.md` → *"What's built vs. what's next"* for full detail):

- ✅ Auth, RBAC, full relational schema, Super Admin dashboard + vendor approvals, Docker Compose, Swagger docs, seed data, tests
- 🔜 Vendor portal UI, Customer storefront UI, Field Sales Officer app UI, and the chat UI (tables/sockets exist, UI pending)

If the team wants to follow the SRD literally (MongoDB/Mongoose), the Prisma/MySQL layer would need to be swapped out — worth flagging explicitly in the kickoff meeting referenced in Section 12.
