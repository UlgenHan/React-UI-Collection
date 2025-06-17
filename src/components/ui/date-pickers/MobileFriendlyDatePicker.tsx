import React from 'react';

interface MobileFriendlyDatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const MobileFriendlyDatePicker: React.FC<MobileFriendlyDatePickerProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-base font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="w-6 h-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" 
            />
          </svg>
        </div>
        
        <input
          type="date"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
          style={{ 
            minHeight: '56px',
            fontSize: '16px' // Prevents zoom on iOS
          }}
          aria-label={label || 'Select date'}
        />
        
        {/* Custom display overlay for better mobile experience */}
        {value && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {formatDisplayDate(value)}
            </span>
          </div>
        )}
      </div>
      
      {/* Helper text for mobile users */}
      <p className="mt-2 text-sm text-gray-500">
        Tap to open date picker
      </p>
    </div>
  );
}; 