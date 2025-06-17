 import React, { useEffect } from 'react';

interface FloatingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  className?: string;
}

export const FloatingDrawer: React.FC<FloatingDrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  title,
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'justify-start items-center pl-8';
      case 'right':
        return 'justify-end items-center pr-8';
      case 'top':
        return 'justify-center items-start pt-8';
      case 'bottom':
        return 'justify-center items-end pb-8';
      default:
        return 'justify-end items-center pr-8';
    }
  };

  const getDrawerSize = () => {
    switch (position) {
      case 'left':
      case 'right':
        return 'w-72 h-96';
      case 'top':
      case 'bottom':
        return 'w-96 h-72';
      default:
        return 'w-72 h-96';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex ${getPositionClasses()}`}>
      {/* Subtle Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Floating Drawer */}
      <div
        className={`
          relative ${getDrawerSize()} bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out
          border border-gray-200 ${className}
        `}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'floating-drawer-title' : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-gray-50 to-gray-100">
          {title && (
            <h2 id="floating-drawer-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-all duration-200 shadow-sm"
            aria-label="Close floating drawer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 max-h-80">
          {children}
        </div>
        
        {/* Footer indicator */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div className="flex justify-center">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Floating effect indicators */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}; 