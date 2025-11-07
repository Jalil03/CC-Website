import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['short_answer', 'multiple_choice', 'code_html', 'code_js', 'code_css'],
    default: 'short_answer',
    required: true,
  },
  choices: {
    type: [String], // Only used for multiple choice
    default: [],
  },
  correctAnswer: {
    type: String, // Can be text, correct option, or reference solution
    required: true,
  },
}, {
  timestamps: true,
});

const Test = mongoose.model('Test', testSchema);

export default Test;
