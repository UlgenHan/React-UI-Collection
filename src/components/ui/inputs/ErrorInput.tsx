import React from 'react';

interface ErrorInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  required?: boolean;
  id?: string;
  showErrorIcon?: boolean;
}

export default function ErrorInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  className = '',
  required = false,
  id,
  showErrorIcon = true
}: ErrorInputProps) {
  const inputId = id || `error-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-3 py-2 border-2 border-red-300 rounded-md text-gray-900 placeholder-gray-400 bg-red-50
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-red-200
            transition-colors duration-200
            ${showErrorIcon ? 'pr-10' : ''}
          `}
          aria-invalid="true"
          aria-describedby={`${inputId}-error`}
        />
        {showErrorIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-1 flex items-center">
        <svg
          className="w-4 h-4 text-red-500 mr-1 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      </div>
    </div>
  );
} 