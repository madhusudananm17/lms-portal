import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Mail, CheckCircle, BookOpen } from 'lucide-react';

const Students = () => {
  const { courses } = useAuth();

  const enrolledStudents = [
    { id: 1, name: 'Alex Student', email: 'student@demo.com', courseTitle: 'Complete Web Development Bootcamp 2026', progress: '50%', date: '2026-03-01' },
    { id: 2, name: 'Michael Chen', email: 'mchen@example.com', courseTitle: 'Python for Data Science & Machine Learning', progress: '100%', date: '2026-02-15' },
    { id: 3, name: 'Jessica Taylor', email: 'jtaylor@example.com', courseTitle: 'UI/UX Design Fundamentals & Figma', progress: '75%', date: '2026-03-05' },
    { id: 4, name: 'David Miller', email: 'dmiller@example.com', courseTitle: 'Complete Web Development Bootcamp 2026', progress: '25%', date: '2026-03-10' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Enrolled Students Roster</h1>
        <p className="text-xs text-gray-500 mt-1">Track student enrollments and course completion progress.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="p-4 pl-6">Student Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course Enrolled</th>
                <th className="p-4">Enrollment Date</th>
                <th className="p-4 pr-6">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {enrolledStudents.map((st) => (
                <tr key={st.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-gray-900 text-sm flex items-center gap-2">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(st.name)}`} className="w-8 h-8 rounded-full" alt={st.name} />
                    {st.name}
                  </td>
                  <td className="p-4 text-xs text-gray-600">{st.email}</td>
                  <td className="p-4 text-xs font-semibold text-primary-600">{st.courseTitle}</td>
                  <td className="p-4 text-xs text-gray-500">{st.date}</td>
                  <td className="p-4 pr-6">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                      {st.progress}
                    </span>
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

export default Students;
