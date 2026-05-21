# 🏆 TenderFlow - Enterprise Tender Management System

> A powerful, scalable B2B platform designed to streamline the tender submission and evaluation process for organizations and traders/contractors.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Key Features & Workflows](#key-features--workflows)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TenderFlow** is a modern, enterprise-grade tender management platform that bridges the gap between organizations seeking services/products and traders/contractors willing to provide competitive bids. The platform facilitates a transparent, efficient bidding process with real-time notifications, secure authentication, and comprehensive tender tracking.

### Use Cases
- **Organizations**: Post procurement tenders, manage quotations, compare bids, award contracts
- **Traders/Contractors**: Discover business opportunities, submit competitive quotations, track bid status
- **Admins**: Monitor system activity, manage users, ensure compliance

---

## ✨ Features

### For Organizations
- ✅ Create and publish tenders with detailed specifications
- ✅ Set deadlines and automatically track tender lifecycle
- ✅ Receive and manage quotations from multiple traders
- ✅ Compare quotations side-by-side
- ✅ Track tender status (OPEN, EVALUATION, AWARDED, CLOSED)
- ✅ Award contracts and notify winners
- ✅ Dashboard with tender analytics and insights
- ✅ Customizable notification preferences

### For Traders/Contractors
- ✅ Browse available tenders in real-time
- ✅ Filter tenders by category, deadline, status
- ✅ Submit competitive quotations for tenders
- ✅ Track quotation submission status
- ✅ View bid history and performance metrics
- ✅ Manage professional profile
- ✅ Receive notifications on tender updates

### System-Wide
- ✅ JWT-based authentication with role-based access control
- ✅ Redis caching for performance optimization
- ✅ RESTful API with comprehensive endpoints
- ✅ MongoDB for flexible data storage
- ✅ Responsive UI with Tailwind CSS + Shadcn/ui
- ✅ Microservices architecture (optional)
- ✅ Docker containerization for easy deployment
- ✅ Real-time data synchronization

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│              (Org Dashboard | Trader Dashboard)              │
└────────────────────┬────────────────────────────────────────┘
                     │ (HTTP/REST)
┌────────────────────▼────────────────────────────────────────┐
│              BACKEND API (Express.js)                        │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐       │
│  │ Auth Routes  │  │Tender Routes│  │Quotation API │       │
│  └──────────────┘  └─────────────┘  └──────────────┘       │
└────────────┬─────────────────────────────────┬──────────────┘
             │                                 │
   ┌─────────▼────────┐         ┌──────────────▼────────┐
   │   MongoDB        │         │   Redis Cache         │
   │  (Primary Store) │         │  (Session/Cache)      │
   └──────────────────┘         └───────────────────────┘

OPTIONAL MICROSERVICES LAYER:
  ├── Auth Service (Authentication & Authorization)
  ├── Tender Service (Tender Management)
  └── Quotation Service (Quotation Management)
```

---

## 🛠️ Technology Stack

### Frontend
| Layer | Technologies |
|-------|--------------|
| **Framework** | React 18.3.1 |
| **Build Tool** | Vite 5.4.19 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS 3.4 + Shadcn/ui |
| **State Management** | React Query (TanStack Query) 5.83 |
| **Routing** | React Router DOM 6.30 |
| **Forms** | React Hook Form 7.61 + Zod validation |
| **UI Components** | Radix UI (Headless components) |
| **Icons** | Lucide React 0.462 |
| **Testing** | Vitest 3.2.4 |
| **Charts** | Recharts 2.15.4 |

### Backend
| Layer | Technologies |
|-------|--------------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5.2.1 |
| **Language** | JavaScript (ES6+) |
| **Database** | MongoDB 9.2.1 (Mongoose) |
| **Cache** | Redis 5.11.0 |
| **Authentication** | JWT (jsonwebtoken 9.0.3) |
| **Password Hashing** | Bcrypt 6.0.0 |
| **Middleware** | CORS 2.8.6 |
| **Environment** | Dotenv 17.3.1 |

### DevOps
| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Node** | Runtime environment |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+) and **npm** (v9+) or **yarn**
- **MongoDB** (v4.4+) - Local or Atlas URI
- **Redis** (v6.0+) - For caching
- **Docker** & **Docker Compose** (optional, for containerized deployment)
- **Git**

### Quick Check
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
docker --version  # Optional: Should be 20.10+
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tenderflow.git
cd tenderflow
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend-tenderflow
npm install
```

#### Create Environment File
```bash
cp .env.example .env
# OR create manually with the following:
```

**`.env` file (Backend)**
```env
# Server Configuration
BE_PORT=3000

# Database
DB_URI=mongodb://localhost:27017/tenderflow
# OR use MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/tenderflow?retryWrites=true&w=majority

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Leave empty if no password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# Environment
NODE_ENV=development
```

#### Verify MongoDB Connection
```bash
# Test connection to MongoDB
mongosh "mongodb://localhost:27017"
```

#### Verify Redis Connection
```bash
# Test connection to Redis
redis-cli ping
# Should return: PONG
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../tenderflow-pro
npm install
# or
bun install  # If using Bun package manager
```

#### Create Environment File
```bash
touch .env.local
```

**`.env.local` file (Frontend)**
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Environment
VITE_ENV=development
```

### 4. Verify Installation
```bash
# Backend: Test API endpoint
npm run dev  # Start backend
curl http://localhost:3000  # Should return: {"success": true, "message": "API responding"}

# Frontend: Check if build works
npm run build
```

---

## 📁 Project Structure

```
tenderflow/
├── backend-tenderflow/                 # Express.js Backend
│   ├── config/
│   │   ├── db.js                      # MongoDB connection
│   │   └── redis.js                   # Redis connection
│   ├── middleware/
│   │   ├── auth.js                    # JWT authentication middleware
│   │   ├── errorHandler.js            # Global error handler
│   │   └── role.js                    # Role-based access control
│   ├── models/
│   │   ├── User.js                    # User schema (ORG, TRADER, ADMIN)
│   │   ├── Tender.js                  # Tender schema
│   │   └── Quotation.js               # Quotation/Bid schema
│   ├── routes/
│   │   ├── auth.routes.js             # POST /register, /login, GET /me
│   │   ├── tender.routes.js           # CRUD operations for tenders
│   │   └── quotation.routes.js        # CRUD operations for quotations
│   ├── utils/
│   │   └── generateToken.js           # JWT token generation
│   ├── server.js                      # Express app initialization
│   ├── package.json                   # Dependencies
│   └── Dockerfile                     # Docker configuration
│
├── microservices/                     # Optional Microservices (Scalable)
│   ├── auth-service/                  # Independent auth service
│   ├── tender-service/                # Independent tender service
│   └── quotation-service/             # Independent quotation service
│
├── tenderflow-pro/                    # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # Shadcn UI components (50+)
│   │   │   ├── layouts/
│   │   │   │   ├── OrgSidebar.tsx      # Organization sidebar
│   │   │   │   ├── TraderSidebar.tsx   # Trader sidebar
│   │   │   │   └── TopNavbar.tsx       # Navigation bar
│   │   │   ├── org/
│   │   │   │   └── ComparisonModal.tsx # Compare quotations
│   │   │   ├── trader/
│   │   │   │   └── SubmitQuotationModal.tsx
│   │   │   ├── ProtectedRoute.tsx      # Route protection HOC
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Landing.tsx            # Home page
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── org/
│   │   │   │   ├── OrgDashboard.tsx    # Org dashboard with stats
│   │   │   │   ├── CreateTender.tsx    # Tender creation form
│   │   │   │   ├── MyTenders.tsx       # List organization tenders
│   │   │   │   ├── TenderDetails.tsx   # Tender details & quotations
│   │   │   │   ├── QuotationsReceived.tsx
│   │   │   │   └── OrgSettings.tsx
│   │   │   ├── trader/
│   │   │   │   ├── TraderDashboard.tsx
│   │   │   │   ├── BrowseTenders.tsx   # Search & filter tenders
│   │   │   │   ├── TraderTenderDetails.tsx
│   │   │   │   ├── MyQuotations.tsx    # Submitted quotations
│   │   │   │   └── TraderProfile.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.js         # Auth state management
│   │   ├── hooks/
│   │   │   ├── use-toast.ts
│   │   │   └── use-mobile.tsx
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript type definitions
│   │   ├── lib/
│   │   │   └── utils.ts               # Utility functions
│   │   ├── data/
│   │   │   └── mockData.ts            # Mock data for development
│   │   ├── layouts/
│   │   │   ├── OrgLayout.tsx
│   │   │   └── TraderLayout.tsx
│   │   ├── App.tsx                    # Main app routing
│   │   ├── main.tsx                   # Entry point
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.ts             # Tailwind CSS config
│   ├── tsconfig.json
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml                 # Multi-container setup
├── .gitignore
└── README.md                          # This file!
```

---

## 🔌 API Documentation

### Base URL
```
Local: http://localhost:3000
Production: https://api.tenderflow.com
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "ORG"              # OR "TRADER" or "ADMIN"
}

