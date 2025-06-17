import React, { useState, useRef } from 'react';

interface VideoThumbnailPreviewProps {
  src: string;
  poster: string;
  title?: string;
  duration?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

export const VideoThumbnailPreview: React.FC<VideoThumbnailPreviewProps> = ({
  src,
  poster,
  title,
  duration,
  width = '100%',
  height = 'auto',
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isPreviewLoaded) {
      videoRef.current.load();
      setIsPreviewLoaded(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoLoad = () => {
    if (videoRef.current && isHovered) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Poster Image */}
      <img
        src={poster}
        alt={title || 'Video thumbnail'}
        className={`w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Preview Video */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadedData={handleVideoLoad}
        aria-label="Video preview"
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg">
        <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <svg className="w-6 h-6 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Duration Badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      )}

      {/* Title Overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent rounded-b-lg">
          <h3 className="text-white text-sm font-medium truncate">{title}</h3>
        </div>
      )}
    </div>
  );
}; 