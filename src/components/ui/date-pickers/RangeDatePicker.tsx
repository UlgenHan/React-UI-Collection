import React from 'react';

interface RangeDatePickerProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
  label,
  disabled = false,
  required = false,
  className = '',
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange?.(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange?.(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            disabled={disabled}
            required={required}
            max={endDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Start date"
          />
        </div>
        
        <div className="flex items-center justify-center py-6">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            disabled={disabled}
            required={required}
            min={startDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="End date"
          />
        </div>
      </div>
      
      {startDate && endDate && (
        <div className="mt-2 text-sm text-gray-600">
          Selected range: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}; 