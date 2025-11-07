// routes/admin.js
import express from 'express';
import { adminOverview , getAllStudentGrades , getAdminOverview } from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';



// Admin-only dashboard overview
const router = express.Router();

router.get('/overview', protect, adminOnly, adminOverview);
router.get('/grades', protect, adminOnly, getAllStudentGrades);

export default router;