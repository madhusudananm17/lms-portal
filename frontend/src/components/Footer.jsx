import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="bg-primary-600 text-white p-2 rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-white">Edu<span className="text-primary-400">Flow</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering learners worldwide with cutting-edge interactive courses, real-world hands-on projects, expert mentorship, and industry-recognized certifications.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">All Courses</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Platform</Link></li>
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Student Login</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors">Instructor Signup</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Categories</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses?category=Web%20Development" className="hover:text-primary-400 transition-colors">Web Development</Link></li>
              <li><Link to="/courses?category=Data%20Science" className="hover:text-primary-400 transition-colors">Data Science & AI</Link></li>
              <li><Link to="/courses?category=Design" className="hover:text-primary-400 transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-primary-400" /><span className="text-slate-400">support@eduflow.com</span></li>
              <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-primary-400" /><span className="text-slate-400">+1 (800) 555-EDULMS</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduFlow LMS Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
