import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Briefcase, FileText, CheckCircle, Camera } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, title, bio });
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-xs text-gray-500 mt-1">Manage your student profile details and preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-6">
        
        {/* Avatar Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-primary-50 text-primary-700 font-bold text-[10px] rounded-md capitalize">
              {user?.role} Account
            </span>
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
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Headline / Major</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Computer Science Undergrad"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Personal Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little bit about your learning goals..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Profile;
