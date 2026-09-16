import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  User,
  LogOut,
  LayoutDashboard,
  Award,
  PlusCircle,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
              <div className="bg-primary-600 text-white p-2 rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-gray-900 font-extrabold">Edu<span className="text-primary-600">Flow</span></span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 ml-10">
              <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/courses" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                All Courses
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition-all focus:outline-none"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary-500 shadow-sm"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-md bg-primary-50 text-primary-700 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {user.role === 'student' ? (
                      <>
                        <Link
                          to="/student/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
                        </Link>
                        <Link
                          to="/student/my-courses"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 mr-3" /> My Learning
                        </Link>
                        <Link
                          to="/student/certificates"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <Award className="w-4 h-4 mr-3" /> My Certificates
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/instructor/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3" /> Instructor Portal
                        </Link>
                        <Link
                          to="/instructor/create-course"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 mr-3" /> Create New Course
                        </Link>
                      </>
                    )}

                    <Link
                      to={user.role === 'student' ? "/student/profile" : "/instructor/profile"}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" /> Account Settings
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            All Courses
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            About Us
          </Link>

          {user ? (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-3 px-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              {user.role === 'student' ? (
                <>
                  <Link
                    to="/student/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/my-courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary-50"
                  >
                    My Learning
                  </Link>
                </>
              ) : (
                <Link
                  to="/instructor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary-50"
                >
                  Instructor Portal
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
