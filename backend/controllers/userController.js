exports.getUsers = async (req, res) => {
  res.json([
    { id: 1, name: 'Alex Student', email: 'student@demo.com', role: 'student' },
    { id: 2, name: 'Dr. Sarah Jenkins', email: 'instructor@demo.com', role: 'instructor' },
    { id: 3, name: 'Admin User', email: 'admin@demo.com', role: 'admin' }
  ]);
};

exports.updateUserProfile = async (req, res) => {
  res.json({ message: 'Profile updated successfully', user: req.body });
};
