import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CourseCard = ({ course }) => {
  const { isEnrolled } = useAuth();
  const enrolled = isEnrolled(course.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold rounded-full shadow-sm">
            {course.category}
          </span>
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow-sm">
            {course.level || 'Beginner'}
          </span>
        </div>
        {enrolled && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <CheckCircle className="w-3.5 h-3.5" /> Enrolled
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{course.rating || '4.8'}</span>
              <span className="text-gray-400 font-normal">({course.reviewsCount || 120})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users className="w-3.5 h-3.5" />
              <span>{course.enrolledCount || 0} students</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 line-clamp-2 transition-colors mb-2">
              {course.title}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {course.description}
          </p>
        </div>

        <div>
          {/* Instructor Header */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <img
              src={course.instructorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={course.instructor}
              className="w-7 h-7 rounded-full object-cover border border-gray-200"
            />
            <span className="text-xs font-semibold text-gray-700 truncate">{course.instructor}</span>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {course.lessons?.length || 0} Lessons
              </span>
            </div>
            <div className="text-right">
              {course.price === 0 ? (
                <span className="text-base font-extrabold text-emerald-600">Free</span>
              ) : (
                <span className="text-lg font-extrabold text-gray-900">${course.price}</span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4">
            {enrolled ? (
              <Link
                to={`/student/learning/${course.id}`}
                className="block text-center w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors"
              >
                Continue Course
              </Link>
            ) : (
              <Link
                to={`/courses/${course.id}`}
                className="block text-center w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all hover:shadow-md"
              >
                View Details & Enroll
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
