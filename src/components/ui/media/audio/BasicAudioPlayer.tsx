import React from 'react';

interface BasicAudioPlayerProps {
  src: string;
  title?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  className?: string;
}

export const BasicAudioPlayer: React.FC<BasicAudioPlayerProps> = ({
  src,
  title,
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  className = '',
}) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      {title && (
        <div className="mb-2">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <audio
        src={src}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        preload={preload}
        className="w-full rounded-lg shadow-sm"
        aria-label={title || 'Audio player'}
      />
    </div>
  );
}; 