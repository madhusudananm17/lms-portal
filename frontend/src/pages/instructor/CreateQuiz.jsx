import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HelpCircle, PlusCircle, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';

const CreateQuiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { courses, addQuizToCourse } = useAuth();

  const initialCourseId = searchParams.get('courseId') || (courses[0]?.id || 1);
  const [courseId, setCourseId] = useState(initialCourseId);
  const [title, setTitle] = useState('Course Certification Quiz');
  const [passingScore, setPassingScore] = useState(70);

  const [questions, setQuestions] = useState([
    {
      question: 'What is the primary purpose of state in React?',
      options: ['To manage dynamic component data', 'To replace CSS styles', 'To query database', 'To host web servers'],
      correctOption: 0,
      explanation: 'State allows React components to maintain and manage dynamic data.'
    }
  ]);

  const [message, setMessage] = useState('');

  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: ''
      }
    ]);
  };

  const handleRemoveQuestion = (idx) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (idx, field, value) => {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i === qIdx) {
        const newOpts = [...q.options];
        newOpts[optIdx] = value;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || questions.length === 0) return;

    addQuizToCourse(courseId, {
      title,
      passingScore: parseInt(passingScore) || 70,
      questions
    });

    setMessage('Quiz created and published to course successfully!');
    setTimeout(() => {
      navigate('/instructor/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/instructor/dashboard" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Create Assessment Quiz</h1>
          <p className="text-xs text-gray-500">Build interactive multiple-choice quizzes to grade students.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-6">
        
        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Course</label>
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Passing Threshold (%)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Quiz Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* Dynamic Question List Builder */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">Questions ({questions.length})</h3>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1.5 bg-primary-50 text-primary-700 font-bold text-xs rounded-xl flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" /> Add Question
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div key={qIdx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 relative">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-primary-600">Question #{qIdx + 1}</span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  placeholder="Enter question prompt..."
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none"
                />

                {/* Options A - D */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400">Option {String.fromCharCode(65 + optIdx)}</span>
                      <input
                        type="text"
                        required
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Option Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Correct Answer Key</label>
                    <select
                      value={q.correctOption}
                      onChange={(e) => handleQuestionChange(qIdx, 'correctOption', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                    >
                      <option value={0}>Option A</option>
                      <option value={1}>Option B</option>
                      <option value={2}>Option C</option>
                      <option value={3}>Option D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Answer Explanation (Optional)</label>
                    <input
                      type="text"
                      placeholder="Why is this the correct answer?"
                      value={q.explanation}
                      onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" /> Publish Quiz
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateQuiz;
