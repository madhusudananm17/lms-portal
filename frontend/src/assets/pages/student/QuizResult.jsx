import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CheckCircle2, XCircle, Award, RefreshCw, BookOpen, Sparkles } from 'lucide-react';

const QuizResult = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { courses, quizResults } = useAuth();

  const course = courses.find((c) => c.id === Number(courseId));
  const result = quizResults.find((r) => r.courseId === Number(courseId));

  const questions = course?.quiz?.questions || [];
  const passingScore = course?.quiz?.passingScore || 70;

  const scorePercentage = result ? result.score : (location.state?.score ? Math.round((location.state.score / location.state.total) * 100) : 0);
  const passed = scorePercentage >= passingScore;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      {/* Result Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 text-center space-y-6">
        
        <div className="inline-flex p-4 rounded-3xl mx-auto shadow-md">
          {passed ? (
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-3xl">
              <Sparkles className="w-12 h-12" />
            </div>
          ) : (
            <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl">
              <XCircle className="w-12 h-12" />
            </div>
          )}
        </div>

        <div>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {passed ? 'Quiz Passed!' : 'Needs Improvement'}
          </span>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
            {passed ? 'Congratulations!' : 'Keep Learning'}
          </h1>
          
          <p className="text-sm text-gray-500 mt-1">
            You scored <strong className="text-gray-900">{scorePercentage}%</strong> on {course?.title}.
            Passing grade is {passingScore}%.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100">
          {passed ? (
            <Link
              to="/student/certificates"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
            >
              <Award className="w-4 h-4" /> Claim Certificate
            </Link>
          ) : (
            <Link
              to={`/student/quiz/${courseId}`}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retake Quiz
            </Link>
          )}

          <Link
            to={`/student/learning/${courseId}`}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Back to Classroom
          </Link>
        </div>

      </div>

      {/* Answer Key Review */}
      {questions.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Question Feedback & Answer Key</h3>
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <p className="font-bold text-gray-900 text-sm">{idx + 1}. {q.question}</p>
                <p className="text-emerald-700 font-semibold">
                  Correct Answer: Option {String.fromCharCode(65 + q.correctOption)} ({q.options[q.correctOption]})
                </p>
                {q.explanation && (
                  <p className="text-gray-500 italic bg-white p-2.5 rounded-lg border border-gray-200 mt-1">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizResult;
