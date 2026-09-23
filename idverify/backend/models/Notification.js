const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    message: { type: String, required: true },
    verificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Verification' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Notification', notificationSchema);
