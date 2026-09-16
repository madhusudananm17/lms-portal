import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Loading content...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
      <p className="text-gray-500 font-medium text-sm">{message}</p>
    </div>
  );
};

export default Loading;
