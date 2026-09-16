const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'student' } = req.body;
    const token = generateToken(`usr_${Date.now()}`, role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: `usr_${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role = 'student' } = req.body;
    const token = generateToken(`usr_${Date.now()}`, role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};
