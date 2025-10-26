const mongoose = require('mongoose');

const submissionFields = {
  description: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, required: true },
  imageUrl: { type: String },
  resolved: { type: Boolean, default: false },
  // Optional: security office contact for found items (Products)
  securityOffice: {
    name: { type: String },
    phone: { type: String },
  },
  // Claim status (primarily for Products)
  claimed: { type: Boolean, default: false },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  claimedAt: { type: Date },
};

function createSubmissionModel(name) {
  const schema = new mongoose.Schema(submissionFields, { timestamps: true });
  return mongoose.model(name, schema);
}

module.exports = { createSubmissionModel };
