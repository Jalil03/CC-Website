import express from 'express';
import {
  signup,
  login,
  getAllStudents,
  getStudentDetails,
  promoteToAdmin,
  getStudentProfile,
  resetStudentPassword,
  updateStudentProfile, // ✅ add this import
} from '../controllers/studentController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.patch('/reset-password', resetStudentPassword);

// Authenticated routes
router.get('/me', protect, getStudentProfile);
router.patch('/update-profile', protect, updateStudentProfile); // ✅ new route

// Admin-only routes
router.get('/', protect, adminOnly, getAllStudents);
router.get('/:id', protect, adminOnly, getStudentDetails);
router.patch('/:id/promote', protect, adminOnly, promoteToAdmin);

export default router;
