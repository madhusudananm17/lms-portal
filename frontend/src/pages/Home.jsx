import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  Video,
  CheckCircle2,
  ArrowRight,
  Search,
  Code2,
  BrainCircuit,
  Palette,
  Cloud,
  Briefcase,
  Star
} from 'lucide-react';

const Home = () => {
  const { courses } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { title: 'Web Development', icon: Code2, count: '12 Courses', color: 'bg-blue-500' },
    { title: 'Data Science & AI', icon: BrainCircuit, count: '8 Courses', color: 'bg-purple-500' },
    { title: 'UI/UX Design', icon: Palette, count: '6 Courses', color: 'bg-pink-500' },
    { title: 'Cloud & DevOps', icon: Cloud, count: '5 Courses', color: 'bg-sky-500' },
    { title: 'Business & Leadership', icon: Briefcase, count: '7 Courses', color: 'bg-amber-500' },
  ];

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 via-white to-white pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 text-primary-700 text-xs font-bold rounded-full border border-primary-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span>Next-Generation Learning Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Unlock Your Potential with <span className="text-primary-600">EduFlow</span> LMS
              </h1>

              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore top-rated video courses taught by industry veterans. Learn at your own pace, complete interactive quizzes, and earn verifiable certificates.
              </p>

              <div className="max-w-md mx-auto lg:mx-0 relative">
                <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-28 py-3.5 bg-white rounded-2xl border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <Link
                  to={searchTerm ? `/courses?search=${encodeURIComponent(searchTerm)}` : '/courses'}
                  className="absolute right-2 top-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Search
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10,000+ Active Students
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verifiable Certificates
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lifetime Access
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Students Learning Online"
                  className="rounded-3xl shadow-2xl border-4 border-white relative z-10 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Certificates Earned</p>
                    <p className="text-base font-extrabold text-gray-900">4,850+</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">Handpicked For You</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Featured Online Courses</h2>
          </div>
          <Link to="/courses" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold text-sm">
            Explore All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
