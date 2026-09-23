const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/notifications
router.get('/', auth, async (req, res) => {
  const notes = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
  res.json(notes);
});

// PUT /api/notifications/:id/read
router.put('/:id/read', auth, async (req, res) => {
  const note = await Notification.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) return res.status(404).json({ message: 'Notification not found' });
  note.isRead = true;
  await note.save();
  res.json(note);
});

module.exports = router;
