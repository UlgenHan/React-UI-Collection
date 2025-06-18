import React, { useState, useEffect } from 'react';
import { CanvasComponent } from './types';
import { codeGenerator, ExportOptions, GeneratedCode } from './codeGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: CanvasComponent[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  components
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'react',
    includeTailwind: true,
    includeCustomCSS: false,
    componentName: 'ExportedWebsite',
    exportType: 'component'
  });
  
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate code when options change
  useEffect(() => {
    if (isOpen && components.length > 0) {
      generateCode();
    }
  }, [exportOptions, components, isOpen]);

  const generateCode = () => {
    setIsGenerating(true);
    try {
      const code = codeGenerator.generateCode(components, exportOptions);
      setGeneratedCode(code);
    } catch (error) {
      addNotification('error', 'Failed to generate code');
    } finally {
      setIsGenerating(false);
    }
  };

  const addNotification = (type: 'success' | 'error' | 'info', message: string, duration = 3000) => {
    const id = Date.now().toString();
    const notification: Notification = { id, type, message, duration };
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addNotification('success', 'Code copied to clipboard');
    } catch (error) {
      addNotification('error', 'Failed to copy code');
    }
  };

  const downloadFile = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    addNotification('success', `File downloaded: ${filename}`);
  };

  const handleDownload = () => {
    if (generatedCode) {
      downloadFile(generatedCode.code, generatedCode.filename);
    }
  };

  const handleDownloadCSS = () => {
    if (generatedCode?.css) {
      downloadFile(generatedCode.css, 'styles.css');
    }
  };

  const getLanguageClass = (language: string): string => {
    switch (language) {
      case 'typescript':
        return 'language-typescript';
      case 'html':
        return 'language-html';
      case 'css':
        return 'language-css';
      default:
        return 'language-javascript';
    }
  };

  const formatCode = (code: string): string => {
    // Simple code formatting - in a real app, you'd use prettier
    return code
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove extra blank lines
      .trim();
  };

  const renderPreview = () => {
    if (!generatedCode) return null;

    if (exportOptions.format === 'html') {
      return (
        <iframe
          srcDoc={generatedCode.code}
          className="w-full h-full border border-gray-200 rounded-lg"
          title="Preview"
        />
      );
    } else {
      // For React code, we'll show a simplified preview
      return (
        <div className="w-full h-full bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-4">
            React Component Preview (Static)
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm text-gray-500 mb-2">Generated Component:</div>
            <div className="text-xs text-gray-700 font-mono">
              {exportOptions.componentName}.tsx
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {components.length} components • {exportOptions.exportType} export
            </div>
          </div>
        </div>
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl h-5/6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Export Code</h2>
              <p className="text-sm text-gray-600">
                Export your design as React JSX or HTML code
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex">
            {/* Left Panel - Export Options */}
            <div className="w-80 border-r border-gray-200 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Format Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Export Format</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="react"
                        checked={exportOptions.format === 'react'}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as 'react' | 'html' }))}
                        className="mr-2"
                      />
                      <span className="text-sm">React JSX (TSX)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="html"
                        checked={exportOptions.format === 'html'}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as 'react' | 'html' }))}
                        className="mr-2"
                      />
                      <span className="text-sm">HTML with Tailwind</span>
                    </label>
                  </div>
                </div>

                {/* Component Name */}
                {exportOptions.format === 'react' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Component Name
                    </label>
                    <input
                      type="text"
                      value={exportOptions.componentName}
                      onChange={(e) => setExportOptions(prev => ({ ...prev, componentName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ExportedWebsite"
                    />
                  </div>
                )}

                {/* Export Type */}
                {exportOptions.format === 'react' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Export Type</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="component"
                          checked={exportOptions.exportType === 'component'}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, exportType: e.target.value as 'component' | 'page' }))}
                          className="mr-2"
                        />
                        <span className="text-sm">Reusable Component</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="page"
                          checked={exportOptions.exportType === 'page'}
                          onChange={(e) => setExportOptions(prev => ({ ...prev, exportType: e.target.value as 'component' | 'page' }))}
                          className="mr-2"
                        />
                        <span className="text-sm">Full Page</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportOptions.includeTailwind}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeTailwind: e.target.checked }))}
                        className="mr-2"
                      />
                      <span className="text-sm">Include Tailwind CSS</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exportOptions.includeCustomCSS}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, includeCustomCSS: e.target.checked }))}
                        className="mr-2"
                      />
                      <span className="text-sm">Include Custom CSS</span>
                    </label>
                  </div>
                </div>

                {/* Component Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Design Info</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Components: {components.length}</div>
                    <div>Format: {exportOptions.format.toUpperCase()}</div>
                    {exportOptions.format === 'react' && (
                      <div>Type: {exportOptions.exportType}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Code/Preview */}
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'code'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'preview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-hidden">
                {activeTab === 'code' ? (
                  <div className="h-full flex flex-col">
                    {/* Code Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {generatedCode?.filename || 'Generated Code'}
                        </span>
                        {generatedCode && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {generatedCode.language}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {generatedCode && (
                          <>
                            <button
                              onClick={() => copyToClipboard(generatedCode.code)}
                              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                            >
                              Copy
                            </button>
                            <button
                              onClick={handleDownload}
                              className="px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            >
                              Download
                            </button>
                            {generatedCode.css && (
                              <button
                                onClick={handleDownloadCSS}
                                className="px-3 py-1 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
                              >
                                Download CSS
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Code Display */}
                    <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
                      {isGenerating ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-white">Generating code...</div>
                        </div>
                      ) : generatedCode ? (
                        <pre className="h-full overflow-auto p-4">
                          <code className={`text-sm text-gray-100 ${getLanguageClass(generatedCode.language)}`}>
                            {formatCode(generatedCode.code)}
                          </code>
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No components to export
                        </div>
                      )}
                    </div>

                    {/* CSS Display */}
                    {generatedCode?.css && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">Custom CSS</span>
                          <button
                            onClick={() => copyToClipboard(generatedCode.css!)}
                            className="px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          >
                            Copy CSS
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg overflow-hidden">
                          <pre className="p-4 overflow-auto max-h-32">
                            <code className="text-sm text-gray-100 language-css">
                              {formatCode(generatedCode.css)}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full">
                    {renderPreview()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExportModal; 