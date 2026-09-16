import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import StudentLayout from './layouts/StudentLayout';
import InstructorLayout from './layouts/InstructorLayout';
import AdminLayout from './layouts/AdminLayout';

// Protected Route Guard
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMyCourses from './pages/student/MyCourses';
import StudentLearning from './pages/student/Learning';
import StudentQuiz from './pages/student/Quiz';
import StudentQuizResult from './pages/student/QuizResult';
import StudentCertificates from './pages/student/Certificates';
import StudentProfile from './pages/student/Profile';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorMyCourses from './pages/instructor/MyCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import EditCourse from './pages/instructor/EditCourse';
import AddLesson from './pages/instructor/AddLesson';
import CreateQuiz from './pages/instructor/CreateQuiz';
import InstructorStudents from './pages/instructor/Students';
import InstructorProfile from './pages/instructor/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/Users';
import AdminStudents from './pages/admin/Students';
import AdminInstructors from './pages/admin/Instructors';
import AdminCourses from './pages/admin/Courses';
import AdminCategories from './pages/admin/Categories';
import AdminEnrollments from './pages/admin/Enrollments';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Student Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/my-courses" element={<StudentMyCourses />} />
            <Route path="/student/learning/:courseId" element={<StudentLearning />} />
            <Route path="/student/quiz/:courseId" element={<StudentQuiz />} />
            <Route path="/student/quiz-result/:courseId" element={<StudentQuizResult />} />
            <Route path="/student/certificates" element={<StudentCertificates />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>

          {/* Instructor Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/my-courses" element={<InstructorMyCourses />} />
            <Route path="/instructor/create-course" element={<CreateCourse />} />
            <Route path="/instructor/edit-course" element={<EditCourse />} />
            <Route path="/instructor/add-lesson" element={<AddLesson />} />
            <Route path="/instructor/create-quiz" element={<CreateQuiz />} />
            <Route path="/instructor/students" element={<InstructorStudents />} />
            <Route path="/instructor/profile" element={<InstructorProfile />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/instructors" element={<AdminInstructors />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/enrollments" element={<AdminEnrollments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
