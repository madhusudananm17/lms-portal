import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle } from 'lucide-react';

const VideoPlayer = ({ videoUrl, onComplete, isCompleted }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl group border border-slate-800">
      <video
        ref={videoRef}
        src={videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
        className="w-full h-full object-contain cursor-pointer"
        onEnded={() => {
          setIsPlaying(false);
          if (onComplete) onComplete();
        }}
        onClick={togglePlay}
      />

      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
        >
          <div className="p-5 bg-primary-600/90 hover:bg-primary-600 text-white rounded-full shadow-2xl transform hover:scale-110 transition-transform">
            <Play className="w-10 h-10 ml-1 fill-white" />
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <CheckCircle className="w-4 h-4" /> Lesson Completed
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="hover:text-primary-400 transition-colors">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
          </button>
          <button onClick={toggleMute} className="hover:text-primary-400 transition-colors">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {onComplete && (
            <button
              onClick={onComplete}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Mark Completed'}
            </button>
          )}

          <button onClick={handleFullscreen} className="hover:text-primary-400 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
