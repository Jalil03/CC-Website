import Test from '../models/Test.js';
import TestResult from '../models/TestResult.js';

export const submitTest2 = async (req, res) => {
  try {
    const { answer, weekNumber } = req.body;
    const { testId } = req.params;

    if (!answer) {
      return res.status(400).json({ msg: 'Answer is required' });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    const isCorrect = test.correctAnswer.trim().toLowerCase() === answer.trim().toLowerCase();

    const result = new TestResult({
      student: req.user._id,
      weekNumber: test.weekNumber, // ✅ safer to get from DB
      test: test._id,
      answer,
      isCorrect,
      score: isCorrect ? 1 : 0,
    });

    await result.save();

    res.json({ msg: isCorrect ? '✅ Correct!' : '❌ Incorrect!', isCorrect });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Something went wrong during submission' });
  }
};
