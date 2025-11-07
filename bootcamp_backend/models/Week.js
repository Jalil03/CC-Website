import mongoose from 'mongoose';

const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true, unique: true },
  title: String,
  content: {
    objectives: [String],
    lessons: [String],
    miniProject: String,
    exercises: [String]
  },
  githubTemplate: String,
  pdfUrl: String, // ✅ Add this line
  createdAt: { type: Date, default: Date.now },
  releaseDate: { type: Date },
});


const Week = mongoose.model('Week', weekSchema);
export default Week;
