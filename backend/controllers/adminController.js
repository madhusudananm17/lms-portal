exports.getAdminStats = async (req, res) => {
  res.json({
    totalUsers: 1240,
    totalCourses: 15,
    totalEnrollments: 4520,
    totalRevenue: 48920
  });
};
