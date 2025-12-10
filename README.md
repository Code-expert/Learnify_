
***

# 📘 Learnify - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Installation Guide](#installation-guide)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Frontend Structure](#frontend-structure)
9. [Backend Structure](#backend-structure)
10. [Deployment Guide](#deployment-guide)
11. [Security](#security)
12. [Future Enhancements](#future-enhancements)

***

## 1. Project Overview

**Learnify** is a modern, full-stack Learning Management System (LMS) designed to provide an intuitive platform for creating, managing, and delivering educational content. Built with the MERN stack, it offers a seamless experience for both administrators and learners.

### Project Details
- **Name:** Learnify
- **Tagline:** Learn. Build. Grow.
- **Version:** 1.0.0
- **Type:** Learning Management System (LMS)
- **License:** MIT
- **Author:** [Your Name]
- **Repository:** [GitHub URL]

### Key Objectives
- Provide an easy-to-use platform for course management
- Enable structured learning through topics and lessons
- Offer a clean, modern UI with excellent UX
- Support scalable content delivery
- Ensure secure admin access and content management

***

## 2. Features

### 2.1 Core Features

#### **Admin Features**
- ✅ Secure authentication with JWT
- ✅ Dashboard with real-time statistics
- ✅ Topic Management (Create, Read, Update, Delete)
- ✅ Lesson Management (CRUD operations)
- ✅ Rich text editor for lesson content
- ✅ Publish/Unpublish content control
- ✅ Difficulty level assignment (Beginner, Intermediate, Advanced)
- ✅ Content ordering and organization
- ✅ Search and filter capabilities

#### **User Features**
- ✅ Browse all available topics
- ✅ View lessons by topic
- ✅ Read lesson content with syntax highlighting
- ✅ Search across topics and lessons
- ✅ Filter by difficulty level
- ✅ Responsive design for all devices
- ✅ Clean, modern UI with smooth animations

### 2.2 Technical Features
- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ MongoDB database with Mongoose ODM
- ✅ Protected admin routes
- ✅ CORS configuration for security
- ✅ Error handling and validation
- ✅ Environment-based configuration
- ✅ Modular code structure

***

## 3. Technology Stack

### 3.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **Vite** | 5.4.10 | Build Tool & Dev Server |
| **React Router DOM** | 6.x | Client-side Routing |
| **Redux Toolkit** | 2.x | State Management |
| **Axios** | 1.x | HTTP Client |
| **TailwindCSS** | 3.4.14 | Styling Framework |
| **React Icons** | 5.x | Icon Library |

### 3.2 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime Environment |
| **Express.js** | 4.x | Web Framework |
| **MongoDB** | 6.x | Database |
| **Mongoose** | 8.x | ODM for MongoDB |
| **JWT** | 9.x | Authentication |
| **bcryptjs** | 2.x | Password Hashing |
| **dotenv** | 16.x | Environment Variables |
| **cors** | 2.x | Cross-Origin Resource Sharing |

### 3.3 Development Tools

| Tool | Purpose |
|------|---------|
| **VS Code** | Code Editor |
| **Postman** | API Testing |
| **MongoDB Compass** | Database GUI |
| **Git** | Version Control |
| **ESLint** | Code Linting |
| **Prettier** | Code Formatting |

***

## 4. System Architecture

### 4.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │         React Frontend (Vite)                    │   │
│  │  - Components                                    │   │
│  │  - Pages                                         │   │
│  │  - Redux State Management                        │   │
│  │  - TailwindCSS Styling                          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                         ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                   API LAYER                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Express.js REST API                      │   │
│  │  - Routes                                        │   │
│  │  - Controllers                                   │   │
│  │  - Middleware (Auth, CORS, Error)               │   │
│  │  - JWT Authentication                            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                         ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────┐
│                  DATABASE LAYER                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │         MongoDB Database                         │   │
│  │  - Users Collection                              │   │
│  │  - Topics Collection                             │   │
│  │  - Lessons Collection                            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Request Flow

```
User Request
     ↓
Frontend (React)
     ↓
Redux Action
     ↓
API Client (Axios)
     ↓
Backend Route
     ↓
Middleware (Auth Check)
     ↓
Controller
     ↓
Database (MongoDB)
     ↓
Response JSON
     ↓
Frontend Update
     ↓
UI Render
```

***

## 5. Installation Guide

### 5.1 Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** v6.0 or higher (Local or Atlas)
- **Git:** Latest version

### 5.2 Local Development Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/learnify.git
cd learnify
```

#### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `backend/.env`:**

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/learnify
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
FRONTEND_URL=http://localhost:5173
```

**Start the backend server:**

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

#### Step 3: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `frontend/.env`:**

```env
VITE_API_URL=http://localhost:5000/api
```

**Start the frontend:**

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

#### Step 4: Create Admin User

Run this in MongoDB Compass or mongosh:

```javascript
use learnify

db.users.insertOne({
  name: "Admin",
  email: "admin@learnify.com",
  password: "$2a$10$XYZ...", // Use bcrypt to hash "admin123"
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use this Node.js script (`backend/scripts/createAdmin.js`):

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      name: 'Admin',
      email: 'admin@learnify.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();
```

Run: `node backend/scripts/createAdmin.js`

***

## 6. API Documentation

### 6.1 Authentication Endpoints

#### **POST** `/api/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "admin@learnify.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@learnify.com",
    "role": "admin"
  }
}
```

#### **POST** `/api/auth/register`

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

***

### 6.2 Topics Endpoints

#### **GET** `/api/topics`

Get all published topics.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "JavaScript Tutorial",
      "slug": "javascript-tutorial",
      "description": "Learn JavaScript from basics to advanced",
      "icon": "🚀",
      "order": 1,
      "isPublished": true,
      "createdAt": "2025-12-10T15:30:00.000Z"
    }
  ]
}
```

#### **GET** `/api/topics/:slug`

Get single topic by slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "JavaScript Tutorial",
    "slug": "javascript-tutorial",
    "description": "Learn JavaScript",
    "icon": "🚀",
    "order": 1,
    "isPublished": true
  }
}
```

***

### 6.3 Lessons Endpoints

#### **GET** `/api/lessons`

Get all published lessons.

**Query Parameters:**
- `topic` - Filter by topic ID
- `level` - Filter by difficulty (beginner/intermediate/advanced)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Introduction to JavaScript",
      "slug": "introduction-to-javascript",
      "description": "Learn JavaScript basics",
      "content": "<h2>What is JavaScript?</h2>...",
      "sampleCode": "console.log('Hello World');",
      "topicId": "507f1f77bcf86cd799439011",
      "topic": {
        "title": "JavaScript Tutorial",
        "icon": "🚀"
      },
      "level": "beginner",
      "duration": 20,
      "order": 1,
      "isPublished": true
    }
  ]
}
```

