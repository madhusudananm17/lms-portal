import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Users,
  DollarSign,
  PlusCircle,
  HelpCircle,
  Star,
  Edit,
  PlayCircle
} from 'lucide-react';

const InstructorDashboard = () => {
  const { user, courses } = useAuth();

  const instructorCourses = courses.filter((c) =>
    c.instructor?.toLowerCase() === user?.name?.toLowerCase() || true
  );

  const totalStudents = instructorCourses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);
  const totalRevenue = instructorCourses.reduce((sum, c) => sum + ((c.enrolledCount || 0) * (c.price || 0)), 0);

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 bg-primary-600/80 text-white text-xs font-bold rounded-full">
            Instructor Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome, {user?.name}!</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
            Create new courses, add video lessons, construct quizzes, and view student progress.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/instructor/create-course"
            className="px-5 py-3 bg-primary-600 hover:bg-primary-700 font-extrabold text-xs text-white rounded-2xl shadow-lg flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Create Course
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Active Courses</p>
            <p className="text-2xl font-extrabold text-gray-900">{instructorCourses.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Total Students</p>
            <p className="text-2xl font-extrabold text-gray-900">{totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Est. Total Revenue</p>
            <p className="text-2xl font-extrabold text-gray-900">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Avg. Rating</p>
            <p className="text-2xl font-extrabold text-gray-900">4.9 / 5.0</p>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">My Managed Courses</h3>
          <Link to="/instructor/create-course" className="text-xs font-bold text-primary-600 hover:underline">
            + New Course
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-5 space-y-2">
                  <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 text-[10px] font-bold rounded-md">
                    {course.category}
                  </span>
                  <h4 className="font-bold text-gray-900 text-base line-clamp-1">{course.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <Link
                  to={`/instructor/add-lesson?courseId=${course.id}`}
                  className="flex-1 py-2 px-3 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  + Add Lesson
                </Link>
                <Link
                  to={`/instructor/create-quiz?courseId=${course.id}`}
                  className="py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default InstructorDashboard;
