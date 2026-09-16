import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const initialCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp 2026',
    description: 'Master full-stack web development with React, Node.js, Express, and modern JavaScript. Build 10+ real-world projects from scratch.',
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    rating: 4.8,
    reviewsCount: 342,
    instructor: 'Dr. Sarah Jenkins',
    instructorTitle: 'Senior Full Stack Engineer & Educator',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    enrolledCount: 1420,
    status: 'published',
    lessons: [
      {
        id: 101,
        title: 'Introduction to HTML5 & Semantic Web',
        description: 'Understand basic structure, tags, forms, and semantic elements in modern HTML5.',
        duration: '15 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'HTML5 is the standard markup language for Web pages. Learn how to structure web documents efficiently.'
      },
      {
        id: 102,
        title: 'Modern CSS3 Layouts & Flexbox',
        description: 'Learn Flexbox grid alignments, responsive design principles, and custom CSS variables.',
        duration: '22 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'CSS Flexbox layout allows responsive elements within a container to automatically arrange depending upon screen size.'
      },
      {
        id: 103,
        title: 'JavaScript ES6+ Essentials',
        description: 'Arrow functions, destructuring, promises, async/await, and array methods explained.',
        duration: '35 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'ES6 introduced arrow functions, classes, template literals, and modern asynchronous programming with async/await.'
      },
      {
        id: 104,
        title: 'Building Interactive React Components',
        description: 'Component architecture, useState, useEffect, and custom hooks in React 18.',
        duration: '40 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'React allows developers to create reusable UI components that manage their own state cleanly.'
      }
    ],
    quiz: {
      id: 201,
      title: 'Web Development Mastery Quiz',
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: 'Which HTML5 element is used to define navigation links?',
          options: ['<nav>', '<navigation>', '<header>', '<links>'],
          correctOption: 0,
          explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links.'
        },
        {
          id: 2,
          question: 'What property is used in CSS Flexbox to align items along the main axis?',
          options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
          correctOption: 1,
          explanation: 'justify-content aligns items along the main axis of the flex container.'
        },
        {
          id: 3,
          question: 'Which of the following creates a block-scoped variable in JavaScript?',
          options: ['var', 'let', 'global', 'define'],
          correctOption: 1,
          explanation: 'let and const declare variables that are block-scoped.'
        },
        {
          id: 4,
          question: 'In React, what hook is primarily used for side effects?',
          options: ['useState', 'useContext', 'useEffect', 'useReducer'],
          correctOption: 2,
          explanation: 'useEffect lets you synchronize a component with an external system or handle side effects.'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Python for Data Science & Machine Learning',
    description: 'Learn NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow to build real predictive machine learning models.',
    category: 'Data Science',
    level: 'Intermediate',
    price: 59.99,
    rating: 4.9,
    reviewsCount: 512,
    instructor: 'Alex Rivera',
    instructorTitle: 'AI Research Scientist & Data Lead',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    enrolledCount: 2310,
    status: 'published',
    lessons: [
      {
        id: 105,
        title: 'Python Fundamentals & Data Structures',
        description: 'Lists, Dictionaries, Sets, and Control Flow in Python 3.',
        duration: '25 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'Python provides high-level data structures like lists, dictionaries, tuples, and sets.'
      },
      {
        id: 106,
        title: 'Data Wrangling with Pandas & NumPy',
        description: 'Cleaning datasets, filtering rows, handling missing values, and aggregation.',
        duration: '45 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'Pandas DataFrames make indexing, grouping, and mutating large tabular datasets efficient.'
      }
    ],
    quiz: {
      id: 202,
      title: 'Python Data Science Certification Quiz',
      passingScore: 75,
      questions: [
        {
          id: 1,
          question: 'Which Python library is primarily used for N-dimensional matrix operations?',
          options: ['Pandas', 'NumPy', 'Flask', 'Requests'],
          correctOption: 1,
          explanation: 'NumPy offers the ndarray object for efficient numerical multi-dimensional operations.'
        },
        {
          id: 2,
          question: 'What Pandas method is used to inspect the first 5 rows of a DataFrame?',
          options: ['df.first()', 'df.head()', 'df.preview()', 'df.top()'],
          correctOption: 1,
          explanation: 'df.head() returns the first n rows for the object based on position.'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals & Figma Prototyping',
    description: 'Design beautiful, user-centered mobile apps and websites using visual hierarchy, design systems, and Figma auto-layout.',
    category: 'Design',
    level: 'Beginner',
    price: 39.99,
    rating: 4.7,
    reviewsCount: 189,
    instructor: 'Elena Rostova',
    instructorTitle: 'Lead Product Designer at TechStudio',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600',
    enrolledCount: 890,
    status: 'published',
    lessons: [
      {
        id: 107,
        title: 'Principles of Visual Hierarchy & Typography',
        description: 'Contrast, scale, alignment, whitespace, and font pairings.',
        duration: '20 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        content: 'Visual hierarchy guides the user eye through content systematically using contrast and scale.'
      }
    ],
    quiz: {
      id: 203,
      title: 'UI/UX Fundamentals Quiz',
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: 'What does UX stand for?',
          options: ['User Experience', 'User Extension', 'Universal Execution', 'Unit eXperiment'],
          correctOption: 0,
          explanation: 'UX stands for User Experience, encompassing all aspects of the end-user interaction.'
        }
      ]
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [enrollments, setEnrollments] = useState(() => {
    const saved = localStorage.getItem('lms_enrollments');
    return saved ? JSON.parse(saved) : [
      { courseId: 1, progress: [101, 102], enrolledAt: '2026-03-01' }
    ];
  });

  const [quizResults, setQuizResults] = useState(() => {
    const saved = localStorage.getItem('lms_quiz_results');
    return saved ? JSON.parse(saved) : [
      { quizId: 201, courseId: 1, score: 100, passed: true, date: '2026-03-10' }
    ];
  });

  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('lms_all_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lms_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lms_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lms_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('lms_quiz_results', JSON.stringify(quizResults));
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem('lms_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const login = (email, password, role = 'student') => {
    // Standard mock login
    let name = email.split('@')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    // Check if demo user account
    if (email === 'student@demo.com' || role === 'student') {
      const studentUser = {
        id: 1,
        name: name || 'Alex Student',
        email: email || 'student@demo.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        title: 'Computer Science Student',
        bio: 'Passionate learner interested in web development and AI.'
      };
      setUser(studentUser);
      return studentUser;
    } else if (email === 'instructor@demo.com' || role === 'instructor') {
      const instructorUser = {
        id: 2,
        name: 'Dr. Sarah Jenkins',
        email: email || 'instructor@demo.com',
        role: 'instructor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        title: 'Senior Full Stack Engineer & Educator',
        bio: 'Teaching web technologies and modern software engineering for over 10 years.'
      };
      setUser(instructorUser);
      return instructorUser;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      title: role === 'instructor' ? 'Instructor' : 'Student',
      bio: ''
    };
    setUser(newUser);
    return newUser;
  };

  const register = (data) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || 'student',
      status: 'Active',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      title: data.title || (data.role === 'instructor' ? 'Course Instructor' : 'Student'),
      bio: data.bio || '',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setAllUsers(prev => [newUser, ...prev.filter(u => u.email !== data.email)]);
    setUser(newUser);
    return newUser;
  };

  const deleteUser = (userId) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId));
  };

  const updateUserRole = (userId, newRole) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const clearAllUsers = () => {
    setAllUsers([]);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const enrollInCourse = (courseId) => {
    if (!enrollments.some(e => e.courseId === courseId)) {
      const newEnrollment = {
        courseId,
        progress: [],
        enrolledAt: new Date().toISOString().split('T')[0]
      };
      setEnrollments(prev => [...prev, newEnrollment]);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => e.courseId === courseId);
  };

  const markLessonComplete = (courseId, lessonId) => {
    setEnrollments(prev => prev.map(item => {
      if (item.courseId === Number(courseId)) {
        const completed = item.progress.includes(lessonId);
        const updatedProgress = completed 
          ? item.progress.filter(id => id !== lessonId)
          : [...item.progress, lessonId];
        return { ...item, progress: updatedProgress };
      }
      return item;
    }));
  };

  const submitQuiz = (quizId, courseId, score, totalQuestions) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const course = courses.find(c => c.id === Number(courseId));
    const passingScore = course?.quiz?.passingScore || 70;
    const passed = percentage >= passingScore;

    const resultObj = {
      quizId,
      courseId: Number(courseId),
      score: percentage,
      passed,
      date: new Date().toISOString().split('T')[0]
    };

    setQuizResults(prev => [
      ...prev.filter(r => r.quizId !== quizId),
      resultObj
    ]);

    return resultObj;
  };

  const addCourse = (courseData) => {
    const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const createdCourse = {
      id: newId,
      ...courseData,
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      status: 'published',
      instructor: user?.name || 'Instructor',
      instructorTitle: user?.title || 'Instructor',
      instructorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      lessons: courseData.lessons || [],
      quiz: courseData.quiz || null
    };
    setCourses(prev => [createdCourse, ...prev]);
    return createdCourse;
  };

  const updateCourse = (courseId, updatedFields) => {
    setCourses(prev => prev.map(c => c.id === Number(courseId) ? { ...c, ...updatedFields } : c));
  };

  const addLessonToCourse = (courseId, lessonData) => {
    setCourses(prev => prev.map(course => {
      if (course.id === Number(courseId)) {
        const newLessonId = course.lessons.length ? Math.max(...course.lessons.map(l => l.id)) + 1 : 101;
        const newLesson = {
          id: newLessonId,
          ...lessonData
        };
        return { ...course, lessons: [...course.lessons, newLesson] };
      }
      return course;
    }));
  };

  const addQuizToCourse = (courseId, quizData) => {
    setCourses(prev => prev.map(course => {
      if (course.id === Number(courseId)) {
        return {
          ...course,
          quiz: {
            id: Date.now(),
            ...quizData
          }
        };
      }
      return course;
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      courses,
      enrollments,
      enrollInCourse,
      isEnrolled,
      markLessonComplete,
      submitQuiz,
      quizResults,
      addCourse,
      updateCourse,
      addLessonToCourse,
      addQuizToCourse,
      allUsers,
      deleteUser,
      updateUserRole,
      clearAllUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
