import React, { useState } from 'react';

interface HalfStarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  allowHalf?: boolean;
  className?: string;
}

export const HalfStarRating: React.FC<HalfStarRatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  size = 'md',
  readOnly = false,
  allowHalf = true,
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
    
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
    if (readOnly) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const isLeftHalf = x < width / 2;
    
    const rating = allowHalf && isLeftHalf ? starIndex + 0.5 : starIndex + 1;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, starIndex: number) => {
    if (readOnly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(starIndex + 1);
    }
  };

  const getStarFill = (starIndex: number) => {
    const currentRating = hoverValue || value;
    const starValue = starIndex + 1;
    
    if (currentRating >= starValue) {
      return 'full';
    } else if (currentRating >= starValue - 0.5) {
      return 'half';
    }
    return 'empty';
  };

  const StarIcon: React.FC<{ fill: 'full' | 'half' | 'empty'; index: number }> = ({ fill, index }) => {
    const starId = `star-${index}`;
    
    return (
      <div className="relative">
        <svg
          fill="none"
          viewBox="0 0 20 20"
          className={`${sizeClasses[size]} text-gray-300`}
        >
          <defs>
            <linearGradient id={`${starId}-gradient`}>
              <stop offset="50%" stopColor="currentColor" className="text-yellow-400" />
              <stop offset="50%" stopColor="currentColor" className="text-gray-300" />
            </linearGradient>
          </defs>
          <path
            fill={
              fill === 'full' 
                ? 'currentColor' 
                : fill === 'half' 
                  ? `url(#${starId}-gradient)` 
                  : 'currentColor'
            }
            className={fill === 'full' ? 'text-yellow-400' : 'text-gray-300'}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`flex items-center space-x-1 ${className}`}
      role="radiogroup"
      aria-label={`Rating out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => {
        const fill = getStarFill(index);
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index + 1)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={readOnly}
            className={`${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded`}
            aria-label={`${index + 1} star${index !== 0 ? 's' : ''}`}
            role="radio"
            aria-checked={Math.floor(value) === index + 1}
            tabIndex={readOnly ? -1 : 0}
          >
            <StarIcon fill={fill} index={index} />
          </button>
        );
      })}
    </div>
  );
}; 