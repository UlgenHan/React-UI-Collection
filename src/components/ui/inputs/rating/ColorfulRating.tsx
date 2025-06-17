import React, { useState } from 'react';

interface ColorfulRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  colorScheme?: 'default' | 'rainbow' | 'gradient' | 'warm' | 'cool';
  className?: string;
}

export const ColorfulRating: React.FC<ColorfulRatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  size = 'md',
  readOnly = false,
  colorScheme = 'default',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorSchemes = {
    default: ['text-yellow-400', 'text-yellow-400', 'text-yellow-400', 'text-yellow-400', 'text-yellow-400'],
    rainbow: ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-blue-500'],
    gradient: ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-blue-400'],
    warm: ['text-red-500', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-yellow-300'],
    cool: ['text-blue-500', 'text-blue-400', 'text-teal-400', 'text-green-400', 'text-green-300'],
  };

  const colors = colorSchemes[colorScheme];

  const handleClick = (rating: number) => {
    if (readOnly) return;
    
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (readOnly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  const getStarColor = (index: number) => {
    const currentRating = hoverValue || value;
    const rating = index + 1;
    
    if (rating <= currentRating) {
      return colors[index] || colors[colors.length - 1];
    }
    return 'text-gray-300';
  };

  return (
    <div
      className={`flex items-center space-x-1 ${className}`}
      role="radiogroup"
      aria-label={`Rating out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => handleKeyDown(e, rating)}
            disabled={readOnly}
            className={`${sizeClasses[size]} ${getStarColor(index)} ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded`}
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
            role="radio"
            aria-checked={rating === value}
            tabIndex={readOnly ? -1 : 0}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full drop-shadow-sm"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}; 