import React from 'react';

interface CustomIconCheckboxProps {
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
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  iconType?: 'check' | 'cross' | 'star' | 'heart';
}

export default function CustomIconCheckbox({
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
  checkedIcon,
  uncheckedIcon,
  iconType = 'check'
}: CustomIconCheckboxProps) {
  const checkboxId = id || `custom-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked, value);
    }
  };

  const getIcon = () => {
    if (checkedIcon && checked) return checkedIcon;
    if (uncheckedIcon && !checked) return uncheckedIcon;

    if (!checked) return null;

    switch (iconType) {
      case 'check':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'cross':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <div className="flex items-center h-5">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-labelledby={label ? `${checkboxId}-label` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          onClick={handleChange}
          disabled={disabled}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${checked 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-white border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
        >
          {getIcon()}
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
      </div>
      {label && (
        <label
          id={`${checkboxId}-label`}
          onClick={handleChange}
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