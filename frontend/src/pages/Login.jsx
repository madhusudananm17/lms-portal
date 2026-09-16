import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const loggedUser = login(email, password, role);
      if (loggedUser.role === 'student') navigate('/student/dashboard');
      else if (loggedUser.role === 'instructor') navigate('/instructor/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid login credentials.');
    }
  };

  const handleDemoLogin = (demoRole) => {
    if (demoRole === 'student') {
      login('student@demo.com', 'password123', 'student');
      navigate('/student/dashboard');
    } else if (demoRole === 'instructor') {
      login('instructor@demo.com', 'password123', 'instructor');
      navigate('/instructor/dashboard');
    } else {
      login('admin@demo.com', 'password123', 'admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-primary-100 text-primary-600 rounded-2xl mb-1">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back to EduFlow</h2>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl ${role === 'student' ? 'bg-white text-primary-600' : 'text-gray-500'}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('instructor')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl ${role === 'instructor' ? 'bg-white text-primary-600' : 'text-gray-500'}`}
          >
            Instructor
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl ${role === 'admin' ? 'bg-white text-primary-600' : 'text-gray-500'}`}
          >
            Admin
          </button>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-primary-600 text-white font-extrabold text-sm rounded-xl">
            Sign In
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 space-y-2">
          <p className="text-center text-xs text-gray-400 font-semibold mb-2">Demo Quick Logins:</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleDemoLogin('student')} className="py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl">
              Student
            </button>
            <button onClick={() => handleDemoLogin('instructor')} className="py-2 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl">
              Instructor
            </button>
            <button onClick={() => handleDemoLogin('admin')} className="py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl">
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
