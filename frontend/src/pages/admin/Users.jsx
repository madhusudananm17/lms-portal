import React from 'react';

const Users = () => {
  const usersList = [
    { id: 1, name: 'Alex Student', email: 'student@demo.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Dr. Sarah Jenkins', email: 'instructor@demo.com', role: 'Instructor', status: 'Active' },
    { id: 3, name: 'Admin Master', email: 'admin@demo.com', role: 'Admin', status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
            <tr>
              <th className="p-4 pl-6">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-4 pl-6 font-bold">{u.name}</td>
                <td className="p-4 text-xs text-gray-600">{u.email}</td>
                <td className="p-4 text-xs font-semibold">{u.role}</td>
                <td className="p-4 pr-6 text-xs text-emerald-600 font-bold">{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
