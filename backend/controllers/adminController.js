const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      totalRevenue: 0
    });
  } catch (error) {
    res.json({
      totalUsers: 0,
      totalCourses: 0,
      totalEnrollments: 0,
      totalRevenue: 0
    });
  }
};
