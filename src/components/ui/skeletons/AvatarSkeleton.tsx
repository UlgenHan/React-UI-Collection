import React from 'react';

interface AvatarSkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  className?: string;
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  size = 'md',
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div
      className={`bg-gray-300 rounded-full ${sizeClasses[size]} ${animationClass} ${className}`}
      role="status"
      aria-label="Loading avatar"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 