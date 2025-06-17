import React from 'react';

interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  poster,
  aspectRatio = '16:9',
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  className = '',
}) => {
  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '21:9': 'aspect-[21/9]',
  };

  return (
    <div className={`relative w-full ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
        aria-label="Responsive video player"
      />
    </div>
  );
}; 