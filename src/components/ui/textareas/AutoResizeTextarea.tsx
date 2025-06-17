import React, { useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  minRows?: number;
  maxRows?: number;
}

export default function AutoResizeTextarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  required = false,
  id,
  minRows = 3,
  maxRows = 10
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = id || `auto-resize-textarea-${Math.random().toString(36).substr(2, 9)}`;

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const paddingTop = parseInt(getComputedStyle(textarea).paddingTop);
    const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom);
    
    const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;
    
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    adjustHeight();
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={textareaId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={minRows}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          transition-colors duration-200 overflow-hidden
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
        `}
        style={{ minHeight: `${minRows * 1.5}rem` }}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 