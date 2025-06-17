import React from 'react';

interface ToggleCheckboxProps {
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
  color?: 'blue' | 'green' | 'purple' | 'red';
}

export default function ToggleCheckbox({
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
  size = 'md',
  color = 'blue'
}: ToggleCheckboxProps) {
  const checkboxId = id || `toggle-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const sizeClasses = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600'
  };

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked, value);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${checkboxId}-label` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${checkboxId}-error` : undefined}
        onClick={handleChange}
        disabled={disabled}
        className={`
          ${sizeClasses[size].track} relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? colorClasses[color] : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'focus:ring-red-500' : ''}
        `}
      >
        <span
          className={`
            ${sizeClasses[size].thumb} pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 
            transition duration-200 ease-in-out
            ${checked ? sizeClasses[size].translate : 'translate-x-0'}
          `}
        />
      </button>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        name={name}
        value={value}
        required={required}
        className="sr-only"
        tabIndex={-1}
      />
      {label && (
        <label
          id={`${checkboxId}-label`}
          onClick={handleChange}
          className={`
            text-sm font-medium cursor-pointer
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