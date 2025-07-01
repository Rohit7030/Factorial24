# ✅ TaskFlow - Full Stack Todo App

**TaskFlow** is a full-stack TODO application built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend. It supports user authentication, secure token-based sessions, and CRUD operations on tasks.

---
## 🚀 Features

- User authentication with JWT
- Add / Edit / Delete TODO items
- Persistent storage with MongoDB
- React Vite frontend
- RESTful API backend

---

## 🧩 Tech Stack

- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB Atlas (or local)
- **Others**: dotenv, bcrypt, cookie-parser

---

## 📁 Project Structure

TaskFlow/
<br/>
├
── backend/ # Express + MongoDB + JWT API
<br/>
└── frontend/ # React (Vite) based UI

## ⚙️ Getting Started

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/Rohit7030/Factorial24.git
cd Factorial24
```

📦 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will run at: http://localhost:5173/

🛠️ Backend Setup
```bash
cd ../backend
npm install
```
🔐 Create .env in the backend folder with the following content:
```bash
PORT= 4001
MONGODB_URI= your_mongodb_connection_string
JWT_SECRET_KEY= your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```
⚠️ Replace all values with your actual environment-specific details.

▶️ Run the Backend Server
```bash
node index.js
```






