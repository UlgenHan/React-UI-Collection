import React from 'react';

interface DisabledCheckboxProps {
  label?: string;
  value?: string;
  checked?: boolean;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  description?: string;
  reason?: string;
}

export default function DisabledCheckbox({
  label,
  value,
  checked = false,
  name,
  id,
  className = '',
  required = false,
  description,
  reason
}: DisabledCheckboxProps) {
  const checkboxId = id || `disabled-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${className}`}>
      <div className="flex items-start space-x-2">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            disabled={true}
            name={name}
            value={value}
            required={required}
            className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-200 rounded cursor-not-allowed opacity-50"
            aria-disabled="true"
            aria-describedby={
              reason 
                ? `${checkboxId}-reason` 
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
              className="text-sm font-medium leading-5 text-gray-400 cursor-not-allowed"
            >
              {label}
              {required && <span className="text-gray-400 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p
              id={`${checkboxId}-description`}
              className="mt-1 text-sm text-gray-300"
            >
              {description}
            </p>
          )}
          {reason && (
            <p
              id={`${checkboxId}-reason`}
              className="mt-1 text-xs text-gray-400 italic"
            >
              {reason}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 