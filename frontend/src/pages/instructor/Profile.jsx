import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Briefcase, FileText, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, title, bio });
    setSuccess('Instructor profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Instructor Profile Settings</h1>
        <p className="text-xs text-gray-500 mt-1">Manage public instructor profile and credentials.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
            <p className="text-xs text-primary-600 font-semibold">{user?.title || 'Senior Instructor'}</p>
          </div>
        </div>

        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Professional Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer & Educator"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Instructor Biography</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share your expertise, achievements, and teaching philosophy..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
