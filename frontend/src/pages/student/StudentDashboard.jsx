import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CourseProgress from '../../components/CourseProgress';
import { BookOpen, Award, CheckCircle, HelpCircle, PlayCircle, Sparkles } from 'lucide-react';

const StudentDashboard = () => {
  const { user, courses, enrollments, quizResults } = useAuth();

  const enrolledCourseObjects = enrollments.map((en) => {
    const courseObj = courses.find((c) => c.id === en.courseId);
    return { ...en, course: courseObj };
  }).filter((item) => item.course);

  const completedLessonsTotal = enrollments.reduce((acc, curr) => acc + (curr.progress?.length || 0), 0);
  const passedQuizzesCount = quizResults.filter((r) => r.passed).length;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">Student Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {user?.name}!</h1>
          <p className="text-primary-100 text-xs sm:text-sm">Track progress, watch lessons, and earn certificates.</p>
        </div>
        <Link to="/courses" className="px-5 py-3 bg-white text-primary-700 font-extrabold text-xs rounded-2xl">
          Explore Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <BookOpen className="w-6 h-6 text-primary-600" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Enrolled</p>
            <p className="text-2xl font-extrabold">{enrolledCourseObjects.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Lessons</p>
            <p className="text-2xl font-extrabold">{completedLessonsTotal}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Quizzes</p>
            <p className="text-2xl font-extrabold">{passedQuizzesCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <Award className="w-6 h-6 text-amber-600" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Certificates</p>
            <p className="text-2xl font-extrabold">{passedQuizzesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