Response (201):
{
  "success": true,
  "message": "User created",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ORG",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

Response (200):
{
  "status": true,
  "message": "Login successfull",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { /* user object */ }
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { /* user object */ }
}
```

### Tender Endpoints

#### Create Tender (ORG only)
```http
POST /tender/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Website Development Project",
  "description": "Need modern responsive website",
  "category": "IT Services",
  "deadline": "2024-02-15T23:59:59Z"
}

Response (201):
{
  "success": true,
  "message": "Tender created successfully",
  "tender": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Development Project",
    "description": "Need modern responsive website",
    "category": "IT Services",
    "deadline": "2024-02-15T23:59:59Z",
    "organization": "507f1f77bcf86cd799439011",
    "status": "OPEN",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get All Tenders (with filters)
```http
GET /tender/all?status=OPEN&category=IT Services&page=1&limit=10
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "tenders": [ /* array of tenders */ ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

#### Get Tender by ID
```http
GET /tender/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "tender": { /* tender object with quotations */ }
}
```

#### Update Tender Status
```http
PATCH /tender/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "EVALUATION"  # OPEN, EVALUATION, AWARDED, CLOSED
}

Response (200):
{
  "success": true,
  "message": "Tender status updated",
  "tender": { /* updated tender */ }
}
```

#### Delete Tender
```http
DELETE /tender/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Tender deleted successfully"
}
```

### Quotation Endpoints

#### Submit Quotation (TRADER only)
```http
POST /quotation/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "tenderId": "507f1f77bcf86cd799439012",
  "amount": 50000,
  "description": "We offer high-quality development services",
  "deliveryDays": 45
}

