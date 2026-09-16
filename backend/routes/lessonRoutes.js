const express = require('express');
const router = express.Router();
const { getLessonsByCourse, addLesson } = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/course/:courseId', protect, getLessonsByCourse);
router.post('/', protect, authorizeRoles('instructor', 'admin'), addLesson);

module.exports = router;
