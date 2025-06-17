import React from 'react';

interface InputWithIconProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  required?: boolean;
  id?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function InputWithIcon({
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
  icon,
  iconPosition = 'left'
}: InputWithIconProps) {
  const inputId = id || `icon-input-${Math.random().toString(36).substr(2, 9)}`;

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
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`}>
              {icon}
            </div>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            transition-colors duration-200
            ${icon && iconPosition === 'left' ? 'pl-10 pr-3' : ''}
            ${icon && iconPosition === 'right' ? 'pl-3 pr-10' : ''}
            ${!icon ? 'px-3' : ''}
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 