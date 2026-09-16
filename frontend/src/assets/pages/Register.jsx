import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    bio: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const newUser = register({ ...formData, role });
      if (newUser.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/instructor/dashboard');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-primary-100 text-primary-600 rounded-2xl mb-1">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Create EduFlow Account</h2>
          <p className="text-xs text-gray-500">Join thousands of students and instructors today.</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'student'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            I'm a Student
          </button>
          <button
            type="button"
            onClick={() => setRole('instructor')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'instructor'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            I'm an Instructor
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          {role === 'instructor' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Professional Title</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Software Engineer & Lecturer"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            Create {role === 'instructor' ? 'Instructor' : 'Student'} Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 pt-2">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:underline">
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