#### **GET** `/api/lessons/:slug`

Get single lesson by slug.

***

### 6.4 Admin Endpoints

All admin endpoints require authentication header:
```
Authorization: Bearer <token>
```

#### **GET** `/api/admin/stats`

Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTopics": 10,
    "publishedTopics": 8,
    "totalLessons": 50,
    "publishedLessons": 45,
    "lessonsByLevel": {
      "beginner": 20,
      "intermediate": 18,
      "advanced": 12
    }
  }
}
```

#### **POST** `/api/admin/topics`

Create new topic.

**Request Body:**
```json
{
  "title": "Node.js Tutorial",
  "slug": "nodejs-tutorial",
  "description": "Learn Node.js",
  "icon": "⚡",
  "order": 5,
  "isPublished": true
}
```

#### **PUT** `/api/admin/topics/:id`

Update topic.

#### **DELETE** `/api/admin/topics/:id`

Delete topic.

#### **POST** `/api/admin/lessons`

Create new lesson.

**Request Body:**
```json
{
  "title": "Introduction to Node.js",
  "slug": "introduction-to-nodejs",
  "description": "Learn Node.js basics",
  "content": "<h2>What is Node.js?</h2>...",
  "sampleCode": "const express = require('express');",
  "topicId": "507f1f77bcf86cd799439011",
  "level": "beginner",
  "duration": 25,
  "order": 1,
  "isPublished": true
}
```

#### **PUT** `/api/admin/lessons/:id`

Update lesson.

#### **DELETE** `/api/admin/lessons/:id`

Delete lesson.

***

### 6.5 Search Endpoint

#### **GET** `/api/search?q=javascript&level=beginner`

Search lessons and topics.

**Query Parameters:**
- `q` - Search query (required)
- `topic` - Filter by topic ID (optional)
- `level` - Filter by difficulty (optional)

***

## 7. Database Schema

### 7.1 User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

***

### 7.2 Topic Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (required, unique),
  description: String,
  icon: String (default: '📚'),
  order: Number (default: 0),
  isPublished: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `slug` (unique)
- `order`
- `isPublished`

***

### 7.3 Lesson Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (required, unique),
  description: String,
  content: String (required),
  sampleCode: String,
  topicId: ObjectId (ref: 'Topic', required),
  level: String (enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner'),
  duration: Number (default: 15),
  order: Number (default: 0),
  isPublished: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `slug` (unique)
- `topicId`
- `level`
- `isPublished`
- `order`

**Virtual Fields:**
- `topic` - Populated from Topics collection

***

## 8. Frontend Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loader.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       └── AdminSidebar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Topics.jsx
│   │   ├── LessonDetail.jsx
│   │   ├── SearchPage.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageTopics.jsx
│   │       └── ManageLessons.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── topicsSlice.js
│   │       └── lessonsSlice.js
│   ├── utils/
│   │   ├── apiClient.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

***

## 9. Backend Structure

```
backend/
├── config/
│   └── db.js                # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── topicController.js
│   ├── lessonController.js
│   ├── searchController.js
│   └── adminController.js
├── middleware/
│   ├── authMiddleware.js    # protect, admin
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Topic.js
│   └── Lesson.js
├── routes/
│   ├── auth.js
│   ├── topics.js
│   ├── lessons.js
│   ├── search.js
│   ├── adminRoutes.js
│   └── admin/
│       ├── topics.js
│       ├── lessons.js
│       └── stats.js
├── scripts/
│   └── createAdmin.js       # Admin user creation
├── .env
├── .gitignore
├── package.json
└── server.js
```

***

## 10. Deployment Guide

### 10.1 Prerequisites

- GitHub account
- Vercel account (Frontend)
- Render account (Backend)
- MongoDB Atlas account (Database)

***

### 10.2 Database Deployment (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to users
   - Name cluster: `learnify-cluster`

3. **Create Database User**
   - Database Access → Add New User
   - Username: `learnify-admin`
   - Password: Generate secure password
   - Role: Atlas Admin

4. **Whitelist IP Addresses**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
   - (For production, use specific IPs)

5. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://learnify-admin:<password>@learnify-cluster.xxxxx.mongodb.net/learnify?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

***

### 10.3 Backend Deployment (Render)

1. **Push Code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/learnify.git
git push -u origin main
```

2. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

3. **Create Web Service**
   - Dashboard → New → Web Service
   - Connect GitHub repository
   - Configure:
     - **Name:** `learnify-backend`
     - **Region:** Choose closest
     - **Branch:** `main`
     - **Root Directory:** `backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

4. **Add Environment Variables**

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://learnify-admin:password@cluster.mongodb.net/learnify
JWT_SECRET=your_super_secret_production_jwt_key_min_32_chars
FRONTEND_URL=https://learnify-olive.vercel.app
```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy backend URL: `https://learnify-backend.onrender.com`

***

### 10.4 Frontend Deployment (Vercel)

1. **Prepare Production Environment**

Create `frontend/.env.production`:

```env
VITE_API_URL=https://learnify-backend.onrender.com/api
```

2. **Install Vercel CLI**

```bash
npm install -g vercel
```

3. **Deploy from Terminal**

```bash
cd frontend
vercel login
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **learnify**
- In which directory? **./  **
- Override settings? **N**

4. **Deploy to Production**

```bash
vercel --prod
```

5. **Get Production URL**
   - Vercel will provide URL: `https://learnify-olive.vercel.app`

***

### 10.5 Update CORS in Backend

After getting Vercel URL, update Render environment variables:

```
FRONTEND_URL=https://learnify-olive.vercel.app
```

Render will auto-redeploy.

***

### 10.6 Custom Domain (Optional)

#### On Vercel:
1. Settings → Domains
2. Add custom domain
3. Update DNS records with your domain provider

#### On Render:
1. Settings → Custom Domain
2. Add domain
3. Update DNS

***

## 11. Security

### 11.1 Authentication Security

- **Password Hashing:** bcryptjs with salt rounds of 10
- **JWT Tokens:** 256-bit secret key, 30-day expiration
- **HTTP-Only Cookies:** Token storage (optional)
- **Protected Routes:** Middleware validation on all admin routes

### 11.2 API Security

- **CORS:** Whitelist specific origins only
- **Rate Limiting:** Prevent brute force attacks (implement if needed)
- **Input Validation:** Validate all user inputs
- **SQL Injection Prevention:** Mongoose ODM handles this
- **XSS Protection:** Sanitize HTML content

### 11.3 Environment Variables

Never commit `.env` files. Use environment variables for:
- Database credentials
- JWT secrets
- API keys
- Production URLs

### 11.4 Best Practices

- ✅ Use HTTPS in production
- ✅ Regular dependency updates
- ✅ Error handling without exposing stack traces
- ✅ Proper logging
- ✅ Database backups
- ✅ Monitor for suspicious activity

***

## 12. Future Enhancements

### Phase 2 Features

1. **User Features**
   - User registration and profiles
   - Progress tracking
   - Bookmarks and favorites
   - Lesson completion tracking
   - Certificates on completion
   - User dashboard

2. **Content Features**
   - Video lessons
   - Quizzes and assessments
   - Code playground integration
   - Downloadable resources
   - Comments and discussions
   - Lesson notes

