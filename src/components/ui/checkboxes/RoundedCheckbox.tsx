import React from 'react';

interface RoundedCheckboxProps {
  label?: string;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean, value?: string) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RoundedCheckbox({
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
  size = 'md'
}: RoundedCheckboxProps) {
  const checkboxId = id || `rounded-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, value);
    }
  };

  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          className={`
            ${sizeClasses[size]} text-blue-600 bg-white border-2 border-gray-300 rounded-full 
            focus:ring-blue-500 focus:ring-2 focus:ring-offset-1
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
        />
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={`
            text-sm font-medium leading-5 cursor-pointer
            ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
            ${error ? 'text-red-700' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {error && (
        <p id={`${checkboxId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 