import React, { useState } from 'react';
import { Trash2, Shield, UserCheck, Search, CheckCircle2 } from 'lucide-react';

const Users = () => {
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Alex Student', email: 'student@demo.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Dr. Sarah Jenkins', email: 'instructor@demo.com', role: 'Instructor', status: 'Active' },
    { id: 3, name: 'Admin Master', email: 'admin@demo.com', role: 'Admin', status: 'Active' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to remove user "${userName}"?`)) {
      setUsersList(prev => prev.filter(u => u.id !== userId));
      setNotification(`User "${userName}" has been permanently removed.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setNotification(`User role updated to ${newRole}.`);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-500 mt-1">Manage user roles, edit profiles, or remove registered accounts.</p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {notification}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="p-4 pl-6">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.name)}`}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      alt={u.name}
                    />
                    {u.name}
                  </td>
                  <td className="p-4 text-xs text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 focus:outline-none"
                    >
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs text-emerald-600 font-bold">{u.status}</td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                      title="Remove User Account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default Users;
