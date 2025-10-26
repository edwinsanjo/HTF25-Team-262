const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    registerNumber: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
