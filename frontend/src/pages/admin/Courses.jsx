import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Courses = () => {
  const { courses } = useAuth();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Admin Course Moderation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="p-4 bg-white rounded-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900">{c.title}</h3>
            <p className="text-xs text-gray-500">Instructor: {c.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
