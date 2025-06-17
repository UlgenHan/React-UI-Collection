import React, { useState } from 'react';

interface LargeFileUploadProps {
  onChange?: (files: FileList | null) => void;
  onUploadProgress?: (progress: number) => void;
  onUploadComplete?: (files: File[]) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number; // in MB
  chunkSize?: number; // in MB
  autoUpload?: boolean;
  className?: string;
}

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error' | 'paused';
  chunksTotal: number;
  chunksUploaded: number;
}

export const LargeFileUpload: React.FC<LargeFileUploadProps> = ({
  onChange,
  onUploadProgress,
  onUploadComplete,
  label = 'Upload large files',
  accept,
  multiple = false,
  disabled = false,
  maxSize = 100, // 100MB default for large files
  chunkSize = 5, // 5MB chunks
  autoUpload = true,
  className = '',
}) => {
  const [filesWithProgress, setFilesWithProgress] = useState<FileWithProgress[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateChunks = (fileSize: number): number => {
    const chunkSizeBytes = chunkSize * 1024 * 1024;
    return Math.ceil(fileSize / chunkSizeBytes);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange?.(e.target.files);

    const newFilesWithProgress = selectedFiles
      .filter(file => file.size <= maxSize * 1024 * 1024)
      .map(file => ({
        file,
        progress: 0,
        status: 'pending' as const,
        chunksTotal: calculateChunks(file.size),
        chunksUploaded: 0,
      }));

    setFilesWithProgress(newFilesWithProgress);

    if (autoUpload && newFilesWithProgress.length > 0) {
      newFilesWithProgress.forEach((_, index) => {
        setTimeout(() => startChunkedUpload(index), index * 1000);
      });
    }
  };

  const startChunkedUpload = (fileIndex: number) => {
    setFilesWithProgress(prev =>
      prev.map((file, index) =>
        index === fileIndex ? { ...file, status: 'uploading' } : file
      )
    );

    simulateChunkedUpload(fileIndex);
  };

  const simulateChunkedUpload = (fileIndex: number) => {
    const interval = setInterval(() => {
      setFilesWithProgress(prev => {
        const newFiles = [...prev];
        const currentFile = newFiles[fileIndex];

        if (currentFile && currentFile.status === 'uploading') {
          currentFile.chunksUploaded += 1;
          currentFile.progress = (currentFile.chunksUploaded / currentFile.chunksTotal) * 100;

          if (currentFile.chunksUploaded >= currentFile.chunksTotal) {
            currentFile.progress = 100;
            currentFile.status = Math.random() > 0.05 ? 'completed' : 'error'; // 5% chance of error
            clearInterval(interval);

            if (currentFile.status === 'completed') {
              onUploadComplete?.([currentFile.file]);
            }
          }

          // Report overall progress
          const totalProgress = newFiles.reduce((sum, file) => sum + file.progress, 0) / newFiles.length;
          onUploadProgress?.(totalProgress);
        }

        return newFiles;
      });
    }, 200); // Update every 200ms for smooth progress
  };

  const pauseUpload = (fileIndex: number) => {
    setFilesWithProgress(prev =>
      prev.map((file, index) =>
        index === fileIndex && file.status === 'uploading'
          ? { ...file, status: 'paused' }
          : file
      )
    );
  };

  const resumeUpload = (fileIndex: number) => {
    setFilesWithProgress(prev =>
      prev.map((file, index) =>
        index === fileIndex && file.status === 'paused'
          ? { ...file, status: 'uploading' }
          : file
      )
    );
    simulateChunkedUpload(fileIndex);
  };

  const retryUpload = (fileIndex: number) => {
    setFilesWithProgress(prev =>
      prev.map((file, index) =>
        index === fileIndex
          ? { ...file, progress: 0, status: 'pending', chunksUploaded: 0 }
          : file
      )
    );
    setTimeout(() => startChunkedUpload(fileIndex), 100);
  };

  const removeFile = (fileIndex: number) => {
    const newFiles = filesWithProgress.filter((_, index) => index !== fileIndex);
    setFilesWithProgress(newFiles);

    const dataTransfer = new DataTransfer();
    newFiles.forEach(({ file }) => dataTransfer.items.add(file));
    onChange?.(dataTransfer.files);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'uploading':
        return (
          <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'paused':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
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

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-label="Upload large files"
        />
        
        <div className="mt-2 text-xs text-gray-500">
          <div className="flex flex-wrap gap-2">
            <span>Max file size: {maxSize}MB</span>
            <span>• Chunk size: {chunkSize}MB</span>
            <span>• Supports large file uploads</span>
          </div>
        </div>
      </div>

      {filesWithProgress.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            Upload Progress ({filesWithProgress.length} files)
          </h4>

          {filesWithProgress.map((fileWithProgress, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(fileWithProgress.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {fileWithProgress.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileWithProgress.file.size)} • 
                      {fileWithProgress.chunksUploaded}/{fileWithProgress.chunksTotal} chunks
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {fileWithProgress.status === 'uploading' && (
                    <button
                      onClick={() => pauseUpload(index)}
                      className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Pause
                    </button>
                  )}
                  {fileWithProgress.status === 'paused' && (
                    <button
                      onClick={() => resumeUpload(index)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Resume
                    </button>
                  )}
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
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      fileWithProgress.status === 'completed'
                        ? 'bg-green-500'
                        : fileWithProgress.status === 'error'
                        ? 'bg-red-500'
                        : fileWithProgress.status === 'paused'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${fileWithProgress.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
                  {Math.round(fileWithProgress.progress)}%
                </span>
              </div>

              {/* Status text */}
              <p className={`text-xs ${
                fileWithProgress.status === 'completed'
                  ? 'text-green-600'
                  : fileWithProgress.status === 'error'
                  ? 'text-red-600'
                  : fileWithProgress.status === 'paused'
                  ? 'text-yellow-600'
                  : fileWithProgress.status === 'uploading'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}>
                {fileWithProgress.status === 'pending' && 'Ready to upload...'}
                {fileWithProgress.status === 'uploading' && 'Uploading in chunks...'}
                {fileWithProgress.status === 'paused' && 'Upload paused'}
                {fileWithProgress.status === 'completed' && 'Upload completed successfully!'}
                {fileWithProgress.status === 'error' && 'Upload failed. Click retry to try again.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 