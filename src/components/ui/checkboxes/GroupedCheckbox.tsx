import React from 'react';

interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
}

interface GroupedCheckboxProps {
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
  name?: string;
  error?: string;
  id?: string;
  className?: string;
  required?: boolean;
  title?: string;
  description?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: number;
}

export default function GroupedCheckbox({
  options,
  values = [],
  onChange,
  disabled = false,
  name,
  error,
  id,
  className = '',
  required = false,
  title,
  description,
  layout = 'vertical',
  columns = 2
}: GroupedCheckboxProps) {
  const groupId = id || `grouped-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter(value => value !== optionValue));
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'grid':
        return `grid grid-cols-1 sm:grid-cols-${columns} gap-4`;
      default:
        return 'space-y-3';
    }
  };

  return (
    <fieldset className={`${className}`}>
      {title && (
        <legend className={`text-base font-medium ${error ? 'text-red-700' : 'text-gray-900'}`}>
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      {description && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
      <div 
        className={`${title || description ? 'mt-4' : ''} ${getLayoutClasses()}`}
        role="group"
        aria-labelledby={title ? `${groupId}-title` : undefined}
        aria-describedby={error ? `${groupId}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      >
        {options.map((option, index) => {
          const isChecked = values.includes(option.value);
          const isDisabled = disabled || option.disabled;
          const checkboxId = `${groupId}-${index}`;

          return (
            <div key={option.value} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  disabled={isDisabled}
                  name={name}
                  value={option.value}
                  className={`
                    w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? 'border-red-500 focus:ring-red-500' : ''}
                  `}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={checkboxId}
                  className={`
                    font-medium cursor-pointer
                    ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
                    ${error ? 'text-red-700' : ''}
                  `}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p
                    className={`
                      ${isDisabled ? 'text-gray-300' : 'text-gray-500'}
                      ${error ? 'text-red-600' : ''}
                    `}
                  >
                    {option.description}
                  </p>
                )}
              </div>
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