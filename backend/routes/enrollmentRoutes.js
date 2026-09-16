const express = require('express');
const router = express.Router();
const { enrollCourse, getUserEnrollments } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollCourse);
router.get('/my-enrollments', protect, getUserEnrollments);

module.exports = router;
