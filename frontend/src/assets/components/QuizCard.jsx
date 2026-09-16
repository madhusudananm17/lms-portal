import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Award, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

const QuizCard = ({ quiz, courseId, result }) => {
  if (!quiz) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">{quiz.title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {quiz.questions?.length || 0} Questions • Passing Score: {quiz.passingScore || 70}%
            </p>
          </div>
        </div>

        {result && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
              result.passed
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {result.passed ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            {result.passed ? `Passed (${result.score}%)` : `Failed (${result.score}%)`}
          </span>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-4">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-primary-500" /> Certificate upon passing
        </span>

        <Link
          to={`/student/quiz/${courseId}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            result
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
          }`}
        >
          {result ? (
            <>
              <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
            </>
          ) : (
            'Start Quiz'
          )}
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
