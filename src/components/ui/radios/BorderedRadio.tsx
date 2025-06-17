import React from 'react';

interface BorderedRadioProps {
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
  description?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
}

export default function BorderedRadio({
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
  description,
  borderStyle = 'solid'
}: BorderedRadioProps) {
  const radioId = id || `bordered-radio-${Math.random().toString(36).substr(2, 9)}`;

  const borderClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          p-4 border-2 rounded-lg transition-all duration-200 ${borderClasses[borderStyle]}
          ${checked 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 bg-white hover:border-gray-300'
          }
          ${disabled ? 'opacity-50 bg-gray-50' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <div className="flex items-start space-x-3">
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
                w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${error ? 'border-red-500 focus:ring-red-500' : ''}
              `}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${radioId}-error` : undefined}
            />
          </div>
          <div className="flex-1">
            {label && (
              <label
                htmlFor={radioId}
                className={`
                  block text-sm font-medium leading-5 cursor-pointer
                  ${disabled ? 'text-gray-400 cursor-not-allowed' : checked ? 'text-blue-700' : 'text-gray-700'}
                  ${error ? 'text-red-700' : ''}
                `}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            {description && (
              <p
                className={`
                  mt-1 text-sm leading-4
                  ${disabled ? 'text-gray-300' : checked ? 'text-blue-600' : 'text-gray-500'}
                  ${error ? 'text-red-600' : ''}
                `}
              >
                {description}
              </p>
            )}
          </div>
          {checked && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      {error && (
        <p id={`${radioId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 