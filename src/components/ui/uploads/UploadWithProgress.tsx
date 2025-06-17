import React, { useState, useEffect } from 'react';

interface UploadWithProgressProps {
  onChange?: (files: FileList | null) => void;
  onUploadComplete?: (files: File[]) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  simulateUpload?: boolean;
  uploadDuration?: number; // in milliseconds
  className?: string;
}

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

export const UploadWithProgress: React.FC<UploadWithProgressProps> = ({
  onChange,
  onUploadComplete,
  label = 'Upload files with progress',
  accept,
  multiple = true,
  disabled = false,
  simulateUpload = true,
  uploadDuration = 3000,
  className = '',
}) => {
  const [filesWithProgress, setFilesWithProgress] = useState<FileWithProgress[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange?.(e.target.files);

    const newFilesWithProgress = selectedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));

    setFilesWithProgress(newFilesWithProgress);

    if (simulateUpload) {
      startUpload(newFilesWithProgress);
    }
  };

  const startUpload = (files: FileWithProgress[]) => {
    files.forEach((fileWithProgress, index) => {
      setTimeout(() => {
        simulateFileUpload(index);
      }, index * 500); // Stagger uploads by 500ms
    });
  };

  const simulateFileUpload = (fileIndex: number) => {
    setFilesWithProgress(prev => 
      prev.map((file, index) => 
        index === fileIndex 
          ? { ...file, status: 'uploading' }
          : file
      )
    );

    const interval = setInterval(() => {
      setFilesWithProgress(prev => {
        const newFiles = [...prev];
        const currentFile = newFiles[fileIndex];
        
        if (currentFile && currentFile.status === 'uploading') {
          currentFile.progress += Math.random() * 15 + 5; // Random progress between 5-20%
          
          if (currentFile.progress >= 100) {
            currentFile.progress = 100;
            currentFile.status = Math.random() > 0.1 ? 'completed' : 'error'; // 10% chance of error
            clearInterval(interval);
            
            if (currentFile.status === 'completed') {
              // Check if all files are completed
              const allCompleted = newFiles.every(f => f.status === 'completed' || f.status === 'error');
              if (allCompleted) {
                const completedFiles = newFiles
                  .filter(f => f.status === 'completed')
                  .map(f => f.file);
                onUploadComplete?.(completedFiles);
              }
            }
          }
        }
        
        return newFiles;
      });
    }, uploadDuration / 20); // Update progress 20 times during upload
  };

  const removeFile = (index: number) => {
    const newFiles = filesWithProgress.filter((_, i) => i !== index);
    setFilesWithProgress(newFiles);
    
    const dataTransfer = new DataTransfer();
    newFiles.forEach(({ file }) => dataTransfer.items.add(file));
    onChange?.(dataTransfer.files);
  };

  const retryUpload = (index: number) => {
    setFilesWithProgress(prev =>
      prev.map((file, i) =>
        i === index
          ? { ...file, progress: 0, status: 'pending' }
          : file
      )
    );
    
    setTimeout(() => simulateFileUpload(index), 100);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string, progress: number) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'uploading':
        return (
          <div className="w-5 h-5">
            <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        aria-label="Upload files with progress tracking"
      />

      {filesWithProgress.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Upload Progress ({filesWithProgress.length} files)
          </h4>
          
          {filesWithProgress.map((fileWithProgress, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(fileWithProgress.status, fileWithProgress.progress)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {fileWithProgress.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileWithProgress.file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {fileWithProgress.status === 'error' && (
                    <button
                      onClick={() => retryUpload(index)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Retry
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    disabled={disabled}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Remove ${fileWithProgress.file.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      fileWithProgress.status === 'completed' 
                        ? 'bg-green-500' 
                        : fileWithProgress.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${fileWithProgress.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 min-w-[3rem]">
                  {Math.round(fileWithProgress.progress)}%
                </span>
              </div>
              
              {/* Status text */}
              <div className="mt-2">
                <p className={`text-xs ${
                  fileWithProgress.status === 'completed' 
                    ? 'text-green-600' 
                    : fileWithProgress.status === 'error'
                    ? 'text-red-600'
                    : fileWithProgress.status === 'uploading'
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}>
                  {fileWithProgress.status === 'pending' && 'Waiting to upload...'}
                  {fileWithProgress.status === 'uploading' && 'Uploading...'}
                  {fileWithProgress.status === 'completed' && 'Upload completed!'}
                  {fileWithProgress.status === 'error' && 'Upload failed. Click retry to try again.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 