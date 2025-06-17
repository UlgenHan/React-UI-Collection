import React from 'react';

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface InlineRadioProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
  title?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export default function InlineRadio({
  options,
  value,
  onChange,
  disabled = false,
  name,
  error,
  id,
  className = '',
  required = false,
  title,
  gap = 'md'
}: InlineRadioProps) {
  const groupId = id || `inline-radio-${Math.random().toString(36).substr(2, 9)}`;

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const handleChange = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <fieldset className={`${className}`}>
      {title && (
        <legend className={`text-base font-medium mb-3 ${error ? 'text-red-700' : 'text-gray-900'}`}>
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      <div 
        className={`flex flex-wrap ${gapClasses[gap]}`}
        role="radiogroup"
        aria-labelledby={title ? `${groupId}-title` : undefined}
        aria-describedby={error ? `${groupId}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      >
        {options.map((option, index) => {
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          const radioId = `${groupId}-${index}`;

          return (
            <div key={option.value} className="flex items-center">
              <input
                id={radioId}
                type="radio"
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                name={name}
                value={option.value}
                required={required}
                className={`
                  w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${error ? 'border-red-500 focus:ring-red-500' : ''}
                `}
              />
              <label
                htmlFor={radioId}
                className={`
                  ml-2 text-sm font-medium cursor-pointer whitespace-nowrap
                  ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
                  ${error ? 'text-red-700' : ''}
                `}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <p id={`${groupId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
} 