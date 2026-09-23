const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/users/profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// PUT /api/users/profile
router.put('/profile', auth, async (req, res) => {
  const { fullName, mobileNumber } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { ...(fullName && { fullName }), ...(mobileNumber && { mobileNumber }) } },
    { new: true }
  ).select('-passwordHash');
  res.json(user);
});

module.exports = router;
