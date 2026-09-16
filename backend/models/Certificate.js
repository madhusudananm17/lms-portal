const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateCode: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  issueDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
