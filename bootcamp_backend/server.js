import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// 🧩 Local imports
import connectDB from './config/db.js';
import protect from './middleware/authMiddleware.js';

// 🔀 Routes
import testRoutes from './routes/testRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import weekRoutes from './routes/weeks.js';
import submissionRoutes from './routes/submissions.js';
import announcementRoutes from './routes/announcements.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';

// (Optional) Controller for debugging if needed
import { updateAnnouncement } from './controllers/announcementController.js';

dotenv.config();
connectDB();

const app = express();

// =====================================================
// 🌐 Middleware Configuration
// =====================================================
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://bootcampcc-production.up.railway.app',
    ],
    credentials: true,
  })
);

// ✅ Increase body size limits (fix PayloadTooLargeError for base64 images)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =====================================================
// 📦 API Routes
// =====================================================
app.use('/api/students', studentRoutes);
app.use('/api/weeks', weekRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/contact', contactRoutes);

// =====================================================
// 🔐 Protected Route Example
// =====================================================
app.get('/api/protected', protect, (req, res) => {
  res.send(`🔒 Hello, you are authenticated! Your ID: ${req.user.id}`);
});

// =====================================================
// 🏠 Root Endpoint
// =====================================================
app.get('/', (req, res) => {
  res.send('👋 Welcome to CodeCrafters Bootcamp API');
});

// =====================================================
// ⚠️ Global Error Handling (optional but recommended)
// =====================================================
app.use((err, req, res, next) => {
  console.error('🔥 Global error:', err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// =====================================================
// 🚀 Start the Server
// =====================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
