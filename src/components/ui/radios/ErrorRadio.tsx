import React from 'react';

interface ErrorRadioProps {
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  error: string;
  id?: string;
  className?: string;
  required?: boolean;
  showErrorIcon?: boolean;
}

export default function ErrorRadio({
  label,
  value,
  checked = false,
  onChange,
  disabled = false,
  name,
  error,
  id,
  className = '',
  required = false,
  showErrorIcon = true
}: ErrorRadioProps) {
  const radioId = id || `error-radio-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-start space-x-2">
        <div className="flex items-center h-5">
          <input
            id={radioId}
            type="radio"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            name={name}
            value={value}
            required={required}
            className={`
              w-4 h-4 text-red-600 bg-red-50 border-2 border-red-500 
              focus:ring-red-500 focus:ring-2 focus:ring-offset-1
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            `}
            aria-invalid="true"
            aria-describedby={`${radioId}-error`}
          />
        </div>
        {label && (
          <div className="flex-1">
            <label
              htmlFor={radioId}
              className={`
                text-sm font-medium leading-5 cursor-pointer text-red-700
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-start">
        {showErrorIcon && (
          <div className="flex-shrink-0 mr-2">
            <svg
              className="w-4 h-4 text-red-500 mt-0.5"
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
        <p id={`${radioId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      </div>
    </div>
  );
} 