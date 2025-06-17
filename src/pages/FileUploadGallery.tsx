import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicFileUpload,
  DragAndDropUpload,
  MultiFileUpload,
  FilePreviewUpload,
  UploadWithProgress,
  IconFileUpload,
  ErrorFileUpload,
  FileTypeRestrictedUpload,
  LargeFileUpload,
  DisabledFileUpload
} from '../components/ui/uploads';

const FileUploadGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, FileList | null>>({});

  const handleFileChange = (component: string, files: FileList | null) => {
    setUploadedFiles(prev => ({ ...prev, [component]: files }));
  };

  const components = [
    {
      name: 'Basic File Upload',
      component: (
        <BasicFileUpload
          label="Upload File"
          onChange={(files) => handleFileChange('basic', files)}
          accept="image/*,.pdf,.doc,.docx"
          helperText="Supports images, PDF, and Word documents"
        />
      ),
      description: 'Standard file input field with styled file button'
    },
    {
      name: 'Drag and Drop Upload',
      component: (
        <DragAndDropUpload
          label="Drag files here or click to upload"
          onChange={(files) => handleFileChange('dragdrop', files)}
          multiple
          maxSize={10}
        />
      ),
      description: 'Dropzone area for drag-and-drop with file management'
    },
    {
      name: 'Multi File Upload',
      component: (
        <MultiFileUpload
          label="Select Multiple Files"
          onChange={(files) => handleFileChange('multi', files)}
          maxFiles={5}
          maxSize={5}
        />
      ),
      description: 'Accepts multiple files with file icons and validation'
    },
    {
      name: 'File Preview Upload',
      component: (
        <FilePreviewUpload
          label="Upload with Preview"
          onChange={(files) => handleFileChange('preview', files)}
          accept="image/*,.pdf"
          multiple
          maxFiles={4}
        />
      ),
      description: 'Shows file previews for images and file names'
    },
    {
      name: 'Upload with Progress',
      component: (
        <UploadWithProgress
          label="Upload with Progress Tracking"
          onChange={(files) => handleFileChange('progress', files)}
          multiple
          simulateUpload
          uploadDuration={2000}
        />
      ),
      description: 'Simulated upload progress bars with retry functionality'
    },
    {
      name: 'Icon File Upload',
      component: (
        <IconFileUpload
          label="Upload with Icon"
          onChange={(files) => handleFileChange('icon', files)}
          iconPosition="left"
          helperText="Upload icon positioned inside the field"
        />
      ),
      description: 'Upload icon inside field with left/right positioning'
    },
    {
      name: 'Error File Upload',
      component: (
        <ErrorFileUpload
          label="Validated Upload"
          onChange={(files) => handleFileChange('error', files)}
          multiple
          maxSize={2}
          maxFiles={3}
          allowedTypes={['jpg', 'png', 'pdf']}
        />
      ),
      description: 'Validation error styling with detailed error messages'
    },
    {
      name: 'File Type Restricted Upload',
      component: (
        <FileTypeRestrictedUpload
          label="Images Only"
          fileType="images"
          onChange={(files) => handleFileChange('restricted', files)}
          multiple
          maxSize={5}
        />
      ),
      description: 'Accepts specific file types (images, documents, videos, audio)'
    },
    {
      name: 'Large File Upload',
      component: (
        <LargeFileUpload
          label="Large File Upload"
          onChange={(files) => handleFileChange('large', files)}
          maxSize={50}
          chunkSize={5}
          autoUpload
        />
      ),
      description: 'Handles large files with chunked upload and pause/resume'
    },
    {
      name: 'Disabled File Upload',
      component: (
        <DisabledFileUpload
          label="Disabled Upload"
          helperText="File upload is currently unavailable"
          reason="Upload functionality is temporarily disabled"
        />
      ),
      description: 'Non-editable file upload with visual disabled state'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Gallery
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Upload Components</h1>
          <p className="text-xl text-gray-600">
            File upload components with drag & drop, progress tracking, and validation
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {components.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="space-y-4">
                {item.component}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Notes */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Notes</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• All components use native HTML5 file inputs for better browser compatibility</li>
            <li>• Drag & drop components support modern browsers with graceful fallbacks</li>
            <li>• File validation includes size, type, and count restrictions</li>
            <li>• Progress tracking components simulate real upload scenarios</li>
            <li>• Accessibility features include proper ARIA labels and keyboard navigation</li>
            <li>• Error handling provides clear feedback for validation failures</li>
          </ul>
        </div>

        {/* File Info Display */}
        {Object.keys(uploadedFiles).some(key => uploadedFiles[key]) && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Currently Selected Files</h3>
            <div className="space-y-2">
              {Object.entries(uploadedFiles).map(([component, files]) => 
                files && files.length > 0 ? (
                  <div key={component} className="text-sm">
                    <span className="font-medium text-green-800 capitalize">{component}:</span>
                    <span className="text-green-700 ml-2">
                      {Array.from(files).map(file => file.name).join(', ')}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadGallery; 