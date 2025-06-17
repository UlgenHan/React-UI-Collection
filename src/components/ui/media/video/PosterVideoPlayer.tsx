import React, { useState } from 'react';

interface PosterVideoPlayerProps {
  src: string;
  poster: string;
  title?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const PosterVideoPlayer: React.FC<PosterVideoPlayerProps> = ({
  src,
  poster,
  title,
  width = '100%',
  height = 'auto',
  controls = true,
  muted = false,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isPlaying ? (
        <div className="relative w-full h-full">
          <img
            src={poster}
            alt={title || 'Video poster'}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 rounded-lg"
            aria-label="Play video"
          >
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </button>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
              <h3 className="text-white text-lg font-semibold">{title}</h3>
            </div>
          )}
        </div>
      ) : (
        <video
          src={src}
          poster={poster}
          controls={controls}
          autoPlay
          muted={muted}
          loop={loop}
          className="w-full h-full rounded-lg shadow-md"
          aria-label="Video player"
        />
      )}
    </div>
  );
}; 