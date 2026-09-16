import React from 'react';
import { Target, Award, Users, BookOpen, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
          About EduFlow LMS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Transforming Education Through Interactive Learning
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          EduFlow is a state-of-the-art Learning Management System designed to empower students with industry-relevant skills and assist instructors in delivering world-class educational experiences.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Career-Focused Curriculum</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every course is engineered in partnership with technology leaders to focus on real-world projects, modern frameworks, and practical skill mastery.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Interactive Quiz Engine</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Validate your comprehension through automated quizzes with instant score breakdown, question feedback, and retake opportunities.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Verifiable Certificates</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Receive verifiable certificates of achievement upon completing courses and passing required course quizzes. Share them directly on LinkedIn or resumes.
          </p>
        </div>
      </div>

      {/* Role Ecosystem */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold">Dual Ecosystem for Students & Instructors</h2>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">For Students:</strong> Clean video lesson portal, progress tracking bar, interactive quiz interface, printable certificates, and personal account management.
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">For Instructors:</strong> Comprehensive instructor dashboard, step-by-step course builder, video and resource uploader, quiz creator, and student enrollment roster analytics.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h3 className="font-bold text-white text-lg">System Specifications</h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">Frontend Framework:</span>
              <span className="font-semibold text-white">React 18 + Vite + Tailwind CSS</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">Iconography:</span>
              <span className="font-semibold text-white">Lucide React</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-700">
              <span className="text-slate-400">State & Auth Management:</span>
              <span className="font-semibold text-white">React Context API + Persistent Storage</span>
            </li>
            <li className="flex justify-between py-1.5">
              <span className="text-slate-400">Backend API Integration:</span>
              <span className="font-semibold text-white">Node.js Express REST API</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default About;
