Perfect. I’ll give you a **complete README you can copy-paste directly into `README.md` and push to GitHub**. This one is **portfolio-ready**, similar to the style you used for DevFlow but slightly cleaner.

Create this file in the **root of your repo**:

```
CodeLog/README.md
```

Then paste everything below.

---

# README.md

```markdown
<!-- PROJECT HEADER -->

<br/>

<h3 align="center">CodeLog</h3>

<p align="center">
  A full-stack journaling and productivity web application where users can securely log daily entries and manage them through a clean and responsive interface.
</p>

<p align="center">
  Track your thoughts. Organize your day. Stay consistent.
</p>

<p align="center">
  <a href="https://code-log-theta.vercel.app">Live Demo</a>
  ·
  <a href="https://github.com/khushi1067/CodeLog">View Code</a>
</p>

<p align="center">
  <b>Frontend deployed on Vercel and backend deployed on Render.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-blue" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-black" />
  <img src="https://img.shields.io/badge/Render-API-purple" />
</p>

---

# Overview

CodeLog is a full-stack journaling application that allows users to create an account, log in securely, and manage daily entries.

The application uses a modern full-stack architecture with a React frontend, a Node.js/Express backend, and MongoDB for persistent data storage.

The project is fully deployed and accessible online.

---

# Live Application

Frontend  
https://code-log-theta.vercel.app

Backend API  
https://codelog-api.onrender.com

---

# Features

- User authentication (register, login, logout)
- Protected routes
- Create new journal entries
- View stored entries
- Delete entries
- Persistent storage with MongoDB
- Full-stack deployment

---

# Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

```

CodeLog
│
├── client
│   ├── src
│   │   ├── Pages
│   │   ├── auth
│   │   ├── lib
│   │   └── assets
│   │
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
└── server
├── src
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   └── utils
│
└── package.json

```

---

# Environment Variables

Backend requires the following environment variables:

```

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=[https://code-log-theta.vercel.app](https://code-log-theta.vercel.app)

```

Frontend requires:

```

VITE_API_BASE=[https://codelog-api.onrender.com](https://codelog-api.onrender.com)

```

---

# Running Locally

Clone the repository

```

git clone [https://github.com/khushi1067/CodeLog.git](https://github.com/khushi1067/CodeLog.git)

```

Navigate into the project

```

cd CodeLog

```

Install backend dependencies

```

cd server
npm install

```

Start backend server

```

node src/index.js

```

Install frontend dependencies

```

cd ../client
npm install

```

Start frontend

```

npm run dev

```

---

# Deployment

Frontend deployed on **Vercel**.

Backend deployed on **Render**.

Database hosted on **MongoDB Atlas**.

---

# Author

Khushi Bhandari
```

---

