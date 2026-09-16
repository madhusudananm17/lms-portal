import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import CourseProgress from '../../components/CourseProgress';
import {
  BookOpen,
  Award,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  PlayCircle,
  Sparkles
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, courses, enrollments, quizResults } = useAuth();

  const enrolledCourseObjects = enrollments.map((en) => {
    const courseObj = courses.find((c) => c.id === en.courseId);
    return {
      ...en,
      course: courseObj
    };
  }).filter((item) => item.course);

  const completedLessonsTotal = enrollments.reduce((acc, curr) => acc + (curr.progress?.length || 0), 0);
  const passedQuizzesCount = quizResults.filter((r) => r.passed).length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Student Learning Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {user?.name}!</h1>
          <p className="text-primary-100 text-xs sm:text-sm max-w-lg">
            Track your course completion, review upcoming video lessons, complete quizzes, and claim your certificates.
          </p>
        </div>

        <Link
          to="/courses"
          className="px-5 py-3 bg-white text-primary-700 hover:bg-primary-50 font-extrabold text-xs rounded-2xl shadow-lg transition-colors whitespace-nowrap"
        >
          Explore More Courses
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Enrolled Courses</p>
            <p className="text-2xl font-extrabold text-gray-900">{enrolledCourseObjects.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Lessons Finished</p>
            <p className="text-2xl font-extrabold text-gray-900">{completedLessonsTotal}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Quizzes Passed</p>
            <p className="text-2xl font-extrabold text-gray-900">{passedQuizzesCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Certificates Earned</p>
            <p className="text-2xl font-extrabold text-gray-900">{passedQuizzesCount}</p>
          </div>
        </div>
      </div>

      {/* Recent Learning Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Active Course Progress</h3>
          <Link to="/student/my-courses" className="text-xs font-bold text-primary-600 hover:underline">
            View All Enrolled ({enrolledCourseObjects.length})
          </Link>
        </div>

        {enrolledCourseObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourseObjects.map(({ course, progress }) => {
              const totalLessons = course.lessons?.length || 0;
              const completedCount = progress?.length || 0;
              return (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-md">
                        {course.category}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">{course.level}</span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-lg line-clamp-1">{course.title}</h4>
                    
                    <CourseProgress
                      completedCount={completedCount}
                      totalCount={totalLessons}
                      showLabel={true}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                    <span className="text-xs text-gray-500">Instructor: {course.instructor}</span>
                    <Link
                      to={`/student/learning/${course.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" /> Continue Classroom
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 space-y-3">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-base">No Enrolled Courses Yet</h4>
            <p className="text-xs text-gray-500">Browse our course directory to start learning today.</p>
            <Link
              to="/courses"
              className="inline-block px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentDashboard;
