import React from 'react';

interface CardSkeletonProps {
  showImage?: boolean;
  showAvatar?: boolean;
  textLines?: number;
  animated?: boolean;
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  showAvatar = false,
  textLines = 3,
  animated = true,
  className = '',
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 space-y-4 ${className}`}
      role="status"
      aria-label="Loading card"
    >
      {showImage && (
        <div className={`w-full h-48 bg-gray-300 rounded-md ${animationClass}`} />
      )}
      
      <div className="space-y-3">
        {showAvatar && (
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gray-300 rounded-full ${animationClass}`} />
            <div className="space-y-2">
              <div className={`h-4 bg-gray-300 rounded w-24 ${animationClass}`} />
              <div className={`h-3 bg-gray-300 rounded w-16 ${animationClass}`} />
            </div>
          </div>
        )}
        
        <div className={`h-6 bg-gray-300 rounded w-3/4 ${animationClass}`} />
        
        <div className="space-y-2">
          {Array.from({ length: textLines }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gray-300 rounded ${
                index === textLines - 1 ? 'w-2/3' : 'w-full'
              } ${animationClass}`}
            />
          ))}
        </div>
      </div>
      
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 