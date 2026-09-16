import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { BookOpen, PlusCircle, Edit, HelpCircle, Video } from 'lucide-react';

const MyCourses = () => {
  const { user, courses } = useAuth();

  const instructorCourses = courses.filter((c) =>
    c.instructor?.toLowerCase() === user?.name?.toLowerCase() || true
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Managed Courses</h1>
          <p className="text-xs text-gray-500 mt-1">Manage, edit, and organize curriculum content.</p>
        </div>
        <Link
          to="/instructor/create-course"
          className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 self-start"
        >
          <PlusCircle className="w-4 h-4" /> Create Course
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="p-4 pl-6">Course Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Lessons</th>
                <th className="p-4">Price</th>
                <th className="p-4">Enrolled</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {instructorCourses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm line-clamp-1">{c.title}</p>
                      <span className="text-[11px] text-gray-400">{c.level}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-600">{c.category}</td>
                  <td className="p-4 text-xs text-gray-600">{c.lessons?.length || 0} Lessons</td>
                  <td className="p-4 text-xs font-bold text-gray-900">${c.price}</td>
                  <td className="p-4 text-xs text-gray-600">{c.enrolledCount || 0}</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/instructor/edit-course?courseId=${c.id}`}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/instructor/add-lesson?courseId=${c.id}`}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Add Video Lesson"
                      >
                        <Video className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/instructor/create-quiz?courseId=${c.id}`}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Create Quiz"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
