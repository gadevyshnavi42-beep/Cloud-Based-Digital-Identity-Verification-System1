// Run with: node seed.js
// Creates one admin account and one demo user account for testing.
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

(async () => {
  await connectDB();

  const admin = await User.findOne({ email: 'admin@idverify.test' });
  if (!admin) {
    await User.create({
      fullName: 'System Admin',
      email: 'admin@idverify.test',
      mobileNumber: '0000000000',
      passwordHash: await bcrypt.hash('Admin@123', 10),
      role: 'admin',
    });
    console.log('Created admin: admin@idverify.test / Admin@123');
  } else {
    console.log('Admin already exists');
  }

  const demo = await User.findOne({ email: 'demo@idverify.test' });
  if (!demo) {
    await User.create({
      fullName: 'Demo User',
      email: 'demo@idverify.test',
      mobileNumber: '1111111111',
      passwordHash: await bcrypt.hash('Demo@123', 10),
      role: 'user',
    });
    console.log('Created demo user: demo@idverify.test / Demo@123');
  } else {
    console.log('Demo user already exists');
  }

  await mongoose.disconnect();
  process.exit(0);
})();
