import React from 'react';

interface DisabledInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  required?: boolean;
  id?: string;
  helperText?: string;
}

export default function DisabledInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  required = false,
  id,
  helperText
}: DisabledInputProps) {
  const inputId = id || `disabled-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          {label}
          {required && <span className="text-gray-400 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={true}
        required={required}
        className={`
          w-full px-3 py-2 border border-gray-200 rounded-md text-gray-400 placeholder-gray-300
          bg-gray-50 cursor-not-allowed select-none
          focus:outline-none
          transition-colors duration-200
        `}
        aria-disabled="true"
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
      />
      {helperText && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
} 