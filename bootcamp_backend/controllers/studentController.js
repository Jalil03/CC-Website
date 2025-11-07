import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Announcement from '../models/Announcement.js';
import Week from '../models/Week.js';
import Submission from '../models/Submission.js';
import TestResult from '../models/TestResult.js';

const JWT_SECRET = process.env.JWT_SECRET || 'jl_secret';

// ===============================
// 🔹 AUTH & BASIC USER MANAGEMENT
// ===============================

export const signup = async (req, res) => {
  try {
    const { name, email, github, password, isAdmin } = req.body;
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const student = new Student({ name, email, github, password, isAdmin });
    await student.save();

    res.status(201).json({ msg: 'Signup successful!', _id: student._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: student._id, isAdmin: student.isAdmin },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        isAdmin: student.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// ======================================
// 🔹 ADMIN-ONLY: VIEW / MANAGE STUDENTS
// ======================================

// GET /api/students (admin only)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ isAdmin: false }).select('-password');
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// GET /api/students/:id (admin only)
export const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const submissions = await Submission.find({ studentId: student._id });
    const results = await TestResult.find({ studentId: student._id });

    res.json({
      student,
      submissions,
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch student details' });
  }
};

// PATCH /api/students/:id/promote
export const promoteToAdmin = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    student.isAdmin = true;
    await student.save();

    res.json({ msg: `${student.name} is now an admin.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to promote student' });
  }
};

// GET /api/students/me
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id)
      .select('-password')
      .populate('submissions');

    const announcements = await Announcement.find().sort({ date: -1 });
    const weeks = await Week.find().sort({ weekNumber: 1 });

    res.json({
      profile: student,
      announcements,
      availableWeeks: weeks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
};

// PATCH /api/students/reset-password
export const resetStudentPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ msg: 'Email and new password are required' });

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    student.password = hashed;
    await student.save();

    res.json({ msg: '✅ Password updated successfully' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: 'Server error during password reset' });
  }
};


// PATCH /api/students/update-profile
export const updateStudentProfile = async (req, res) => {
  try {
    console.log('REQ.USER:', req.user); // ✅ useful debug log

    const { name, avatar } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized - user not found in token' });
    }

    const student = await Student.findById(req.user._id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    if (name) student.name = name;
    if (avatar) student.avatar = avatar; // ✅ base64 string or external URL

    await student.save();

    res.json({
      msg: 'Profile updated successfully',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        isAdmin: student.isAdmin,
        avatar: student.avatar,
      },
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
};

