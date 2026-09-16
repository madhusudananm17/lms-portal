import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Award, CheckCircle, Printer, Download, Sparkles } from 'lucide-react';

const Certificates = () => {
  const { user, courses, quizResults } = useAuth();

  const passedQuizCourseIds = quizResults.filter(r => r.passed).map(r => r.courseId);
  const earnedCourses = courses.filter(c => passedQuizCourseIds.includes(c.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Verified Certificates</h1>
        <p className="text-xs text-gray-500 mt-1">
          Official certificates awarded upon passing course assessments.
        </p>
      </div>

      {earnedCourses.length > 0 ? (
        <div className="space-y-12">
          {earnedCourses.map((course) => {
            const certCode = `EDUFLOW-${new Date().getFullYear()}-${course.id * 8493 + 120}`;

            return (
              <div key={course.id} className="space-y-4">
                
                {/* Print Control Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <CheckCircle className="w-4 h-4" /> Verified Certificate #{certCode}
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                </div>

                {/* Printable Certificate Frame */}
                <div className="bg-white rounded-3xl border-8 border-primary-900 p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden text-center font-serif print:border-4">
                  
                  {/* Watermark / Seal */}
                  <div className="absolute top-6 right-6 text-primary-600/10">
                    <Award className="w-32 h-32" />
                  </div>

                  {/* Header */}
                  <div className="space-y-2 relative z-10">
                    <div className="inline-flex p-3 bg-primary-600 text-white rounded-2xl mb-2">
                      <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-wider uppercase font-sans">
                      Certificate of Achievement
                    </h2>
                    <p className="text-xs font-sans text-gray-400 uppercase tracking-widest">
                      EduFlow Online Learning Platform
                    </p>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-4 py-4 relative z-10">
                    <p className="text-xs font-sans text-gray-500 uppercase tracking-wider">This certifies that</p>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-900 underline decoration-primary-300 decoration-2 underline-offset-8">
                      {user?.name || 'Valued Student'}
                    </h3>
                    <p className="text-sm font-sans text-gray-600 max-w-xl mx-auto leading-relaxed pt-2">
                      has successfully completed the comprehensive curriculum and passed the official assessment for
                    </p>
                    <h4 className="text-2xl font-bold font-sans text-gray-900 pt-1">
                      {course.title}
                    </h4>
                  </div>

                  {/* Signature Footer */}
                  <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-8 items-end relative z-10 font-sans text-xs">
                    <div className="text-left space-y-1">
                      <p className="font-bold text-gray-900">{course.instructor}</p>
                      <p className="text-gray-500 text-[11px]">{course.instructorTitle || 'Course Instructor'}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-bold text-gray-900">Issue Date: {new Date().toISOString().split('T')[0]}</p>
                      <p className="text-emerald-600 font-mono text-[11px]">{certCode}</p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-4">
          <Award className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No Certificates Earned Yet</h3>
          <p className="text-xs text-gray-500">
            Complete course lessons and pass the course assessment quiz with 70%+ to unlock official certificates.
          </p>
        </div>
      )}
    </div>
  );
};

export default Certificates;
