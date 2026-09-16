import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Star,
  Users,
  BookOpen,
  Clock,
  CheckCircle,
  PlayCircle,
  Award,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Lock
} from 'lucide-react';

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
        <p className="text-gray-500 mt-2">The course you are looking for does not exist.</p>
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
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 bg-primary-600/80 text-white font-bold rounded-full">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 font-semibold rounded-full border border-slate-700">
                  {course.level || 'Beginner'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-400">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary-400" />
                  <span>{course.enrolledCount} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-primary-400" />
                  <span>{course.lessons?.length || 0} Video Lessons</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={course.instructorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Sticky Card CTA */}
            <div className="bg-white text-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-100 space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden relative">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block">Total Tuition</span>
                  {course.price === 0 ? (
                    <span className="text-3xl font-extrabold text-emerald-600">Free</span>
                  ) : (
                    <span className="text-3xl font-extrabold text-gray-900">${course.price}</span>
                  )}
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  Full Lifetime Access
                </span>
              </div>

              {enrolled ? (
                <Link
                  to={`/student/learning/${course.id}`}
                  className="block text-center w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-colors"
                >
                  Continue Course Classroom
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="block text-center w-full py-3.5 px-6 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-colors"
                >
                  {user ? 'Enroll Now' : 'Log In & Enroll'}
                </button>
              )}

              <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Full HD Video Lessons
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Automated Quiz Assessment
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Official Certificate of Completion
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs & Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Nav Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-6 font-bold text-sm transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Course Overview
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`pb-4 px-6 font-bold text-sm transition-colors border-b-2 ${
                  activeTab === 'syllabus'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Syllabus ({course.lessons?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`pb-4 px-6 font-bold text-sm transition-colors border-b-2 ${
                  activeTab === 'instructor'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Instructor
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">What You Will Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Understand core architecture & best practices</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Build real production-ready hands-on projects</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Pass topic quizzes to evaluate mastery</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Earn shareable course completion certificate</span>
                    </div>
                  </div>
                </div>

                {/* Course Quiz Banner */}
                {course.quiz && (
                  <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-600 text-white rounded-2xl">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{course.quiz.title}</h4>
                        <p className="text-xs text-gray-600">
                          Includes {course.quiz.questions?.length || 0} questions • Passing Score: {course.quiz.passingScore}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Syllabus */}
            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Course Curriculum</h3>
                <div className="space-y-3">
                  {course.lessons?.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 font-bold text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{lesson.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{lesson.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {lesson.duration || '15 mins'}
                        </span>
                        {enrolled ? (
                          <PlayCircle className="w-5 h-5 text-primary-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Instructor */}
            {activeTab === 'instructor' && (
              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                    alt={course.instructor}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                    <p className="text-sm font-semibold text-primary-600">{course.instructorTitle || 'Course Instructor'}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Experienced practitioner and instructor passionate about educating students worldwide. Delivering practical, easy-to-follow curriculum with hands-on exercises.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};

export default CourseDetails;