Response (201):
{
  "success": true,
  "message": "Quotation submitted successfully",
  "quotation": {
    "_id": "507f1f77bcf86cd799439013",
    "tenderId": "507f1f77bcf86cd799439012",
    "trader": "507f1f77bcf86cd799439014",
    "amount": 50000,
    "description": "High-quality development",
    "deliveryDays": 45,
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Quotations for Tender
```http
GET /quotation/tender/:tenderId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "quotations": [ /* array of quotations */ ]
}
```

#### Get My Quotations (TRADER)
```http
GET /quotation/my-quotations
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "quotations": [ /* trader's quotations */ ]
}
```

#### Award Quotation (ORG only)
```http
PATCH /quotation/:id/award
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Quotation awarded successfully",
  "quotation": { /* updated quotation */ }
}
```

#### Reject Quotation
```http
PATCH /quotation/:id/reject
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Quotation rejected"
}
```

---

## 🔐 Environment Variables

### Backend (`.env`)
```env
# Server
BE_PORT=3000
NODE_ENV=development

# Database
DB_URI=mongodb://localhost:27017/tenderflow

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRY=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`.env.local`)
```env
# API
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

---

## 🚀 Running the Application

### Option 1: Local Development (Recommended)

#### Terminal 1 - Start MongoDB
```bash
# If using local MongoDB
mongod

# OR if using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Terminal 2 - Start Redis
```bash
# If using local Redis
redis-server

# OR if using Docker
docker run -d -p 6379:6379 --name redis redis:latest
```

#### Terminal 3 - Start Backend
```bash
cd backend-tenderflow
npm install
npm run dev
# Server running at http://localhost:3000
```

#### Terminal 4 - Start Frontend
```bash
cd tenderflow-pro
npm install
npm run dev
# Frontend running at http://localhost:5173
```

**Access the Application**: Open browser to `http://localhost:5173`

### Option 2: Using Docker Compose (Recommended for Production)

```bash
# Build and start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Services will be running on:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- MongoDB: `localhost:27017`
- Redis: `localhost:6379`

### Option 3: Production Build

#### Backend
```bash
cd backend-tenderflow
npm install
npm start
```

#### Frontend
```bash
cd tenderflow-pro
npm install
npm run build
npm run preview
```

---

## 🐳 Docker Deployment

### Build Custom Docker Images
```bash
# Build backend image
cd backend-tenderflow
docker build -t tenderflow-backend:1.0.0 .

# Build frontend image
cd ../tenderflow-pro
docker build -t tenderflow-frontend:1.0.0 .
```

### Docker Compose Configuration
The project includes a `docker-compose.yml` with:
- Frontend service (Vite)
- Backend service (Express)
- MongoDB service
- Redis service

### Deploy to Production
```bash
# Pull latest code
git pull origin main

# Build and deploy
docker-compose -f docker-compose.yml up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["ORG", "TRADER", "ADMIN"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Tender Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  category: String,
  deadline: Date (required),
  organization: ObjectId (required, ref: User),
  status: String (enum: ["OPEN", "EVALUATION", "AWARDED", "CLOSED"], default: "OPEN"),
  createdAt: Date,
  updatedAt: Date
}
```

### Quotation Model
```javascript
{
  _id: ObjectId,
  tender: ObjectId (required, ref: Tender),
  trader: ObjectId (required, ref: User),
  amount: Number (required),
  description: String,
  deliveryDays: Number,
  status: String (enum: ["PENDING", "AWARDED", "REJECTED"], default: "PENDING"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Authorization

### JWT Flow
1. User registers/logs in
2. Backend generates JWT token (valid for 7 days)
3. Frontend stores token in localStorage
4. Token sent in `Authorization: Bearer <token>` header
5. Middleware validates token on protected routes

### Role-Based Access Control (RBAC)
```javascript
// Three roles with distinct permissions:

ORG (Organization)
├── Create tenders
├── View their own tenders
├── Manage tender lifecycle
└── Evaluate & award quotations

TRADER (Contractor/Supplier)
├── Browse all open tenders
├── Submit quotations
├── View their own quotations
└── Track bid status

ADMIN
├── Manage all users
├── Monitor system activity
└── Generate reports
```

### Middleware Protection
```javascript
// Protected endpoints require:
1. Valid JWT token in Authorization header
2. Correct user role (checked by role middleware)
3. Ownership verification for resource access
```

---

## 🎯 Key Features & Workflows

### Tender Lifecycle Workflow
```
OPEN
  ↓ (Traders submit quotations)
EVALUATION
  ↓ (Organization reviews & compares)
AWARDED
  ↓ (Contract awarded to winner)
CLOSED
```

### Tender Submission Workflow (Org)
1. Organization logs in
2. Creates tender with title, description, category, deadline
3. Tender published as OPEN
4. Traders can see it in browse tenders
5. Org views received quotations
6. Org can compare quotations side-by-side
7. Org awards quotation (changes status to AWARDED)
8. Org closes tender

### Quotation Submission Workflow (Trader)
1. Trader logs in
2. Browses available (OPEN) tenders
3. Filters by category, deadline, etc.
4. Clicks on tender to view details
5. Submits quotation with amount, description, delivery days
6. Quotation shows as PENDING
7. Waits for organization to award or reject
8. Tracks submission in "My Quotations"

### Dashboard Features
**Org Dashboard:**
- Total tenders created
- Active tenders count
- Total quotations received
- Pending review quotations
- Recently created tenders

**Trader Dashboard:**
- Browsable tenders count
- Submitted quotations
- Pending quotations
- Awarded quotations
- Rejection rate

---

## 💻 Development Guide

### Running Tests
```bash
# Frontend tests
cd tenderflow-pro
npm run test           # Run tests once
npm run test:watch    # Watch mode

# Backend tests
cd backend-tenderflow
npm run test          # Coming soon
```

### Code Style & Linting
```bash
# Frontend linting
cd tenderflow-pro
npm run lint

# Fix linting issues
npx eslint . --fix
```

### Adding New Features

#### Backend - New Route
1. Create controller in appropriate file
2. Add route in `routes/` folder
3. Add middleware if needed
4. Test with Postman/cURL

#### Frontend - New Page
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Create sidebar link if needed
4. Test navigation

#### Database - New Field
1. Update Mongoose schema in `models/`
2. Create migration script
3. Update API endpoints
4. Update frontend forms

### Debug Mode
```bash
# Backend - Verbose logging
DEBUG=tenderflow:* npm start

# Frontend - Dev tools
Open Chrome DevTools (F12)
Network tab to inspect API calls
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If not running locally, use MongoDB Atlas
# Update DB_URI in .env to your Atlas connection string
```

### Redis Connection Issues
```bash
# Check Redis status
redis-cli ping
# Should return: PONG

# If Redis not running
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:latest
```

### Port Already in Use
```bash
# Kill process on port 3000 (backend)
lsof -i :3000
kill -9 <PID>

# Kill process on port 5173 (frontend)
lsof -i :5173
kill -9 <PID>

# Or use different ports in .env
```

### Token Expiration Issues
- Tokens expire after 7 days
- Solution: User must login again
- Future: Implement refresh token mechanism

### CORS Errors
```bash
# Ensure backend CORS_ORIGIN matches frontend URL
# Backend .env: CORS_ORIGIN=http://localhost:5173
# Restart backend after changing
```

### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force
```

---

## 🤝 Contributing

### Steps to Contribute
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation
- Test thoroughly before submitting PR

### Reporting Issues
- Check existing issues first
- Provide detailed description
- Include error messages & logs
- Provide reproduction steps
- Mention your environment (OS, Node version, etc.)

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 👥 Authors & Acknowledgments

- **Project Creator**: TenderFlow Team
- **Contributors**: Open to community contributions

### Tech Stack Credits
- React & Vite Team
- Shadcn/ui - Beautiful UI components
- Express.js community
- Tailwind CSS team

---

## 🚀 Roadmap

### Upcoming Features (v2.0)
- [ ] Email notifications for tender updates
- [ ] SMS alerts for urgent deadlines
- [ ] Advance payment gateway integration
- [ ] Digital signature for contracts
- [ ] Analytics & reporting dashboard
- [ ] Bulk tender import/export
- [ ] Mobile app (iOS & Android)
- [ ] Microservices deployment guide
- [ ] API versioning (v2)
- [ ] GraphQL support
- [ ] Real-time chat between Org & Traders
- [ ] Document storage & management
- [ ] Compliance tracking & audit logs

---

## 📞 Support & Contact

- **Email**: support@tenderflow.com
- **Documentation**: [Full Docs](https://docs.tenderflow.com)
- **Issues**: [GitHub Issues](https://github.com/tenderflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tenderflow/discussions)

---

## 🎉 Getting Started Quick Reference

```bash
# Clone
git clone https://github.com/tenderflow/tenderflow.git && cd tenderflow

# Backend Setup
cd backend-tenderflow && npm install && npm run dev

# Frontend Setup (new terminal)
cd tenderflow-pro && npm install && npm run dev

# Access App
# Frontend: http://localhost:5173
# API: http://localhost:3000

# Test Login
# Org Account: org@example.com / password
# Trader Account: trader@example.com / password
```

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Maintained By**: TenderFlow Team



<div align="center">

**⭐ If you find this project useful, please star it on GitHub!**

[⬆ back to top](#-tenderflow---enterprise-tender-management-system)

</div>
