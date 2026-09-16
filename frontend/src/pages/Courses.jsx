import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';

const Courses = () => {
  const { courses } = useAuth();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Cloud'];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLevel =
        selectedLevel === 'All' || course.level?.toLowerCase() === selectedLevel.toLowerCase();

      const matchesPrice =
        selectedPrice === 'All' ||
        (selectedPrice === 'Free' && course.price === 0) ||
        (selectedPrice === 'Paid' && course.price > 0);

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (b.enrolledCount || 0) - (a.enrolledCount || 0);
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Explore Course Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Discover expert-led courses across technology, design, and data.</p>
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title">Course Title (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by course title, topic, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No Courses Found</h3>
        </div>
      )}
    </div>
  );
};

export default Courses;
