import React from 'react';

interface DateTimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  showSeconds?: boolean;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value = '',
  onChange,
  label,
  disabled = false,
  required = false,
  showSeconds = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputType = showSeconds ? 'datetime-local' : 'datetime-local';
  const step = showSeconds ? '1' : undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label={label || 'Select date and time'}
      />
    </div>
  );
}; 