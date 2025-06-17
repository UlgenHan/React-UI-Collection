import React from 'react';

interface AnimatedSkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'shimmer' | 'wave' | 'pulse';
  className?: string;
}

export const AnimatedSkeleton: React.FC<AnimatedSkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  variant = 'shimmer',
  className = '',
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const baseClasses = `${width} ${height} ${roundedClasses[rounded]} ${className}`;

  if (variant === 'shimmer') {
    return (
      <div
        className={`relative overflow-hidden bg-gray-300 ${baseClasses}`}
        role="status"
        aria-label="Loading content"
      >
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
          style={{
            animation: 'shimmer 2s infinite',
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div
        className={`bg-gray-300 ${baseClasses}`}
        style={{
          backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'wave 1.5s infinite',
        }}
        role="status"
        aria-label="Loading content"
      >
        <style jsx>{`
          @keyframes wave {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-300 animate-pulse ${baseClasses}`}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 