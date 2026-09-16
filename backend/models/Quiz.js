const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  passingScore: { type: Number, default: 70 },
  questions: [{
    question: String,
    options: [String],
    correctOption: Number,
    explanation: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
