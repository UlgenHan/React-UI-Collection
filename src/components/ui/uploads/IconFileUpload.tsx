import React from 'react';

interface IconFileUploadProps {
  onChange?: (files: FileList | null) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const IconFileUpload: React.FC<IconFileUploadProps> = ({
  onChange,
  label,
  accept,
  multiple = false,
  disabled = false,
  required = false,
  helperText,
  iconPosition = 'left',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.files);
  };

  const UploadIcon = () => (
    <svg 
      className="w-5 h-5 text-gray-400" 
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
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UploadIcon />
          </div>
        )}
        
        <input
          type="file"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          className={`w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
            iconPosition === 'left' ? 'pl-10 pr-3' : 'pl-3 pr-10'
          }`}
          aria-label={label || 'Upload file'}
        />
        
        {iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <UploadIcon />
          </div>
        )}
      </div>
      
      {helperText && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}; 