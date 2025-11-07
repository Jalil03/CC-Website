# 🚀 Code Crafters Bootcamp Platform

This repository contains the **first development phase** of the **Code Crafters Bootcamp Platform**, a full-stack web application built using **React**, **Node.js**, and **MongoDB**.

> ⚠️ This version focuses mainly on delivering a **solid backend** and a **stable frontend foundation**.  
> Future collaborators will continue improving the UI/UX, adding more features, and refining the user experience.

---

## 🧩 Project Overview

The **Code Crafters Bootcamp Platform** is designed to manage an online coding bootcamp efficiently.  
It includes:
- 👨‍🎓 **Student management system**
- 🧑‍🏫 **Admin dashboard** for managing weeks, tests, and announcements
- 📚 **Weekly content and submissions**
- 🧠 **Authentication system** (JWT-based)
- 💬 **Contact and feedback system**

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React (Vite)**
- **Tailwind CSS**
- **Chakra UI**
- **React Router**
- **Axios**

### 🔹 Backend
- **Node.js / Express.js**
- **MongoDB (via Mongoose)**
- **bcryptjs** for password encryption
- **jsonwebtoken (JWT)** for authentication
- **dotenv** for environment configuration
- **CORS** for cross-origin access
- **Nodemailer** for contact forms and admin notifications

---

## ⚙️ Environment Variables

The project uses environment variables stored in a `.env` file (not included in the repo for security reasons).

You can use the provided **`.env.example`** file as a reference:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_EMAIL_PASSWORD=your_app_password
```

> 💡 Rename `.env.example` to `.env` and replace the values with your actual credentials. and please contact me to help you with it 

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Jalil03/CC-Website.git
cd CC-Website
```

### 2️⃣ Install dependencies
```bash
# Backend
cd bootcamp_backend
npm install

# Frontend
cd ../bootcamp_frontend
npm install
```

### 3️⃣ Run the development servers
```bash
# Start backend
npm run dev

# Start frontend (in another terminal)
npm run dev
```

Backend default port → `http://localhost:5000`  
Frontend default port → `http://localhost:5173`

---

## 🧠 Project Structure

```
CC-Website/
│
├── bootcamp_backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── bootcamp_frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## 🤝 Contribution Guidelines

This project is open for collaboration!  
Developers can:
- Enhance the **frontend** with new UI/UX improvements.
- Add **new features** (e.g., quizzes, notifications, analytics).
- Improve **security**, **performance**, and **scalability**.

Please follow these steps:
1. Fork the repo.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature name"`
4. Push the branch and open a Pull Request.

---

## 📩 Contact

**Main Developer:** Abdeljalil (JL)  
📧 [abdobouzine2003@gmail.com](mailto:abdobouzine2003@gmail.com)  
🌍 [GitHub Profile](https://github.com/Jalil03)

---

### ⭐ Acknowledgements
Thanks to all contributors who will continue improving this platform!  
Together, we aim to make Code Crafters a powerful and inspiring bootcamp management system.
