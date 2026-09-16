import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const CourseProgress = ({ completedCount = 0, totalCount = 1, showLabel = true }) => {
  const percentage = Math.min(100, Math.round((completedCount / (totalCount || 1)) * 100));
  const isCompleted = percentage === 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span className="flex items-center gap-1.5 text-gray-700">
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <Circle className="w-4 h-4 text-primary-500" />
            )}
            {isCompleted ? 'Course Completed' : 'Course Progress'}
          </span>
          <span className={isCompleted ? 'text-emerald-600 font-bold' : 'text-primary-600 font-bold'}>
            {percentage}% ({completedCount}/{totalCount} lessons)
          </span>
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isCompleted ? 'bg-emerald-500' : 'bg-primary-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CourseProgress;
