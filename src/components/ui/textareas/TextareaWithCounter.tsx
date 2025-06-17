import React from 'react';

interface TextareaWithCounterProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  maxLength?: number;
  showCounter?: boolean;
  counterPosition?: 'bottom-right' | 'bottom-left' | 'top-right';
}

export default function TextareaWithCounter({
  label,
  placeholder,
  value = '',
  onChange,
  error,
  disabled = false,
  className = '',
  required = false,
  id,
  rows = 4,
  resize = 'vertical',
  maxLength,
  showCounter = true,
  counterPosition = 'bottom-right'
}: TextareaWithCounterProps) {
  const textareaId = id || `counter-textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = value.length;
  const isNearLimit = maxLength && currentLength > maxLength * 0.8;
  const isOverLimit = maxLength && currentLength > maxLength;

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  const counterPositionClasses = {
    'bottom-right': 'text-right',
    'bottom-left': 'text-left',
    'top-right': 'text-right'
  };

  const getCounterColor = () => {
    if (isOverLimit) return 'text-red-600';
    if (isNearLimit) return 'text-orange-600';
    return 'text-gray-500';
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {showCounter && counterPosition === 'top-right' && (
            <span className={`text-xs ${getCounterColor()}`}>
              {currentLength}{maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <textarea
          id={textareaId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            transition-colors duration-200
            ${resizeClasses[resize]}
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
            ${isOverLimit ? 'border-red-400' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${textareaId}-error` 
              : showCounter 
              ? `${textareaId}-counter` 
              : undefined
          }
        />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div>
          {error && (
            <p id={`${textareaId}-error`} className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        {showCounter && counterPosition !== 'top-right' && (
          <span 
            id={`${textareaId}-counter`}
            className={`text-xs ${getCounterColor()} ${counterPositionClasses[counterPosition]}`}
            aria-live="polite"
          >
            {currentLength}{maxLength && `/${maxLength}`}
            {maxLength && isOverLimit && (
              <span className="ml-1 text-red-600">
                ({currentLength - maxLength} over)
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
} 