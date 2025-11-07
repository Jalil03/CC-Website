// routes/testRoutes.js
import express from 'express';
import { submitTest } from '../controllers/testController.js';
import protect from '../middleware/authMiddleware.js';
import { createTest } from '../controllers/testController.js';
import { getTestByWeek , getAllTests } from '../controllers/testController.js';
import { submitTest2 } from '../controllers/submitTest .js';
import TestResult from '../models/TestResult.js';
import Test from '../models/Test.js';

const router = express.Router();

router.post('/submit', protect, submitTest);
import adminOnly from '../middleware/adminOnly.js';

router.post('/', protect, adminOnly, createTest);
router.get('/:weekNumber', protect, getTestByWeek);
router.post('/:testId/submit', protect, submitTest2);

// GET /api/tests/results/me
router.get('/results/me', protect, async (req, res) => {
    try { 
      const results = await TestResult.find({ student: req.user._id })
  .populate('test')
  .sort({ createdAt: -1 });

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch your test results' });
    }
  });

// DELETE /api/tests/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }
    res.json({ msg: 'Test deleted successfully' });
  } catch (err) {
    console.error('Error deleting test:', err);
    res.status(500).json({ msg: 'Failed to delete test' });
  }
});


// Get tests for students (no correct answer exposed)
router.get('/student/all', protect, async (req, res) => {
  try {
    const tests = await Test.find({}, 'weekNumber question').sort({ weekNumber: 1 });
    res.json(tests);
  } catch (err) {
    console.error('Error in /tests/student/all:', err.message);
    res.status(500).json({ error: 'Failed to fetch tests for students' });
  }
});

// GET /api/tests/grades/me
router.get('/grades/me', protect, async (req, res) => {
  try {
    const grades = await TestResult.find({ student: req.user._id }).sort({ weekNumber: 1 });
    res.json(grades);
  } catch (err) {
    console.error('Error fetching grades:', err);
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
});


router.get('/', protect, adminOnly, getAllTests); // ✅ Add this
  

export default router;
