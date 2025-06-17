import React from 'react';

interface IconRadioProps {
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top';
  description?: string;
}

export default function IconRadio({
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
  icon,
  iconPosition = 'left',
  description
}: IconRadioProps) {
  const radioId = id || `icon-radio-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const getLayoutClasses = () => {
    switch (iconPosition) {
      case 'top':
        return 'flex-col items-center text-center';
      case 'right':
        return 'flex-row-reverse';
      default:
        return 'flex-row';
    }
  };

  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <div className="flex items-center h-5 mt-1">
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
            w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${radioId}-error` : undefined}
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor={radioId}
          className={`
            flex items-center cursor-pointer ${getLayoutClasses()}
            ${iconPosition === 'right' ? 'space-x-reverse space-x-2' : 'space-x-2'}
            ${iconPosition === 'top' ? 'space-y-1 space-x-0' : ''}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        >
          {icon && (
            <div
              className={`
                flex-shrink-0
                ${disabled ? 'text-gray-400' : checked ? 'text-blue-600' : 'text-gray-500'}
                ${error ? 'text-red-600' : ''}
                ${iconPosition === 'top' ? 'mb-1' : ''}
              `}
            >
              {icon}
            </div>
          )}
          <div className={iconPosition === 'top' ? 'space-y-1' : ''}>
            {label && (
              <span
                className={`
                  text-sm font-medium
                  ${disabled ? 'text-gray-400' : 'text-gray-700'}
                  ${error ? 'text-red-700' : ''}
                  ${iconPosition === 'top' ? 'block' : ''}
                `}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            )}
            {description && (
              <p
                className={`
                  text-sm
                  ${disabled ? 'text-gray-300' : 'text-gray-500'}
                  ${error ? 'text-red-600' : ''}
                  ${iconPosition === 'top' ? 'block mt-1' : 'block mt-1'}
                `}
              >
                {description}
              </p>
            )}
          </div>
        </label>
        {error && (
          <p id={`${radioId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 