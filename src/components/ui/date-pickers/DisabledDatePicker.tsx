import React from 'react';

interface DisabledDatePickerProps {
  value?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  className?: string;
}

export const DisabledDatePicker: React.FC<DisabledDatePickerProps> = ({
  value = '',
  label,
  placeholder = 'Date not available',
  helperText = 'This field is currently disabled',
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-300" 
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
          placeholder={placeholder}
          disabled={true}
          readOnly
          className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-gray-400 cursor-not-allowed"
          aria-label={label || 'Disabled date field'}
        />
        
        {/* Disabled indicator */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" 
            />
          </svg>
        </div>
      </div>
      
      {helperText && (
        <p className="mt-2 text-sm text-gray-400 flex items-center">
          <svg 
            className="w-4 h-4 mr-1 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          {helperText}
        </p>
      )}
    </div>
  );
}; 