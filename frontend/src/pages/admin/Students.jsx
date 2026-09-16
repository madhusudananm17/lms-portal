import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Trash2 } from 'lucide-react';

const Students = () => {
  const { allUsers = [], deleteUser } = useAuth();
  const students = allUsers.filter(u => (u.role || '').toLowerCase() === 'student');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manage Registered Students</h1>
          <p className="text-xs text-gray-500 mt-1">Overview of all student accounts registered on the portal.</p>
        </div>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
          Total: {students.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        {students.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-gray-800">No Students Registered Yet</h3>
            <p className="text-xs text-gray-500 mt-1">When new students register, their details will display here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                <tr>
                  <th className="p-4 pl-6">Student Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Registered Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {students.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-3">
                      <img
                        src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.name)}`}
                        className="w-8 h-8 rounded-full border border-gray-200"
                        alt={u.name}
                      />
                      {u.name}
                    </td>
                    <td className="p-4 text-xs text-gray-600">{u.email}</td>
                    <td className="p-4 text-xs text-gray-500">{u.registeredAt || 'Recent'}</td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                        title="Remove Student Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
