import React from 'react';

interface ThemedTextareaProps {
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
  theme?: 'light' | 'dark';
}

export default function ThemedTextarea({
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
  theme = 'light'
}: ThemedTextareaProps) {
  const textareaId = id || `themed-textarea-${Math.random().toString(36).substr(2, 9)}`;

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  const themeClasses = {
    light: {
      container: 'bg-white',
      label: 'text-gray-700',
      textarea: `
        bg-white border-gray-300 text-gray-900 placeholder-gray-400
        focus:ring-blue-500 focus:border-blue-500
        disabled:bg-gray-50 disabled:text-gray-400
      `,
      error: 'text-red-600',
      errorBorder: 'border-red-300 focus:ring-red-500'
    },
    dark: {
      container: 'bg-gray-900',
      label: 'text-gray-200',
      textarea: `
        bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400
        focus:ring-blue-400 focus:border-blue-400
        disabled:bg-gray-700 disabled:text-gray-500
      `,
      error: 'text-red-400',
      errorBorder: 'border-red-400 focus:ring-red-400'
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`w-full ${currentTheme.container} ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm font-medium ${currentTheme.label} mb-1`}
        >
          {label}
          {required && <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-500'} ml-1`}>*</span>}
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
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2
          disabled:cursor-not-allowed
          transition-colors duration-200
          ${resizeClasses[resize]}
          ${error ? currentTheme.errorBorder : currentTheme.textarea}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && (
        <p id={`${textareaId}-error`} className={`mt-1 text-sm ${currentTheme.error}`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 