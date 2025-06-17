import React from 'react';

interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  items = 5,
  showAvatar = false,
  showIcon = false,
  animated = true,
  className = '',
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading list">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3">
          {showAvatar && (
            <div className={`w-10 h-10 bg-gray-300 rounded-full ${animationClass}`} />
          )}
          {showIcon && !showAvatar && (
            <div className={`w-6 h-6 bg-gray-300 rounded ${animationClass}`} />
          )}
          
          <div className="flex-1 space-y-2">
            <div className={`h-4 bg-gray-300 rounded w-3/4 ${animationClass}`} />
            <div className={`h-3 bg-gray-300 rounded w-1/2 ${animationClass}`} />
          </div>
          
          <div className={`w-8 h-8 bg-gray-300 rounded ${animationClass}`} />
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 