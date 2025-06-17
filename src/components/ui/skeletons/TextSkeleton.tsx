import React from 'react';

interface TextSkeletonProps {
  lines?: number;
  spacing?: 'sm' | 'md' | 'lg';
  lastLineWidth?: string;
  animated?: boolean;
  className?: string;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 3,
  spacing = 'md',
  lastLineWidth = 'w-3/4',
  animated = true,
  className = '',
}) => {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`${spacingClasses[spacing]} ${className}`} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-300 rounded ${
            index === lines - 1 ? lastLineWidth : 'w-full'
          } ${animationClass}`}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 