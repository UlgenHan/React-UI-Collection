import React from 'react';

interface ColoredRadioProps {
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
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'indigo';
}

export default function ColoredRadio({
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
}: ColoredRadioProps) {
  const radioId = id || `colored-radio-${Math.random().toString(36).substr(2, 9)}`;

  const colorClasses = {
    blue: {
      radio: 'text-blue-600 border-blue-300 focus:ring-blue-500',
      label: 'text-blue-700'
    },
    green: {
      radio: 'text-green-600 border-green-300 focus:ring-green-500',
      label: 'text-green-700'
    },
    red: {
      radio: 'text-red-600 border-red-300 focus:ring-red-500',
      label: 'text-red-700'
    },
    purple: {
      radio: 'text-purple-600 border-purple-300 focus:ring-purple-500',
      label: 'text-purple-700'
    },
    yellow: {
      radio: 'text-yellow-600 border-yellow-300 focus:ring-yellow-500',
      label: 'text-yellow-700'
    },
    indigo: {
      radio: 'text-indigo-600 border-indigo-300 focus:ring-indigo-500',
      label: 'text-indigo-700'
    }
  };

  const currentColor = colorClasses[color];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex items-start space-x-2 ${className}`}>
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
            w-4 h-4 bg-white border-2 focus:ring-2 transition-all duration-200
            ${currentColor.radio}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${radioId}-error` : undefined}
        />
      </div>
      {label && (
        <label
          htmlFor={radioId}
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
        <p id={`${radioId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 