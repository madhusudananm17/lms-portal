import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, Users, BookOpen, Clock, CheckCircle, PlayCircle, HelpCircle, Lock } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollInCourse, isEnrolled, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const course = courses.find((c) => c.id === Number(id));
  const enrolled = isEnrolled(Number(id));

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <Link to="/courses" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
    navigate(`/student/learning/${course.id}`);
  };

  return (
    <div className="pb-20">
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">{course.category}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{course.title}</h1>
              <p className="text-slate-300 text-base">{course.description}</p>
            </div>

            <div className="bg-white text-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-100 space-y-6">
              <img src={course.thumbnail} alt={course.title} className="rounded-2xl aspect-video object-cover w-full" />
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-gray-900">${course.price}</span>
              </div>
              {enrolled ? (
                <Link to={`/student/learning/${course.id}`} className="block text-center w-full py-3.5 px-6 bg-emerald-600 text-white font-extrabold rounded-2xl">
                  Continue Course
                </Link>
              ) : (
                <button onClick={handleEnroll} className="block text-center w-full py-3.5 px-6 bg-primary-600 text-white font-extrabold rounded-2xl">
                  {user ? 'Enroll Now' : 'Log In & Enroll'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
