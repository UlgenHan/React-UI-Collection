import React from 'react';

interface RingDashLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const RingDashLoader: React.FC<RingDashLoaderProps> = ({
  size = 'md',
  color = 'stroke-blue-600',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const strokeWidthClasses = {
    sm: '2',
    md: '2',
    lg: '3',
    xl: '4',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`} role="status" aria-label="Loading">
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth={strokeWidthClasses[size]}
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          strokeLinecap="round"
          className={`${color} opacity-25`}
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth={strokeWidthClasses[size]}
          strokeDasharray="31.416"
          strokeDashoffset="15.708"
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 