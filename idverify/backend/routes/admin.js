const express = require('express');
const path = require('path');
const Verification = require('../models/Verification');
const Notification = require('../models/Notification');
const User = require('../models/User');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();

router.use(auth, requireAdmin);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  const [totalUsers, totalRequests, pending, approved, rejected] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Verification.countDocuments(),
    Verification.countDocuments({ status: { $in: ['Pending', 'Under Review'] } }),
    Verification.countDocuments({ status: 'Verified' }),
    Verification.countDocuments({ status: 'Rejected' }),
  ]);
  res.json({ totalUsers, totalRequests, pending, approved, rejected });
});

// GET /api/admin/verifications?status=&search=
router.get('/verifications', async (req, res) => {
  const { status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.fullName = { $regex: search, $options: 'i' };

  const records = await Verification.find(filter)
    .populate('userId', 'fullName email')
    .sort({ submittedAt: -1 });
  res.json(records);
});

// GET /api/admin/verifications/:id
router.get('/verifications/:id', async (req, res) => {
  const record = await Verification.findById(req.params.id).populate('userId', 'fullName email');
  if (!record) return res.status(404).json({ message: 'Verification not found' });
  res.json(record);
});

// GET /api/admin/verifications/:id/document/:field - short-lived authorized preview
router.get('/verifications/:id/document/:field', async (req, res) => {
  const record = await Verification.findById(req.params.id);
  if (!record) return res.status(404).json({ message: 'Verification not found' });

  const filename =
    req.params.field === 'selfie' ? record.selfieFileReference : record.documentFileReference;
  if (!filename) return res.status(404).json({ message: 'File not found' });

  res.sendFile(path.join(__dirname, '..', 'uploads', filename));
});

// PUT /api/admin/verifications/:id/approve
router.put('/verifications/:id/approve', async (req, res) => {
  const record = await Verification.findById(req.params.id);
  if (!record) return res.status(404).json({ message: 'Verification not found' });

  record.status = 'Verified';
  record.rejectionReason = undefined;
  record.reviewedAt = new Date();
  record.reviewedBy = req.user.id;
  await record.save();

  await Notification.create({
    userId: record.userId,
    message: 'Your identity verification request has been approved.',
    verificationId: record._id,
  });

  res.json(record);
});

// PUT /api/admin/verifications/:id/reject
router.put('/verifications/:id/reject', async (req, res) => {
  const { reason } = req.body;
  if (!reason) return res.status(400).json({ message: 'A rejection reason is required' });

  const record = await Verification.findById(req.params.id);
  if (!record) return res.status(404).json({ message: 'Verification not found' });

  record.status = 'Rejected';
  record.rejectionReason = reason;
  record.reviewedAt = new Date();
  record.reviewedBy = req.user.id;
  await record.save();

  await Notification.create({
    userId: record.userId,
    message: `Your identity verification request was rejected: ${reason}`,
    verificationId: record._id,
  });

  res.json(record);
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

module.exports = router;
