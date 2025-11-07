// models/TestResult.js
import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test', // ✅ Add this so .populate('test') works
      required: true,
    },
    weekNumber: Number,
    answer: String,
    isCorrect: Boolean,
    score: Number,
  },
  { timestamps: true }
);

const TestResult = mongoose.model('TestResult', testResultSchema);
export default TestResult;
