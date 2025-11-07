import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // switched from 'bcrypt' to 'bcryptjs'

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  github: { type: String },
  avatar: { type: String, default: '' }, // ✅ new field
  password: { type: String, required: true },
  progress: { type: [Number], default: [] },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }],
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

// Hash password before saving
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
