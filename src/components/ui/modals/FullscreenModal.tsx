import React from 'react';

export interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  showCloseButton?: boolean;
  backgroundColor?: 'white' | 'gray-50' | 'gray-900';
  className?: string;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showHeader = true,
  showCloseButton = true,
  backgroundColor = 'white',
  className = ''
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-900': 'bg-gray-900'
  };

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 overflow-hidden
        ${backgroundClasses[backgroundColor]}
        ${className}
      `}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header */}
      {showHeader && (
        <div className={`
          flex items-center justify-between p-6 border-b
          ${backgroundColor === 'gray-900' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          {title && (
            <h1 className={`text-2xl font-semibold ${
              backgroundColor === 'gray-900' ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h1>
          )}
          
          {showCloseButton && (
            <button
              onClick={onClose}
              className={`
                p-2 rounded-lg transition-colors
                ${backgroundColor === 'gray-900' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`
        h-full overflow-y-auto
        ${showHeader ? 'h-[calc(100vh-80px)]' : 'h-screen'}
        ${showHeader ? 'p-6' : 'p-0'}
      `}>
        {children}
      </div>
    </div>
  );
};

export default FullscreenModal; 