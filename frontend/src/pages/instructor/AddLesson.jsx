import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video, PlusCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

const AddLesson = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { courses, addLessonToCourse } = useAuth();

  const initialCourseId = searchParams.get('courseId') || (courses[0]?.id || 1);
  const [courseId, setCourseId] = useState(initialCourseId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '20 mins',
    content: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    addLessonToCourse(courseId, formData);
    setMessage(`Lesson "${formData.title}" added successfully!`);
    setFormData({
      title: '',
      description: '',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: '20 mins',
      content: ''
    });

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/instructor/dashboard" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Add Video Lesson</h1>
          <p className="text-xs text-gray-500">Append video lectures and reference materials to your course.</p>
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
            <label className="block text-xs font-bold text-gray-700 mb-1">Select Target Course *</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Lesson Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Introduction to Async/Await and Promises"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Video Stream URL *</label>
              <input
                type="text"
                name="videoUrl"
                required
                placeholder="https://...mp4 or YouTube URL"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Duration (e.g. 15 mins)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Short Summary</label>
            <input
              type="text"
              name="description"
              placeholder="Brief explanation of lesson contents..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Lecture Notes / Code Snippets</label>
            <textarea
              name="content"
              rows={4}
              placeholder="Include markdown notes, reference links, or downloadable materials..."
              value={formData.content}
              onChange={handleChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Save Lesson
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddLesson;
