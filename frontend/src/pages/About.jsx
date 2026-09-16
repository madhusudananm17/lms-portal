import React from 'react';
import { Target, Award, Users, BookOpen, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Career-Focused Curriculum</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every course is engineered in partnership with technology leaders to focus on real-world projects and practical skill mastery.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Interactive Quiz Engine</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Validate your comprehension through automated quizzes with instant score breakdown and feedback.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Verifiable Certificates</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Receive verifiable certificates of achievement upon completing courses and passing required course quizzes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
