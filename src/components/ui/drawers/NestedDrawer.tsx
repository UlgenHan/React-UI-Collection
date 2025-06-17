import React, { useEffect, useState } from 'react';

interface NestedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  title?: string;
  className?: string;
}

export const NestedDrawer: React.FC<NestedDrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = 'w-80',
  title,
  className = ''
}) => {
  const [nestedOpen, setNestedOpen] = useState(false);
  const [nestedContent, setNestedContent] = useState<React.ReactNode>(null);

  const openNested = (content: React.ReactNode) => {
    setNestedContent(content);
    setNestedOpen(true);
  };

  const closeNested = () => {
    setNestedOpen(false);
    setNestedContent(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (nestedOpen) {
          closeNested();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, nestedOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Main Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Main Drawer */}
      <div
        className={`
          relative ${width} bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${nestedOpen ? 'z-10' : 'z-20'} ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 id="drawer-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close drawer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          {React.isValidElement(children) 
            ? React.cloneElement(children as React.ReactElement, { openNested })
            : children
          }
        </div>
      </div>

      {/* Nested Drawer */}
      {nestedOpen && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div
            className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
            onClick={closeNested}
            aria-hidden="true"
          />
          
          <div
            className="relative w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-md font-semibold text-gray-900">
                Details
              </h3>
              <button
                onClick={closeNested}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Close nested drawer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {nestedContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 