import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  weekNumber: { type: Number, required: true },
  githubRepo: String,
  feedback: String,
  grade: String,
  createdAt: { type: Date, default: Date.now } , 
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  feedback: {
    type: String,
  }
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
