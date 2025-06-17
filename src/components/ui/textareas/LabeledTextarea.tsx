import React from 'react';

interface LabeledTextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  rows?: number;
  helperText?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export default function LabeledTextarea({
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
  helperText,
  resize = 'vertical'
}: LabeledTextareaProps) {
  const textareaId = id || `labeled-textarea-${Math.random().toString(36).substr(2, 9)}`;

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="text-sm text-gray-500 mb-1">
          {helperText}
        </p>
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
          w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          transition-all duration-200
          ${resizeClasses[resize]}
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
          ${disabled ? 'shadow-none' : 'shadow-sm focus:shadow-md'}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error 
            ? `${textareaId}-error` 
            : helperText 
            ? `${textareaId}-helper` 
            : undefined
        }
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 