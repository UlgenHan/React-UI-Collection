import React from 'react';

interface UnderlinedInputProps {
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

export default function UnderlinedInput({
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
}: UnderlinedInputProps) {
  const inputId = id || `underlined-input-${Math.random().toString(36).substr(2, 9)}`;

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
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 placeholder-gray-400
          focus:outline-none focus:border-blue-500
          disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 