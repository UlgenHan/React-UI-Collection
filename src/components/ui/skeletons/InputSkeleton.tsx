import React from 'react';

interface InputSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  showLabel?: boolean;
  showHelperText?: boolean;
  animated?: boolean;
  className?: string;
}

export const InputSkeleton: React.FC<InputSkeletonProps> = ({
  size = 'md',
  width = 'w-full',
  showLabel = true,
  showHelperText = false,
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Loading input">
      {showLabel && (
        <div className={`h-4 bg-gray-300 rounded w-20 ${animationClass}`} />
      )}
      
      <div
        className={`${width} ${sizeClasses[size]} bg-gray-300 rounded-md border border-gray-300 ${animationClass}`}
      />
      
      {showHelperText && (
        <div className={`h-3 bg-gray-300 rounded w-32 ${animationClass}`} />
      )}
      
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 