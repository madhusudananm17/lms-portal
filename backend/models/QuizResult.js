const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: String, required: true },
  courseId: { type: String, required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);
