const express = require('express');
const Verification = require('../models/Verification');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/verifications/submit
router.post(
  '/submit',
  auth,
  upload.fields([{ name: 'document', maxCount: 1 }, { name: 'selfie', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { fullName, dateOfBirth, address, documentType, documentNumber } = req.body;

      if (!fullName || !dateOfBirth || !address || !documentType || !documentNumber) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
      if (!req.files || !req.files.document) {
        return res.status(400).json({ message: 'Identity document upload is required' });
      }

      const verification = await Verification.create({
        userId: req.user.id,
        fullName,
        dateOfBirth,
        address,
        documentType,
        documentNumber,
        documentFileReference: req.files.document[0].filename,
        selfieFileReference: req.files.selfie ? req.files.selfie[0].filename : undefined,
        status: 'Pending',
      });

      await Notification.create({
        userId: req.user.id,
        message: 'Your identity verification request has been submitted and is pending review.',
        verificationId: verification._id,
      });

      res.status(201).json(verification);
    } catch (err) {
      res.status(500).json({ message: 'Submission failed', error: err.message });
    }
  }
);

// GET /api/verifications/my-requests
router.get('/my-requests', auth, async (req, res) => {
  const requests = await Verification.find({ userId: req.user.id }).sort({ submittedAt: -1 });
  res.json(requests);
});

// GET /api/verifications/:id  (owner only)
router.get('/:id', auth, async (req, res) => {
  const record = await Verification.findById(req.params.id);
  if (!record) return res.status(404).json({ message: 'Verification not found' });
  if (String(record.userId) !== req.user.id) {
    return res.status(403).json({ message: 'You cannot access this verification record' });
  }
  res.json(record);
});

// PUT /api/verifications/:id/resubmit
router.put(
  '/:id/resubmit',
  auth,
  upload.fields([{ name: 'document', maxCount: 1 }, { name: 'selfie', maxCount: 1 }]),
  async (req, res) => {
    const record = await Verification.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Verification not found' });
    if (String(record.userId) !== req.user.id) {
      return res.status(403).json({ message: 'You cannot modify this verification record' });
    }
    if (record.status !== 'Rejected') {
      return res.status(400).json({ message: 'Only rejected requests can be resubmitted' });
    }

    const { fullName, dateOfBirth, address, documentType, documentNumber } = req.body;
    if (fullName) record.fullName = fullName;
    if (dateOfBirth) record.dateOfBirth = dateOfBirth;
    if (address) record.address = address;
    if (documentType) record.documentType = documentType;
    if (documentNumber) record.documentNumber = documentNumber;
    if (req.files && req.files.document) record.documentFileReference = req.files.document[0].filename;
    if (req.files && req.files.selfie) record.selfieFileReference = req.files.selfie[0].filename;

    record.status = 'Pending';
    record.rejectionReason = undefined;
    record.reviewedAt = undefined;
    record.reviewedBy = undefined;

    await record.save();
    res.json(record);
  }
);

module.exports = router;
