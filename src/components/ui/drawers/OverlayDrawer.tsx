import React, { useEffect } from 'react';

interface OverlayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  title?: string;
  className?: string;
}

export const OverlayDrawer: React.FC<OverlayDrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = position === 'left' || position === 'right' ? 'w-80' : 'h-80',
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
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'top':
        return 'items-start';
      case 'bottom':
        return 'items-end';
      default:
        return 'justify-end';
    }
  };

  const getDrawerClasses = () => {
    switch (position) {
      case 'left':
      case 'right':
        return `${size} h-full`;
      case 'top':
      case 'bottom':
        return `w-full ${size}`;
      default:
        return `${size} h-full`;
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex ${getPositionClasses()}`}>
      {/* Translucent Backdrop */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Overlay Drawer */}
      <div
        className={`
          relative ${getDrawerClasses()} bg-white/95 backdrop-blur-lg border border-white/20 
          shadow-2xl transform transition-all duration-300 ease-in-out
          ${position === 'top' ? 'rounded-b-xl' : position === 'bottom' ? 'rounded-t-xl' : 
            position === 'left' ? 'rounded-r-xl' : 'rounded-l-xl'}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/50">
            <h2 id="drawer-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-colors"
              aria-label="Close drawer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white/70 rounded-lg p-4 backdrop-blur-sm">
            {children}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 pointer-events-none rounded-xl" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
}; 