import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VideoPlayer from '../../components/VideoPlayer';
import CourseProgress from '../../components/CourseProgress';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  BookOpen
} from 'lucide-react';

const Learning = () => {
  const { courseId } = useParams();
  const { courses, enrollments, markLessonComplete, quizResults } = useAuth();

  const course = courses.find((c) => c.id === Number(courseId));
  const enrollment = enrollments.find((e) => e.courseId === Number(courseId));

  const lessons = course?.lessons || [];
  const completedLessonIds = enrollment?.progress || [];

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h3 className="font-bold text-lg">Course Not Found</h3>
        <Link to="/student/my-courses" className="text-primary-600 text-xs underline">Back to My Courses</Link>
      </div>
    );
  }

  const isLessonCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  const handleToggleComplete = () => {
    if (activeLesson) {
      markLessonComplete(courseId, activeLesson.id);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < lessons.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
    }
  };

  const quizResult = quizResults.find((r) => r.courseId === Number(courseId));

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <Link to="/student/my-courses" className="inline-flex items-center gap-1 text-xs text-primary-600 font-bold hover:underline mb-1">
            <ChevronLeft className="w-4 h-4" /> Back to My Courses
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">{course.title}</h1>
        </div>

        {course.quiz && (
          <Link
            to={`/student/quiz/${course.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> {quizResult ? 'Retake Quiz' : 'Take Course Quiz'}
          </Link>
        )}
      </div>

      {/* Main Grid: Player on left, Syllabus on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Player & Lesson Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player */}
          {activeLesson ? (
            <VideoPlayer
              videoUrl={activeLesson.videoUrl}
              onComplete={handleToggleComplete}
              isCompleted={isLessonCompleted}
            />
          ) : (
            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              No lesson selected.
            </div>
          )}

          {/* Player Navigation bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <button
              onClick={handlePrevLesson}
              disabled={activeLessonIndex === 0}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Lesson
            </button>

            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors ${
                isLessonCompleted
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isLessonCompleted ? 'Marked Completed' : 'Mark as Complete'}
            </button>

            <button
              onClick={handleNextLesson}
              disabled={activeLessonIndex === lessons.length - 1}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Lesson Text Details */}
          {activeLesson && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">{activeLesson.title}</h3>
                <span className="text-xs text-gray-500 font-semibold">{activeLesson.duration || '15 mins'}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{activeLesson.description}</p>
              
              {activeLesson.content && (
                <div className="pt-2">
                  <h4 className="font-bold text-xs uppercase text-gray-400 mb-2">Lesson Content & Notes</h4>
                  <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-700 leading-relaxed font-mono">
                    {activeLesson.content}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Lessons Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Course Curriculum</h3>
            
            <CourseProgress
              completedCount={completedLessonIds.length}
              totalCount={lessons.length}
              showLabel={true}
            />

            <div className="space-y-2 pt-2 max-h-[500px] overflow-y-auto pr-1">
              {lessons.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isActive = idx === activeLessonIndex;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-primary-50 border-primary-300 font-bold text-primary-700 shadow-sm'
                        : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>

                    <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                      {lesson.duration || '10m'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Learning;
