import React, { useState, useRef } from 'react';

interface VideoPlayerWithOverlayProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const VideoPlayerWithOverlay: React.FC<VideoPlayerWithOverlayProps> = ({
  src,
  poster,
  title,
  description,
  width = '100%',
  height = 'auto',
  controls = true,
  muted = false,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowOverlay(false);
      }
    }
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      setShowOverlay(!showOverlay);
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls && !showOverlay}
        muted={muted}
        loop={loop}
        className="w-full h-full rounded-lg shadow-md cursor-pointer"
        onClick={handleVideoClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={`Video: ${title}`}
      />
      
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
          <div className="text-center text-white p-6">
            <button
              onClick={handlePlayPause}
              className="mb-4 w-20 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 mx-auto"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            {description && (
              <p className="text-sm opacity-90 max-w-md">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 