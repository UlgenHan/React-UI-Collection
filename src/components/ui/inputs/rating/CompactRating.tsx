import React, { useState } from 'react';

interface CompactRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  showValue?: boolean;
  inline?: boolean;
  className?: string;
}

export const CompactRating: React.FC<CompactRatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  readOnly = false,
  showValue = false,
  inline = true,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

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
    return index < currentRating ? 'text-yellow-400' : 'text-gray-300';
  };

  const displayValue = hoverValue || value;

  return (
    <div
      className={`${inline ? 'inline-flex' : 'flex'} items-center ${className}`}
      role="radiogroup"
      aria-label={`Rating out of ${max} stars`}
    >
      <div className="flex items-center">
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
              className={`w-3 h-3 ${getStarColor(index)} ${
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              } transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 rounded`}
              aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
              role="radio"
              aria-checked={rating === value}
              tabIndex={readOnly ? -1 : 0}
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
      </div>
      {showValue && (
        <span className="ml-1 text-xs text-gray-600 font-medium">
          ({displayValue})
        </span>
      )}
    </div>
  );
}; 