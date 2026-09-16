const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz, createQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/course/:courseId', protect, getQuiz);
router.post('/:quizId/submit', protect, submitQuiz);
router.post('/', protect, authorizeRoles('instructor', 'admin'), createQuiz);

module.exports = router;
