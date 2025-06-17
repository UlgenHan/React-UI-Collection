import React from 'react';

interface TextWithSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const TextWithSpinner: React.FC<TextWithSpinnerProps> = ({
  text = 'Loading...',
  size = 'md',
  color = 'text-blue-600',
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      text: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      spinner: 'w-5 h-5',
      text: 'text-base',
      gap: 'gap-3',
    },
    lg: {
      spinner: 'w-6 h-6',
      text: 'text-lg',
      gap: 'gap-4',
    },
  };

  return (
    <div
      className={`flex items-center ${sizeClasses[size].gap} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-transparent ${sizeClasses[size].spinner} ${color}`}
      />
      <span className={`${sizeClasses[size].text} font-medium text-gray-700`}>
        {text}
      </span>
    </div>
  );
}; 