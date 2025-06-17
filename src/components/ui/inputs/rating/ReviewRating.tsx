import React, { useState } from 'react';

interface ReviewRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  onSubmit?: (rating: number, review?: string) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  showReviewText?: boolean;
  reviewPlaceholder?: string;
  submitButtonText?: string;
  labels?: string[];
  error?: string;
  className?: string;
}

export const ReviewRating: React.FC<ReviewRatingProps> = ({
  value: controlledValue,
  onChange,
  onSubmit,
  max = 5,
  size = 'md',
  required = false,
  showReviewText = false,
  reviewPlaceholder = 'Write your review...',
  submitButtonText = 'Submit Review',
  labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  error,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

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

  const handleClick = (rating: number) => {
    if (controlledValue === undefined) {
      setInternalValue(rating);
    }
    onChange?.(rating);
    setValidationError('');
  };

  const handleMouseEnter = (rating: number) => {
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (required && value === 0) {
      setValidationError('Please select a rating');
      return;
    }

    if (showReviewText && required && !reviewText.trim()) {
      setValidationError('Please write a review');
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    try {
      await onSubmit?.(value, showReviewText ? reviewText : undefined);
    } catch (err) {
      setValidationError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStarColor = (index: number) => {
    const currentRating = hoverValue || value;
    return index < currentRating ? 'text-yellow-400' : 'text-gray-300';
  };

  const getCurrentLabel = () => {
    const currentRating = hoverValue || value;
    if (currentRating > 0 && currentRating <= labels.length) {
      return labels[currentRating - 1];
    }
    return '';
  };

  const displayError = error || validationError;

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <div
          className="flex items-center space-x-1"
          role="radiogroup"
          aria-label={`Rating out of ${max} stars`}
          aria-required={required}
          aria-invalid={!!displayError}
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
                className={`${sizeClasses[size]} ${getStarColor(index)} cursor-pointer hover:scale-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded`}
                aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
                role="radio"
                aria-checked={rating === value}
                tabIndex={0}
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
        
        {getCurrentLabel() && (
          <div className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>
            {getCurrentLabel()}
          </div>
        )}
      </div>

      {showReviewText && (
        <div className="space-y-2">
          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">
            Review {required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder={reviewPlaceholder}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-describedby={displayError ? 'review-error' : undefined}
          />
        </div>
      )}

      {displayError && (
        <div id="review-error" className="text-red-600 text-sm" role="alert">
          {displayError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : submitButtonText}
      </button>
    </form>
  );
}; 