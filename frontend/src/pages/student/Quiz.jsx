import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HelpCircle, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, submitQuiz } = useAuth();

  const course = courses.find((c) => c.id === Number(courseId));
  const quiz = course?.quiz;
  const questions = quiz?.questions || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!course || !quiz || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center bg-white rounded-3xl border border-gray-200">
        <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-gray-900">No Quiz Available</h3>
        <p className="text-xs text-gray-500 mt-1 mb-4">This course does not have an active quiz set up yet.</p>
        <Link to={`/student/learning/${courseId}`} className="px-4 py-2 bg-primary-600 text-white font-bold text-xs rounded-xl">
          Back to Classroom
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        score += 1;
      }
    });

    submitQuiz(quiz.id, courseId, score, questions.length);
    navigate(`/student/quiz-result/${courseId}`, {
      state: { score, total: questions.length, answers: selectedAnswers }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary-600 uppercase">Assessment Quiz</span>
          <h1 className="text-xl font-extrabold text-gray-900">{quiz.title}</h1>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-gray-500 block">Question</span>
          <span className="text-lg font-extrabold text-primary-600">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
        
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary-50 border-primary-500 text-primary-900 shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-100 disabled:opacity-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-md transition-colors"
            >
              Submit Quiz & Grade
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl flex items-center gap-1"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default Quiz;
