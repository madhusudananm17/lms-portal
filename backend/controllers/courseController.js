const initialCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp 2026',
    description: 'Master full-stack web development with React, Node.js, Express, and modern JavaScript.',
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    rating: 4.8,
    reviewsCount: 342,
    instructor: 'Dr. Sarah Jenkins',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    enrolledCount: 1420
  },
  {
    id: 2,
    title: 'Python for Data Science & Machine Learning',
    description: 'Learn NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow.',
    category: 'Data Science',
    level: 'Intermediate',
    price: 59.99,
    rating: 4.9,
    reviewsCount: 512,
    instructor: 'Alex Rivera',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    enrolledCount: 2310
  }
];

exports.getCourses = async (req, res) => {
  res.json(initialCourses);
};

exports.getCourseById = async (req, res) => {
  const course = initialCourses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

exports.createCourse = async (req, res) => {
  const newCourse = { id: Date.now(), ...req.body };
  res.status(201).json(newCourse);
};

exports.updateCourse = async (req, res) => {
  res.json({ message: 'Course updated', course: req.body });
};

exports.deleteCourse = async (req, res) => {
  res.json({ message: 'Course deleted successfully' });
};
