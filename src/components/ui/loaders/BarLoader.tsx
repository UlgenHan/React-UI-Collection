import React from 'react';

interface BarLoaderProps {
  width?: string;
  height?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const BarLoader: React.FC<BarLoaderProps> = ({
  width = 'w-32',
  height = 'md',
  color = 'bg-blue-600',
  className = '',
}) => {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div
      className={`relative ${width} ${heightClasses[height]} bg-gray-200 rounded-full overflow-hidden ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`absolute top-0 left-0 h-full ${color} rounded-full animate-pulse`}
        style={{
          width: '30%',
          animation: 'barSlide 1.5s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes barSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(250%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 