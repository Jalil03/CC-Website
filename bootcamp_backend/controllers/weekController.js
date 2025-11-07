import Week from '../models/Week.js';

// GET /api/weeks
export const getWeeks = async (req, res) => {
  try {
    const today = new Date();
    const weeks = await Week.find({
      $or: [
        { releaseDate: { $lte: today } },
        { releaseDate: { $exists: false } } // include weeks without releaseDate
      ]
    }).sort({ weekNumber: 1 });

    res.json(weeks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weeks' });
  }
};


export const getAllWeeks = async (req, res) => {
  try {
    const weeks = await Week.find().sort({ weekNumber: 1 });
    res.json(weeks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all weeks' });
  }
};

// POST /api/weeks
export const createWeek = async (req, res) => {
  try {
    const { weekNumber, title, content, releaseDate, pdfUrl } = req.body;
    const week = new Week({ weekNumber, title, content, releaseDate, pdfUrl });
    await week.save();
    res.status(201).json(week);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create week' });
  }
};

export const updateWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWeek = await Week.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedWeek);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update week' });
  }
};


