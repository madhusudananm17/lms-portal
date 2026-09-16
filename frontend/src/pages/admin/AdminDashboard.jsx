import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, Award, ShieldCheck, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { courses, enrollments, user, allUsers = [] } = useAuth();

  // Dynamic calculations based on live database/state
  const publishedCoursesCount = courses.length;
  const activeEnrollmentsCount = enrollments.length;
  
  // Dynamic Total Revenue calculated from enrolled course prices
  const totalRevenue = enrollments.reduce((sum, en) => {
    const course = courses.find(c => c.id === en.courseId);
    return sum + (course ? course.price : 0);
  }, 0);

  // Dynamic total registered users count
  const totalUsersCount = allUsers.length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">System Admin Console</span>
          <h1 className="text-3xl font-extrabold mt-2">Platform Administration</h1>
          <p className="text-slate-400 text-xs mt-1">Real-time dynamic monitoring of platform users, courses, and revenue.</p>
        </div>
        <ShieldCheck className="w-12 h-12 text-primary-400" />
      </div>

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Total Users</p>
            <p className="text-2xl font-extrabold text-gray-900">{totalUsersCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Published Courses</p>
            <p className="text-2xl font-extrabold text-gray-900">{publishedCoursesCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Active Enrollments</p>
            <p className="text-2xl font-extrabold text-gray-900">{activeEnrollmentsCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">Platform Revenue</p>
            <p className="text-2xl font-extrabold text-gray-900">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
