import React from 'react';

interface DisabledRadioProps {
  label?: string;
  value: string;
  checked?: boolean;
  name?: string;
  id?: string;
  className?: string;
  required?: boolean;
  description?: string;
  reason?: string;
}

export default function DisabledRadio({
  label,
  value,
  checked = false,
  name,
  id,
  className = '',
  required = false,
  description,
  reason
}: DisabledRadioProps) {
  const radioId = id || `disabled-radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${className}`}>
      <div className="flex items-start space-x-2">
        <div className="flex items-center h-5">
          <input
            id={radioId}
            type="radio"
            checked={checked}
            disabled={true}
            name={name}
            value={value}
            required={required}
            className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
            aria-disabled="true"
            aria-describedby={
              reason 
                ? `${radioId}-reason` 
                : description 
                ? `${radioId}-description` 
                : undefined
            }
          />
        </div>
        <div className="flex-1">
          {label && (
            <label
              htmlFor={radioId}
              className="text-sm font-medium leading-5 text-gray-400 cursor-not-allowed"
            >
              {label}
              {required && <span className="text-gray-400 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p
              id={`${radioId}-description`}
              className="mt-1 text-sm text-gray-300"
            >
              {description}
            </p>
          )}
          {reason && (
            <p
              id={`${radioId}-reason`}
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