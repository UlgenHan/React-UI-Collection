import React from 'react';

interface MutedAutoplayVideoProps {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  loop?: boolean;
  showControls?: boolean;
  className?: string;
}

export const MutedAutoplayVideo: React.FC<MutedAutoplayVideoProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  loop = true,
  showControls = false,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop={loop}
        controls={showControls}
        playsInline
        className="w-full h-auto rounded-lg shadow-md"
        style={{ width, height }}
        aria-label="Auto-playing preview video"
      />
      {!showControls && (
        <div className="absolute top-2 right-2">
          <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Auto-playing
          </div>
        </div>
      )}
    </div>
  );
}; 