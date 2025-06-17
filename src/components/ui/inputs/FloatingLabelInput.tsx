import React, { useState } from 'react';

interface FloatingLabelInputProps {
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
}

export default function FloatingLabelInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  className = '',
  required = false,
  id
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `floating-input-${Math.random().toString(36).substr(2, 9)}`;
  
  const hasValue = value && value.length > 0;
  const shouldFloat = focused || hasValue;

  return (
    <div className={`relative w-full ${className}`}>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={shouldFloat ? placeholder : ''}
        disabled={disabled}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full px-3 pt-6 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          transition-all duration-200
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {label && (
        <label
          htmlFor={inputId}
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none
            ${shouldFloat 
              ? 'top-1 text-xs text-blue-600 font-medium' 
              : 'top-3 text-base text-gray-500'
            }
            ${error && shouldFloat ? 'text-red-600' : ''}
            ${disabled ? 'text-gray-400' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 