import express from 'express';
import { getAnnouncements, createAnnouncement } from '../controllers/announcementController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';
import { updateAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.put('/:id', protect, adminOnly, updateAnnouncement); // ✅ ADD THIS ROUTE
router.get('/', protect, getAnnouncements);
router.post('/', protect, adminOnly , createAnnouncement);

export default router;
