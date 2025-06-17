import React, { useState } from 'react';

interface ClickableStarsRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  onStarClick?: (starIndex: number, currentValue: number) => void;
  onStarHover?: (starIndex: number) => void;
  onStarLeave?: () => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  allowClear?: boolean;
  className?: string;
}

export const ClickableStarsRating: React.FC<ClickableStarsRatingProps> = ({
  value: controlledValue,
  onChange,
  onStarClick,
  onStarHover,
  onStarLeave,
  max = 5,
  size = 'md',
  readOnly = false,
  allowClear = true,
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

  const handleClick = (rating: number) => {
    if (readOnly) return;
    
    // Allow clearing the rating if clicking the same star and allowClear is true
    const newValue = allowClear && value === rating ? 0 : rating;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    // Call custom callbacks
    onStarClick?.(rating - 1, newValue);
    onChange?.(newValue);
  };

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverValue(rating);
      onStarHover?.(rating - 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
      onStarLeave?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (readOnly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const nextRating = Math.min(rating + 1, max);
      handleClick(nextRating);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prevRating = Math.max(rating - 1, allowClear ? 0 : 1);
      if (controlledValue === undefined) {
        setInternalValue(prevRating);
      }
      onChange?.(prevRating);
    }
  };

  const getStarColor = (index: number) => {
    const currentRating = hoverValue || value;
    return index < currentRating ? 'text-yellow-400' : 'text-gray-300';
  };

  const getStarOpacity = (index: number) => {
    const currentRating = hoverValue || value;
    if (hoverValue > 0) {
      return index < hoverValue ? 'opacity-100' : 'opacity-50';
    }
    return 'opacity-100';
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
            className={`${sizeClasses[size]} ${getStarColor(index)} ${getStarOpacity(index)} ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded`}
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}${allowClear && value === rating ? ' (click to clear)' : ''}`}
            role="radio"
            aria-checked={rating === value}
            tabIndex={readOnly ? -1 : 0}
            data-star-index={index}
            data-rating={rating}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
      {allowClear && value > 0 && (
        <button
          type="button"
          onClick={() => handleClick(0)}
          className="ml-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
          aria-label="Clear rating"
        >
          Clear
        </button>
      )}
    </div>
  );
}; 