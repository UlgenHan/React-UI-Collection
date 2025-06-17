import React, { useState } from 'react';

interface FloatingLabelDatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const FloatingLabelDatePicker: React.FC<FloatingLabelDatePickerProps> = ({
  value = '',
  onChange,
  label = 'Select Date',
  disabled = false,
  required = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFloating = isFocused || value;

  return (
    <div className={`w-full relative ${className}`}>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className="w-full px-3 pt-6 pb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed peer"
          aria-label={label}
        />
        <label
          className={`absolute left-3 text-gray-500 transition-all duration-200 pointer-events-none ${
            isFloating
              ? 'top-1 text-xs text-blue-500'
              : 'top-1/2 transform -translate-y-1/2 text-base'
          } ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    </div>
  );
}; 