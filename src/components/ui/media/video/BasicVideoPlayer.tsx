import React from 'react';

interface BasicVideoPlayerProps {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const BasicVideoPlayer: React.FC<BasicVideoPlayerProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        className="w-full h-auto rounded-lg shadow-md"
        style={{ width, height }}
        aria-label="Video player"
      />
    </div>
  );
}; 