const express = require('express');
const router = express.Router();
const { getUsers, updateUserProfile, deleteUser, updateUserRole } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', protect, getUsers);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);
router.put('/:id/role', protect, authorizeRoles('admin'), updateUserRole);

module.exports = router;
