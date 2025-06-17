import React from 'react';

interface ReadOnlyRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export const ReadOnlyRating: React.FC<ReadOnlyRatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const getStarColor = (index: number) => {
    return index < value ? 'text-yellow-400' : 'text-gray-300';
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div
        className="flex items-center space-x-1"
        role="img"
        aria-label={`${value} out of ${max} stars`}
      >
        {Array.from({ length: max }, (_, index) => (
          <svg
            key={index}
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`${sizeClasses[size]} ${getStarColor(index)}`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showValue && (
        <span className={`ml-2 text-gray-600 font-medium ${textSizeClasses[size]}`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}; 