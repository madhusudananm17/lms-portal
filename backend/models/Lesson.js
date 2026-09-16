const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  duration: { type: String, default: '15 mins' },
  content: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
