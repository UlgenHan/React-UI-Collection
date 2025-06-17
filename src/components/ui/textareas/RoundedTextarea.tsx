import React from 'react';

interface RoundedTextareaProps {
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
  roundness?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function RoundedTextarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  required = false,
  id,
  rows = 4,
  resize = 'vertical',
  roundness = 'lg'
}: RoundedTextareaProps) {
  const textareaId = id || `rounded-textarea-${Math.random().toString(36).substr(2, 9)}`;

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  const roundnessClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-3xl'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-3 border-2 border-gray-200 text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          transition-all duration-300 ease-in-out
          hover:border-gray-300
          ${roundnessClasses[roundness]}
          ${resizeClasses[resize]}
          ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-600 ml-4" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 