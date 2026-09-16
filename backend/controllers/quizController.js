exports.getQuiz = async (req, res) => {
  res.json({
    id: 201,
    courseId: req.params.courseId,
    title: 'Web Development Mastery Quiz',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which HTML5 element is used for navigation?',
        options: ['<nav>', '<navigation>', '<header>', '<links>'],
        correctOption: 0
      }
    ]
  });
};

exports.submitQuiz = async (req, res) => {
  res.json({ score: 100, passed: true, date: new Date() });
};

exports.createQuiz = async (req, res) => {
  res.status(201).json({ id: Date.now(), ...req.body });
};
