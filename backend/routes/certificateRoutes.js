const express = require('express');
const router = express.Router();
const { getCertificates } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-certificates', protect, getCertificates);

module.exports = router;
