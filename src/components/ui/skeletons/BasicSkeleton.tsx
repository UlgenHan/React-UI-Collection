import React from 'react';

interface BasicSkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animated?: boolean;
  className?: string;
}

export const BasicSkeleton: React.FC<BasicSkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  animated = true,
  className = '',
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div
      className={`bg-gray-300 ${width} ${height} ${roundedClasses[rounded]} ${animationClass} ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 