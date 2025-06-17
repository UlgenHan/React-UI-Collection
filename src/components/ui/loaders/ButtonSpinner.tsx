import React from 'react';

interface ButtonSpinnerProps {
  size?: 'xs' | 'sm' | 'md';
  color?: string;
  className?: string;
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({
  size = 'sm',
  color = 'border-white',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border',
    md: 'w-5 h-5 border-2',
  };

  return (
    <div
      className={`animate-spin rounded-full border-gray-300 border-opacity-30 border-t-transparent ${sizeClasses[size]} ${color} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 