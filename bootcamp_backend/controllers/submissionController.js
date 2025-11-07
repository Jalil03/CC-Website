import Submission from '../models/Submission.js';

// POST /api/submissions
import Week from '../models/Week.js';

export const submitProject = async (req, res) => {
  try {
    const { githubRepo, weekNumber } = req.body;

    if (!weekNumber || !githubRepo) {
      return res.status(400).json({ error: 'Missing weekNumber or githubRepo' });
    }

    const submission = new Submission({
      githubRepo,
      weekNumber,
      studentId: req.user._id,
    });

    await submission.save();

    // Optional: Add to student's record
    req.user.submissions.push(submission._id);
    await req.user.save();

    res.status(201).json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit project' });
  }
};

// GET /api/submissions/me
export const getSubmissionsByStudent = async (req, res) => {
  try {
    const studentId = req.user.id; // assuming req.user is set via auth middleware
    const submissions = await Submission.find({ studentId }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching student submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/submissions/:id/review
export const reviewSubmission = async (req, res) => {
  const { id } = req.params;
  const { status, feedback } = req.body;

  try {
    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.status = status;
    submission.feedback = feedback;
    await submission.save();
    

    res.status(200).json(submission);
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ message: 'Server error during review' });
  }
};


// GET /api/submissions/all
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('studentId', 'name email').sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};
