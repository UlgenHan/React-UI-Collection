import React from 'react';

interface CheckboxWithDescriptionProps {
  label?: string;
  description?: string;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean, value?: string) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
}

export default function CheckboxWithDescription({
  label,
  description,
  value,
  checked = false,
  onChange,
  disabled = false,
  name,
  error,
  id,
  className = '',
  required = false
}: CheckboxWithDescriptionProps) {
  const checkboxId = id || `desc-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, value);
    }
  };

  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div className="flex items-center h-5 mt-1">
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
            w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${checkboxId}-error` 
              : description 
              ? `${checkboxId}-description` 
              : undefined
          }
        />
      </div>
      <div className="flex-1">
        {label && (
          <label
            htmlFor={checkboxId}
            className={`
              block text-sm font-medium leading-5 cursor-pointer
              ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
              ${error ? 'text-red-700' : ''}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {description && (
          <p
            id={`${checkboxId}-description`}
            className={`
              mt-1 text-sm leading-4
              ${disabled ? 'text-gray-300' : 'text-gray-500'}
              ${error ? 'text-red-600' : ''}
            `}
          >
            {description}
          </p>
        )}
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
} 