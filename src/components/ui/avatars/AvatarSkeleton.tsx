import React from 'react';

interface AvatarSkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  animated?: boolean;
  withName?: boolean;
  nameLines?: 1 | 2;
  className?: string;
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  size = 'md',
  shape = 'circle',
  animated = true,
  withName = false,
  nameLines = 1,
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

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  const nameSizeClasses = {
    xs: 'h-3',
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-4',
    xl: 'h-5',
    '2xl': 'h-5',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div
        className={`
          bg-gray-300 flex-shrink-0
          ${sizeClasses[size]}
          ${shapeClasses[shape]}
          ${animationClass}
        `}
      />
      {withName && (
        <div className="flex-1 space-y-2">
          <div
            className={`
              bg-gray-300 rounded w-24
              ${nameSizeClasses[size]}
              ${animationClass}
            `}
          />
          {nameLines === 2 && (
            <div
              className={`
                bg-gray-300 rounded w-16
                ${size === 'xs' || size === 'sm' ? 'h-2' : 'h-3'}
                ${animationClass}
              `}
            />
          )}
        </div>
      )}
    </div>
  );
}; 