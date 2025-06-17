import React, { useState } from 'react';

interface CustomIconsRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  icon?: 'heart' | 'thumb' | 'fire' | 'diamond' | 'star';
  className?: string;
}

export const CustomIconsRating: React.FC<CustomIconsRatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  size = 'md',
  readOnly = false,
  icon = 'heart',
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

  const iconComponents = {
    heart: (
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    ),
    thumb: (
      <path d="M7 4V2a1 1 0 011-1h2a1 1 0 011 1v2h3a1 1 0 011 1v2a1 1 0 01-1 1h-3v8a1 1 0 01-1 1H8a1 1 0 01-1-1V8H4a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
    ),
    fire: (
      <path d="M12.5 2c1.654 0 3 1.346 3 3 0 .5-.1.95-.25 1.4.15.45.25.95.25 1.6 0 2.76-2.24 5-5 5s-5-2.24-5-5c0-1.38.56-2.63 1.46-3.54C7.56 3.81 8.81 3.25 10.5 3.25c.69 0 1.34.14 1.94.39C12.78 2.49 13.59 2 14.5 2h-2z" />
    ),
    diamond: (
      <path d="M5 9l5-7 5 7-5 9-5-9z" />
    ),
    star: (
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    ),
  };

  const iconColors = {
    heart: { active: 'text-red-500', inactive: 'text-gray-300' },
    thumb: { active: 'text-blue-500', inactive: 'text-gray-300' },
    fire: { active: 'text-orange-500', inactive: 'text-gray-300' },
    diamond: { active: 'text-purple-500', inactive: 'text-gray-300' },
    star: { active: 'text-yellow-400', inactive: 'text-gray-300' },
  };

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

  const getIconColor = (index: number) => {
    const currentRating = hoverValue || value;
    const colors = iconColors[icon];
    return index < currentRating ? colors.active : colors.inactive;
  };

  const iconLabels = {
    heart: 'heart',
    thumb: 'thumbs up',
    fire: 'fire',
    diamond: 'diamond',
    star: 'star',
  };

  return (
    <div
      className={`flex items-center space-x-1 ${className}`}
      role="radiogroup"
      aria-label={`Rating out of ${max} ${iconLabels[icon]}s`}
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
            className={`${sizeClasses[size]} ${getIconColor(index)} ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded`}
            aria-label={`${rating} ${iconLabels[icon]}${rating !== 1 ? 's' : ''}`}
            role="radio"
            aria-checked={rating === value}
            tabIndex={readOnly ? -1 : 0}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full"
            >
              {iconComponents[icon]}
            </svg>
          </button>
        );
      })}
    </div>
  );
}; 