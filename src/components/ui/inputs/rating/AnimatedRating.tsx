import React, { useState } from 'react';

interface AnimatedRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  animation?: 'bounce' | 'pulse' | 'spin' | 'scale' | 'wiggle';
  className?: string;
}

export const AnimatedRating: React.FC<AnimatedRatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  size = 'md',
  readOnly = false,
  animation = 'bounce',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState(-1);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const animationClasses = {
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    scale: 'transform scale-125',
    wiggle: 'animate-bounce',
  };

  const handleClick = (rating: number) => {
    if (readOnly) return;
    
    setAnimatingIndex(rating - 1);
    setTimeout(() => setAnimatingIndex(-1), 500);
    
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
  };

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverValue(rating);
      if (animation === 'scale') {
        setAnimatingIndex(rating - 1);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
      if (animation === 'scale') {
        setAnimatingIndex(-1);
      }
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

  const getAnimationClass = (index: number) => {
    if (animatingIndex === index) {
      return animationClasses[animation];
    }
    return '';
  };

  const getHoverClass = (index: number) => {
    if (!readOnly && hoverValue > 0 && index < hoverValue) {
      return 'transform scale-110';
    }
    return '';
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
              readOnly ? 'cursor-default' : 'cursor-pointer'
            } transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded ${getAnimationClass(index)} ${getHoverClass(index)}`}
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
            role="radio"
            aria-checked={rating === value}
            tabIndex={readOnly ? -1 : 0}
            style={{
              animationDuration: animation === 'wiggle' ? '0.5s' : undefined,
            }}
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
      
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}; 