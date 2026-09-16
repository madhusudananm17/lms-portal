import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import CourseProgress from '../../components/CourseProgress';
import { BookOpen, PlayCircle, HelpCircle, Award } from 'lucide-react';

const MyCourses = () => {
  const { courses, enrollments } = useAuth();

  const enrolledCourseObjects = enrollments.map((en) => {
    const courseObj = courses.find((c) => c.id === en.courseId);
    return {
      ...en,
      course: courseObj
    };
  }).filter((item) => item.course);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Enrolled Courses</h1>
        <p className="text-xs text-gray-500 mt-1">Manage and access your registered courses.</p>
      </div>

      {enrolledCourseObjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourseObjects.map(({ course, progress }) => {
            const completedCount = progress?.length || 0;
            const totalCount = course.lessons?.length || 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video">
                    <img
                      src={course.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold rounded-full text-gray-800">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-2">{course.title}</h3>
                    
                    <CourseProgress
                      completedCount={completedCount}
                      totalCount={totalCount}
                      showLabel={true}
                    />
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <Link
                    to={`/student/learning/${course.id}`}
                    className="flex-1 py-2.5 px-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" /> Classroom
                  </Link>

                  {course.quiz && (
                    <Link
                      to={`/student/quiz/${course.id}`}
                      className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" /> Quiz
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No Courses Registered</h3>
          <p className="text-xs text-gray-500">You have not enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="inline-block px-5 py-2.5 bg-primary-600 text-white font-bold text-xs rounded-xl"
          >
            Explore Directory
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