3. **Admin Features**
   - Analytics dashboard
   - User management
   - Content scheduling
   - Bulk operations
   - Content versioning
   - Email notifications

4. **Technical Improvements**
   - Progressive Web App (PWA)
   - Offline support
   - Real-time updates with WebSockets
   - CDN integration
   - Image optimization
   - SEO optimization
   - Multi-language support

***

## 13. Testing

### 13.1 Manual Testing Checklist

**Authentication:**
- [ ] Admin can login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect if not authenticated

**Topics:**
- [ ] Can view all topics
- [ ] Can create new topic
- [ ] Can edit topic
- [ ] Can delete topic
- [ ] Can publish/unpublish topic

**Lessons:**
- [ ] Can view all lessons
- [ ] Can create new lesson
- [ ] Can edit lesson
- [ ] Can delete lesson
- [ ] Sample code displays correctly
- [ ] HTML content renders properly

**Search:**
- [ ] Search returns relevant results
- [ ] Filters work correctly
- [ ] Empty search shows message

**Dashboard:**
- [ ] Stats display correctly
- [ ] Numbers update after changes
- [ ] Quick actions work
- [ ] Charts display properly

### 13.2 Unit Testing (Future)

```bash
# Frontend
npm run test

# Backend
npm run test
```

***

## 14. Troubleshooting

### Common Issues

#### Issue 1: MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solution:**
1. Check MongoDB is running: `mongod --version`
2. Verify connection string in `.env`
3. Check network access in MongoDB Atlas
4. Ensure IP is whitelisted

#### Issue 2: CORS Error

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Check CORS configuration in `server.js`
2. Verify frontend URL in `allowedOrigins`
3. Ensure credentials are enabled
4. Clear browser cache

#### Issue 3: JWT Token Invalid

**Error:** `jwt malformed` or `invalid signature`

**Solution:**
1. Check JWT_SECRET matches in backend
2. Ensure token is being sent in headers
3. Verify token hasn't expired
4. Clear localStorage and login again

#### Issue 4: Build Fails

**Error:** `Module not found` or build errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

***

## 15. API Response Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | No token or invalid token |
| 403 | Forbidden | Not admin |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Server-side error |

***

## 16. Environment Variables Reference

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/learnify

# Security
JWT_SECRET=your_secret_key_minimum_32_characters_long

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
# API
VITE_API_URL=http://localhost:5000/api
```

***

## 17. Scripts Reference

### Backend Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "create-admin": "node scripts/createAdmin.js"
  }
}
```

### Frontend Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

***

## 18. Git Workflow

### Branches

- `main` - Production code
- `develop` - Development code
- `feature/*` - New features
- `bugfix/*` - Bug fixes

### Commit Message Convention

```
feat: Add new lesson creation feature
fix: Resolve CORS issue in production
docs: Update README with deployment guide
style: Format code with Prettier
refactor: Optimize database queries
test: Add unit tests for auth controller
```

***

## 19. Performance Optimization

### Frontend

- ✅ Code splitting with React.lazy()
- ✅ Image optimization
- ✅ Minification in production
- ✅ Caching strategies
- ✅ Lazy loading for images

### Backend

- ✅ Database indexing
- ✅ Query optimization
- ✅ Response compression
- ✅ Caching with Redis (future)
- ✅ CDN for static assets (future)

***

## 20. License

MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

***

## 21. Contact & Support

- **Author:** [Your Name]
- **Email:** [your.email@example.com]
- **GitHub:** [https://github.com/yourusername](https://github.com/yourusername)
- **Website:** [https://yourwebsite.com](https://yourwebsite.com)

***

## 22. Changelog

### Version 1.0.0 (December 2025)

**Added:**
- Initial release
- Admin authentication
- Topic and lesson management
- Dashboard with statistics
- Search functionality
- Responsive design

***

## 23. Credits

**Built with:**
- React
- Node.js
- Express
- MongoDB
- TailwindCSS

**Inspired by:**
- Modern LMS platforms
- Clean UI design principles
- Developer-friendly documentation

***

## 24. Quick Reference

### Login Credentials (Default)

```
Email: admin@learnify.com
Password: admin123
```

### Important URLs

```
Frontend: http://localhost:5173
Backend: http://localhost:5000
API Docs: http://localhost:5000/api
Health Check: http://localhost:5000/api/health
```

### Database Connection

```javascript
mongodb://localhost:27017/learnify
// or
mongodb+srv://user:pass@cluster.mongodb.net/learnify
```

***

**This documentation is comprehensive and ready for your project README.md!** 📚✨

Would you like me to create any specific section in more detail or add anything else? 🚀
