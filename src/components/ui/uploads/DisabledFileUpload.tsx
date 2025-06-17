import React from 'react';

interface DisabledFileUploadProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  reason?: string;
  className?: string;
}

export const DisabledFileUpload: React.FC<DisabledFileUploadProps> = ({
  label = 'File Upload',
  placeholder = 'File upload not available',
  helperText,
  reason = 'This field is currently disabled',
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
        </div>
        
        <input
          type="file"
          disabled={true}
          readOnly
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-gray-400 cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-400 file:cursor-not-allowed"
          aria-label={label || 'Disabled file upload'}
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
      
      {/* Reason for being disabled */}
      {reason && (
        <div className="mt-2 flex items-center text-sm text-gray-400">
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
          {reason}
        </div>
      )}
      
      {/* Helper text */}
      {helperText && (
        <p className="mt-2 text-sm text-gray-400">
          {helperText}
        </p>
      )}
      
      {/* Visual disabled state indicator */}
      <div className="mt-3 flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
        <div className="text-center">
          <svg 
            className="mx-auto w-8 h-8 text-gray-300 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
          <p className="text-sm text-gray-400 font-medium">Upload Disabled</p>
          <p className="text-xs text-gray-300 mt-1">File upload functionality is currently unavailable</p>
        </div>
      </div>
    </div>
  );
}; 