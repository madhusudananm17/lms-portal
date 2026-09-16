import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

const EditCourse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { courses, updateCourse } = useAuth();

  const courseId = searchParams.get('courseId');
  const course = courses.find((c) => c.id === Number(courseId));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    level: 'Beginner',
    price: 0,
    thumbnail: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || 'Web Development',
        level: course.level || 'Beginner',
        price: course.price || 0,
        thumbnail: course.thumbnail || ''
      });
    }
  }, [course]);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h3 className="font-bold text-lg">Course Not Found</h3>
        <Link to="/instructor/dashboard" className="text-primary-600 text-xs underline">Back to Dashboard</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(courseId, formData);
    setMessage('Course details updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/instructor/dashboard" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Edit Course Metadata</h1>
          <p className="text-xs text-gray-500">Update course information and thumbnail.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-6">
        
        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tuition Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditCourse;
