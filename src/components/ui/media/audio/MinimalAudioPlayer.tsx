import React, { useState, useRef } from 'react';

interface MinimalAudioPlayerProps {
  src: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const MinimalAudioPlayer: React.FC<MinimalAudioPlayerProps> = ({
  src,
  title,
  autoplay = false,
  loop = false,
  className = '',
  onPlay,
  onPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    }
  };

  return (
    <div className={`flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoplay}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={title || 'Audio player'}
      />
      
      <button
        onClick={togglePlayPause}
        className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      
      {title && (
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        </div>
      )}
    </div>
  );
}; 