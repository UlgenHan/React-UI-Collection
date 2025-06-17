import React from 'react';

interface DisabledTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  required?: boolean;
  id?: string;
  rows?: number;
  helperText?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export default function DisabledTextarea({
  label,
  placeholder,
  value,
  className = '',
  required = false,
  id,
  rows = 4,
  helperText,
  resize = 'none'
}: DisabledTextareaProps) {
  const textareaId = id || `disabled-textarea-${Math.random().toString(36).substr(2, 9)}`;

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          {label}
          {required && <span className="text-gray-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        placeholder={placeholder}
        disabled={true}
        required={required}
        rows={rows}
        readOnly
        className={`
          w-full px-3 py-2 border border-gray-200 rounded-md text-gray-400 placeholder-gray-300
          bg-gray-50 cursor-not-allowed select-none
          focus:outline-none
          transition-colors duration-200
          ${resizeClasses[resize]}
        `}
        aria-disabled="true"
        aria-describedby={helperText ? `${textareaId}-helper` : undefined}
      />
      {helperText && (
        <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
} 