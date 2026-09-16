import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Search, CheckCircle2, UserX, UserPlus } from 'lucide-react';

const Users = () => {
  const { allUsers = [], deleteUser, updateUserRole, clearAllUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to remove user "${userName}"?`)) {
      deleteUser(userId);
      setNotification(`User "${userName}" has been permanently removed.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove ALL registered user accounts?')) {
      clearAllUsers();
      setNotification('All registered user accounts have been removed.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole.toLowerCase());
    setNotification(`User role updated to ${newRole}.`);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredUsers = allUsers.filter(u =>
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-500 mt-1">Manage user roles or remove registered accounts dynamically.</p>
        </div>

        {allUsers.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <UserX className="w-4 h-4" />
            Clear All Registered Users ({allUsers.length})
          </button>
        )}
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
          placeholder="Search registered users by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-gray-800">No Registered Users Found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              {allUsers.length === 0 
                ? 'All static dummy accounts have been removed. Any new user who registers on the site will automatically appear here in real time.'
                : 'No users match your search query.'}
            </p>
          </div>
        ) : (
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
                        src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.name || 'User')}`}
                        className="w-8 h-8 rounded-full border border-gray-200"
                        alt={u.name}
                      />
                      {u.name}
                    </td>
                    <td className="p-4 text-xs text-gray-600">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={(u.role || 'student').toLowerCase()}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700 capitalize focus:outline-none"
                      >
                        <option value="student">student</option>
                        <option value="instructor">instructor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-xs text-emerald-600 font-bold">{u.status || 'Active'}</td>
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
        )}
      </div>
    </div>
  );
};

export default Users;
