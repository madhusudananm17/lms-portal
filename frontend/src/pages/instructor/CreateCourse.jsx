import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, PlusCircle, ArrowLeft, CheckCircle } from 'lucide-react';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { addCourse } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'
  });

  const categories = ['Web Development', 'Data Science', 'Design', 'Cloud', 'Business & Leadership'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const newCourse = addCourse(formData);
    navigate(`/instructor/add-lesson?courseId=${newCourse.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/instructor/dashboard" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Create New Course</h1>
          <p className="text-xs text-gray-500">Fill in course specifications to publish to the catalog.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Course Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Master React 18 & Redux Toolkit"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Skill Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tuition Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Thumbnail Cover Image URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Course Summary / Overview *</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Describe what students will learn, prerequisites, and goals..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link
              to="/instructor/dashboard"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Create & Add Lessons
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
