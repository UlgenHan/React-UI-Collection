import React from 'react';

interface CardCheckboxProps {
  label?: string;
  description?: string;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean, value?: string) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export default function CardCheckbox({
  label,
  description,
  value,
  checked = false,
  onChange,
  disabled = false,
  name,
  error,
  id,
  className = '',
  required = false,
  icon
}: CardCheckboxProps) {
  const checkboxId = id || `card-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked, value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={handleChange}
        className={`
          relative block w-full p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
          ${checked 
            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-25' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
            e.preventDefault();
            handleChange();
          }
        }}
        aria-pressed={checked}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${checkboxId}-error` : undefined}
      >
        <div className="flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            disabled={disabled}
            name={name}
            value={value}
            required={required}
            className={`
              w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2
              disabled:opacity-50
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
            `}
            tabIndex={-1}
          />
          <div className="ml-3 flex-1">
            <div className="flex items-center">
              {icon && (
                <div className={`mr-2 ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                  {icon}
                </div>
              )}
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={`
                    text-sm font-medium cursor-pointer
                    ${disabled ? 'text-gray-400' : checked ? 'text-blue-700' : 'text-gray-700'}
                    ${error ? 'text-red-700' : ''}
                  `}
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
            </div>
            {description && (
              <p
                className={`
                  mt-1 text-sm
                  ${disabled ? 'text-gray-300' : checked ? 'text-blue-600' : 'text-gray-500'}
                  ${error ? 'text-red-600' : ''}
                `}
              >
                {description}
              </p>
            )}
          </div>
          {checked && (
            <div className="ml-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      {error && (
        <p id={`${checkboxId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 