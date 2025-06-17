import React, { useState } from 'react';

interface ErrorFileUploadProps {
  onChange?: (files: FileList | null) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  allowedTypes?: string[];
  className?: string;
}

export const ErrorFileUpload: React.FC<ErrorFileUploadProps> = ({
  onChange,
  label = 'Upload files',
  accept,
  multiple = false,
  disabled = false,
  required = false,
  maxSize = 5,
  maxFiles = 5,
  allowedTypes = [],
  className = '',
}) => {
  const [error, setError] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const validateFiles = (fileList: FileList): string | null => {
    const filesArray = Array.from(fileList);
    
    // Check file count
    if (multiple && filesArray.length > maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    
    for (const file of filesArray) {
      // Check file size
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        return `File "${file.name}" exceeds ${maxSize}MB limit`;
      }
      
      // Check file type
      if (allowedTypes.length > 0) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !allowedTypes.includes(fileExtension)) {
          return `File type ".${fileExtension}" not allowed. Allowed: ${allowedTypes.join(', ')}`;
        }
      }
    }
    
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('');
      setFiles([]);
      onChange?.(null);
      return;
    }

    const validationError = validateFiles(selectedFiles);
    
    if (validationError) {
      setError(validationError);
      setFiles([]);
      onChange?.(null);
      return;
    }

    setError('');
    setFiles(Array.from(selectedFiles));
    onChange?.(selectedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setError('');
    
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    onChange?.(dataTransfer.files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasError = error !== '';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`w-5 h-5 ${hasError ? 'text-red-400' : 'text-gray-400'}`} 
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
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          className={`w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium ${
            hasError
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 file:bg-red-50 file:text-red-700 hover:file:bg-red-100'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          }`}
          aria-label={label}
          aria-invalid={hasError}
          aria-describedby={hasError ? 'file-error' : undefined}
        />
        
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {hasError && (
        <div id="file-error" className="mt-2 flex items-center text-sm text-red-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      
      {/* Validation requirements */}
      <div className="mt-2 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          {maxSize && <span>Max size: {maxSize}MB</span>}
          {multiple && maxFiles && <span>• Max files: {maxFiles}</span>}
          {allowedTypes.length > 0 && <span>• Types: {allowedTypes.join(', ')}</span>}
        </div>
      </div>

      {/* Selected files */}
      {files.length > 0 && !hasError && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 