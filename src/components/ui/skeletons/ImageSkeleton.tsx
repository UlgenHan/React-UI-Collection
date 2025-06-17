import React from 'react';

interface ImageSkeletonProps {
  width?: string;
  height?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width = 'w-full',
  height,
  aspectRatio,
  rounded = 'md',
  showIcon = true,
  animated = true,
  className = '',
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const animationClass = animated ? 'animate-pulse' : '';
  const heightClass = height || (aspectRatio ? aspectRatioClasses[aspectRatio] : 'h-48');

  return (
    <div
      className={`bg-gray-300 ${width} ${heightClass} ${roundedClasses[rounded]} ${animationClass} flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading image"
    >
      {showIcon && (
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 