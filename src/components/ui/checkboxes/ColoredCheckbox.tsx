import React from 'react';

interface ColoredCheckboxProps {
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
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'indigo';
}

export default function ColoredCheckbox({
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
  color = 'blue'
}: ColoredCheckboxProps) {
  const checkboxId = id || `colored-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const colorClasses = {
    blue: {
      checked: 'text-blue-600 border-blue-500 bg-blue-600',
      unchecked: 'border-blue-300',
      focus: 'focus:ring-blue-500',
      label: 'text-blue-700'
    },
    green: {
      checked: 'text-green-600 border-green-500 bg-green-600',
      unchecked: 'border-green-300',
      focus: 'focus:ring-green-500',
      label: 'text-green-700'
    },
    red: {
      checked: 'text-red-600 border-red-500 bg-red-600',
      unchecked: 'border-red-300',
      focus: 'focus:ring-red-500',
      label: 'text-red-700'
    },
    purple: {
      checked: 'text-purple-600 border-purple-500 bg-purple-600',
      unchecked: 'border-purple-300',
      focus: 'focus:ring-purple-500',
      label: 'text-purple-700'
    },
    yellow: {
      checked: 'text-yellow-600 border-yellow-500 bg-yellow-600',
      unchecked: 'border-yellow-300',
      focus: 'focus:ring-yellow-500',
      label: 'text-yellow-700'
    },
    indigo: {
      checked: 'text-indigo-600 border-indigo-500 bg-indigo-600',
      unchecked: 'border-indigo-300',
      focus: 'focus:ring-indigo-500',
      label: 'text-indigo-700'
    }
  };

  const currentColor = colorClasses[color];

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
            w-4 h-4 bg-white border-2 rounded transition-all duration-200
            ${checked ? currentColor.checked : `${currentColor.unchecked} bg-white`}
            ${currentColor.focus} focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          style={{
            backgroundImage: checked 
              ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e")`
              : 'none'
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
        />
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={`
            text-sm font-medium leading-5 cursor-pointer transition-colors duration-200
            ${disabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : checked 
              ? currentColor.label 
              : 'text-gray-700 hover:text-gray-900'
            }
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