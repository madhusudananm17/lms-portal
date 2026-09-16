import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || (role === 'student' ? '/student/dashboard' : '/instructor/dashboard');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const loggedUser = login(email, password, role);
      if (loggedUser.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/instructor/dashboard');
      }
    } catch (err) {
      setError('Invalid login credentials.');
    }
  };

  const handleDemoLogin = (demoRole) => {
    if (demoRole === 'student') {
      login('student@demo.com', 'password123', 'student');
      navigate('/student/dashboard');
    } else {
      login('instructor@demo.com', 'password123', 'instructor');
      navigate('/instructor/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-primary-100 text-primary-600 rounded-2xl mb-1">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back to EduFlow</h2>
          <p className="text-xs text-gray-500">Log in to access your portal, courses, and certificates.</p>
        </div>

        {/* Role Selector Tabs */}
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
            Student Account
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
            Instructor Account
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder={role === 'student' ? 'student@demo.com' : 'instructor@demo.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            Sign In to Portal <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Logins */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <p className="text-center text-xs font-semibold text-gray-400 mb-2">Instant Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('student')}
              className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" /> Demo Student
            </button>
            <button
              onClick={() => handleDemoLogin('instructor')}
              className="py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Demo Instructor
            </button>
          </div>
        </div>

        {/* Sign up prompt */}
        <p className="text-center text-xs text-gray-500 pt-2">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-primary-600 hover:underline">
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
