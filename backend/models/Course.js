const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  price: { type: Number, default: 0 },
  thumbnail: { type: String, default: '' },
  instructor: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 120 },
  enrolledCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
