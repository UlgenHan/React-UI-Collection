import React, { useState, useRef } from 'react';

interface CircularAudioButtonProps {
  src: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'outline';
  autoplay?: boolean;
  loop?: boolean;
  title?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const CircularAudioButton: React.FC<CircularAudioButtonProps> = ({
  src,
  size = 'md',
  variant = 'primary',
  autoplay = false,
  loop = false,
  title,
  className = '',
  onPlay,
  onPause,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white shadow-md',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-transparent',
  };

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
    <div className={`relative ${className}`}>
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
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          rounded-full flex items-center justify-center 
          transition-all duration-200 hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        title={title}
      >
        {isPlaying ? (
          <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className={`${iconSizes[size]} ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      
      {isPlaying && (
        <div className="absolute -inset-1 rounded-full animate-ping bg-blue-400 opacity-25" />
      )}
    </div>
  );
}; 