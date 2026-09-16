exports.enrollCourse = async (req, res) => {
  res.status(201).json({ message: 'Enrolled successfully', courseId: req.params.courseId });
};

exports.getUserEnrollments = async (req, res) => {
  res.json([
    { courseId: 1, progress: [101, 102], enrolledAt: '2026-03-01' }
  ]);
};
