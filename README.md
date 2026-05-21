TenderFlow Documentation

Overview

TenderFlow is a full-stack tender and quotation management platform designed to streamline the lifecycle of tender publishing, quotation submission, and procurement workflows.

The repository contains:

* A monolithic backend (backend-tenderflow)
* A microservices-based backend architecture (microservices)
* A React frontend application (tenderflow-pro)
* Docker-based containerization setup

The project demonstrates:

* Full-stack application development
* REST API architecture
* Authentication & authorization using JWT
* Role-based access control
* Redis integration
* MongoDB database integration
* Dockerized deployment
* Microservice decomposition

⸻

Repository Structure

.
├── backend-tenderflow/        # Monolithic backend API
├── microservices/
│   ├── auth-service/          # Authentication microservice
│   ├── tender-service/        # Tender management microservice
│   └── quotation-service/     # Quotation management microservice
├── tenderflow-pro/            # React frontend application
├── docker-compose.yml
└── README.md

⸻

System Architecture

High-Level Architecture

                +-------------------+
                |   React Frontend  |
                |   tenderflow-pro  |
                +---------+---------+
                          |
                    REST APIs
                          |
        +-----------------+-----------------+
        |                                   |
+-------v--------+               +----------v----------+
| Monolithic API |               |  Microservices API  |
| backend-       |               | auth/tender/quote   |
| tenderflow     |               +----------+----------+
+-------+--------+                          |
        |                                   |
        +-----------------+-----------------+
                          |
                +---------v---------+
                |     MongoDB       |
                +-------------------+
                +-------------------+
                |       Redis       |
                |    Caching Layer  |
                +-------------------+

⸻

Tech Stack

Frontend

* React 18
* React Router DOM
* TailwindCSS
* Radix UI
* React Query
* React Hook Form
* Zod Validation
* Recharts
* JWT Decode

Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Redis
* bcrypt
* Docker

DevOps / Infrastructure

* Docker
* Docker Compose
* Environment-based configuration

⸻

Frontend Documentation (tenderflow-pro)

Overview

The frontend is a React-based SPA (Single Page Application) responsible for:

* User authentication
* Tender creation
* Tender browsing
* Quotation submission
* Dashboard management
* Role-based UI rendering

⸻

Frontend Folder Structure

src/
├── components/
├── pages/
├── hooks/
├── lib/
├── services/
├── routes/
├── context/
└── main.jsx

⸻

Frontend Features

Authentication

* JWT-based authentication
* Token persistence
* Protected routes
* Role-based route handling

Tender Management

Organizations can:

* Create tenders
* Edit tenders
* View tender status
* Track quotations

Quotation Management

Traders can:

* Browse tenders
* Submit quotations
* Track submitted quotations

Dashboard

* Dynamic dashboard rendering
* Role-specific data visualization
* Analytics support

⸻

Backend Documentation (backend-tenderflow)

Overview

The monolithic backend handles:

* Authentication
* Tender management
* Quotation management
* Authorization
* Database communication
* Redis caching

⸻

Backend Folder Structure

backend-tenderflow/
├── config/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
└── package.json

⸻

API Modules

Authentication Module

Responsibilities

* User registration
* User login
* JWT generation
* Password hashing
* Token validation

Key Components

* auth.routes.js
* generateToken.js
* auth middleware

Security Features

* bcrypt password hashing
* JWT token authentication
* Protected endpoints

⸻

Tender Module

Responsibilities

* Create tenders
* Update tenders
* Retrieve tenders
* Tender filtering
* Tender tracking

Features

* Role-based access control
* Organization-only tender creation
* Redis caching support

Primary Roles

Role	Permissions
ORG	Create and manage tenders
TRADER	View tenders

⸻

Quotation Module

Responsibilities

* Submit quotations
* Retrieve quotations
* Associate quotations with tenders
* Quotation tracking

Features

* Trader-only quotation submission
* Tender-quotation linkage
* Authentication middleware

⸻

Microservices Architecture

Overview

The repository also includes a decomposed microservices architecture.

Each service is independently deployable and maintains isolated responsibilities.

⸻

Auth Service

Responsibilities

* User registration
* Login
* JWT generation
* Authentication middleware

Structure

auth-service/
├── config/
├── middlewares/
├── models/
├── routes/
├── utils/
└── server.js

⸻

Tender Service

Responsibilities

* Tender CRUD operations
* Tender retrieval
* Redis caching
* Organization authorization

Key Technologies

* Express
* MongoDB
* Redis
* JWT middleware

⸻

Quotation Service

Responsibilities

* Quotation creation
* Quotation retrieval
* Trader authorization

⸻

Authentication & Authorization

JWT Flow

User Login
    ↓
Server validates credentials
    ↓
JWT token generated
    ↓
Frontend stores token
    ↓
Protected APIs use Bearer token

⸻

Role-Based Access Control

The application uses middleware-driven RBAC.

Supported Roles

Role	Description
ORG	Organization users managing tenders
TRADER	Users submitting quotations

⸻

Database Design

MongoDB Collections

Users

Stores:

* User details
* Roles
* Authentication information

Tenders

Stores:

* Tender title
* Description
* Organization details
* Tender metadata

Quotations

Stores:

* Quotation details
* Linked tender ID
* Trader information
* Pricing data

⸻

Redis Integration

Purpose

Redis is used for:

* API caching
* Faster retrieval
* Reduced MongoDB load

Benefits

* Improved response time
* Better scalability
* Reduced database pressure

⸻

Docker Deployment

Dockerized Components

* Frontend
* Backend
* Microservices

⸻

Docker Compose

The root-level docker-compose.yml orchestrates:

* Frontend container
* Backend containers
* Database dependencies

⸻

Environment Variables

Backend

BE_PORT=backend port here
DB_URI=mongodb uri here
JWT_SECRET=jwt secret goes here

Frontend

VITE_API_URL=http://backend-url

⸻

Running the Project

Monolithic Backend

cd backend-tenderflow
npm install
npm run start

⸻

Frontend

cd tenderflow-pro
npm install
npm run dev

⸻

Microservices

Auth Service

cd microservices/auth-service
npm install
npm run start

Tender Service

cd microservices/tender-service
npm install
npm run start

Quotation Service

cd microservices/quotation-service
npm install
npm run start

⸻

Current Strengths

Engineering Strengths

* Full-stack architecture
* Monolith + microservices comparison
* JWT security implementation
* RBAC middleware
* Redis integration
* Dockerized setup
* Separation of concerns
* Scalable backend structure
