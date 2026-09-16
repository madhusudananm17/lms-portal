exports.getLessonsByCourse = async (req, res) => {
  res.json([
    {
      id: 101,
      courseId: req.params.courseId,
      title: 'Introduction to HTML5 & Semantic Web',
      duration: '15 mins',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
  ]);
};

exports.addLesson = async (req, res) => {
  res.status(201).json({ id: Date.now(), ...req.body });
};
