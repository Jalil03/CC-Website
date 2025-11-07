import express from 'express';
import { getWeeks, createWeek , getAllWeeks ,updateWeek } from '../controllers/weekController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminOnly.js';



const router = express.Router();

router.get('/all', protect, adminOnly, getAllWeeks);
router.put('/weeks/:id', updateWeek);
router.get('/', protect, getWeeks);
router.post('/', protect, adminOnly, createWeek);

export default router;
