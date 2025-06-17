import React from 'react';

interface InputWithPrefixSuffixProps {
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
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
}

export default function InputWithPrefixSuffix({
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
  prefix,
  suffix
}: InputWithPrefixSuffixProps) {
  const inputId = id || `prefix-suffix-input-${Math.random().toString(36).substr(2, 9)}`;

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
      <div className={`
        relative flex items-center border border-gray-300 rounded-md overflow-hidden
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
        ${error ? 'border-red-300 focus-within:ring-red-500' : ''}
        ${disabled ? 'bg-gray-50' : 'bg-white'}
      `}>
        {prefix && (
          <div className={`
            px-3 py-2 text-sm border-r border-gray-300 flex items-center whitespace-nowrap
            ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'}
          `}>
            {prefix}
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
            flex-1 px-3 py-2 border-0 text-gray-900 placeholder-gray-400 bg-transparent
            focus:outline-none focus:ring-0
            disabled:text-gray-400 disabled:cursor-not-allowed
            min-w-0
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {suffix && (
          <div className={`
            px-3 py-2 text-sm border-l border-gray-300 flex items-center whitespace-nowrap
            ${disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'}
          `}>
            {suffix}
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