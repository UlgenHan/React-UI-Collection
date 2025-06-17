import React, { useState } from 'react';

interface FileTypeRestrictedUploadProps {
  onChange?: (files: FileList | null) => void;
  label?: string;
  fileType?: 'images' | 'documents' | 'videos' | 'audio' | 'custom';
  customAccept?: string;
  customTypes?: string[];
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxSize?: number; // in MB
  className?: string;
}

export const FileTypeRestrictedUpload: React.FC<FileTypeRestrictedUploadProps> = ({
  onChange,
  label,
  fileType = 'images',
  customAccept = '',
  customTypes = [],
  multiple = false,
  disabled = false,
  required = false,
  maxSize = 10,
  className = '',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const fileTypeConfigs = {
    images: {
      accept: 'image/*',
      types: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'],
      description: 'Images',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    documents: {
      accept: '.pdf,.doc,.docx,.txt,.rtf,.odt',
      types: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
      description: 'Documents',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    videos: {
      accept: 'video/*',
      types: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
      description: 'Videos',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    audio: {
      accept: 'audio/*',
      types: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'wma'],
      description: 'Audio',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    custom: {
      accept: customAccept,
      types: customTypes,
      description: 'Custom',
      icon: (
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  };

  const config = fileTypeConfigs[fileType];
  const displayLabel = label || `Upload ${config.description}`;

  const validateFile = (file: File): string | null => {
    // Check file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSize}MB limit`;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !config.types.includes(fileExtension)) {
      return `File type ".${fileExtension}" not allowed. Allowed: ${config.types.join(', ')}`;
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (selectedFiles.length === 0) {
      setFiles([]);
      setError('');
      onChange?.(null);
      return;
    }

    // Validate each file
    for (const file of selectedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setFiles([]);
        onChange?.(null);
        return;
      }
    }

    setError('');
    setFiles(selectedFiles);
    onChange?.(e.target.files);
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {displayLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* File type indicator */}
      <div className="mb-3 flex items-center space-x-2 text-sm text-gray-600">
        {config.icon}
        <span>Accepts: {config.types.join(', ')}</span>
        {maxSize && <span>• Max: {maxSize}MB</span>}
      </div>

      <input
        type="file"
        onChange={handleChange}
        accept={config.accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium ${
          hasError
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500 file:bg-red-50 file:text-red-700 hover:file:bg-red-100'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        }`}
        aria-label={displayLabel}
        aria-invalid={hasError}
      />

      {/* Error message */}
      {hasError && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Selected files */}
      {files.length > 0 && !hasError && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected {config.description.toLowerCase()} ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                <div className="flex items-center space-x-3">
                  {config.icon}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.name.split('.').pop()?.toUpperCase()}
                    </p>
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