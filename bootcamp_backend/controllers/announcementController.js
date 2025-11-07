import Announcement from '../models/Announcement.js';

// GET /api/announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};


// PUT /api/announcements/:id
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, message },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
};


// POST /api/announcements
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};
