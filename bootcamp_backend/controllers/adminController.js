// controllers/adminController.js
import Student from '../models/Student.js';
import Submission from '../models/Submission.js';
import Week from '../models/Week.js';
import Announcement from '../models/Announcement.js';



export const adminOverview = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({ isAdmin: false });
    const totalAdmins = await Student.countDocuments({ isAdmin: true });
    const totalWeeks = await Week.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();
    const totalSubmissions = await Submission.countDocuments();

    res.json({
      totalStudents,
      totalAdmins,
      totalWeeks,
      totalAnnouncements,
      totalSubmissions,
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ error: 'Failed to fetch admin overview data' });
  }
};

export const getAllStudentGrades = async (req, res) => {
  try {
    const students = await Student.find().select('name email');
    const results = await TestResult.find().populate('student', 'name email');

    const grades = students.map(s => {
      const studentResults = results.filter(r => r.student._id.equals(s._id));
      return {
        name: s.name,
        email: s.email,
        grades: studentResults.map(r => ({
          week: r.weekNumber,
          score: r.score,
          passed: r.passed
        }))
      };
    });

    res.json(grades);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch grades' });
  }
};

export const getAdminOverview = async (req, res) => {
    try {
      return res.json({ msg: 'Admin route works!' });
    } catch (err) {
      console.error('❌ Admin overview error:', err);
      res.status(500).json({ error: 'Failed to fetch admin overview' });
    }
  };
  