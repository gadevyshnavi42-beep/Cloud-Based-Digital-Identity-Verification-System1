const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    documentType: {
      type: String,
      enum: ['Passport', 'National ID', 'Driving License'],
      required: true,
    },
    // NOTE: In a production system this value should be encrypted at rest
    // (e.g. via a field-level encryption library or KMS-backed envelope encryption).
    documentNumber: { type: String, required: true },
    documentFileReference: { type: String, required: true },
    selfieFileReference: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Verified', 'Rejected'],
      default: 'Pending',
      index: true,
    },
    rejectionReason: { type: String },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'submittedAt', updatedAt: true } }
);

module.exports = mongoose.model('Verification', verificationSchema);
