import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  User,
  PlusCircle,
  HelpCircle,
  Users,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/my-courses', label: 'My Enrolled Courses', icon: BookOpen },
    { to: '/student/certificates', label: 'Certificates', icon: Award },
    { to: '/student/profile', label: 'Profile Settings', icon: User },
  ];

  const instructorLinks = [
    { to: '/instructor/dashboard', label: 'Instructor Overview', icon: LayoutDashboard },
    { to: '/instructor/my-courses', label: 'My Managed Courses', icon: BookOpen },
    { to: '/instructor/create-course', label: 'Create New Course', icon: PlusCircle },
    { to: '/instructor/create-quiz', label: 'Create Quiz', icon: HelpCircle },
    { to: '/instructor/students', label: 'Enrolled Students', icon: Users },
    { to: '/instructor/profile', label: 'Instructor Profile', icon: User },
  ];

  const links = isStudent ? studentLinks : instructorLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div className="px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
            <span className="text-xs font-semibold text-primary-700 capitalize block">
              {user?.role} Account
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
        <p className="text-xs font-semibold text-gray-500 mb-1">Need Assistance?</p>
        <p className="text-xs text-gray-400 mb-3">Check our documentation or reach out to support.</p>
        <NavLink
          to="/about"
          className="inline-block px-3 py-1.5 bg-white border border-gray-200 hover:border-primary-500 text-xs font-semibold text-gray-700 hover:text-primary-600 rounded-lg shadow-sm transition-colors"
        >
          View Guide
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
