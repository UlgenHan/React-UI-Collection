import React, { useEffect } from 'react';

interface FullscreenDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

export const FullscreenDialog: React.FC<FullscreenDialogProps> = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-dialog-title"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h1 id="fullscreen-dialog-title" className="text-xl font-semibold text-gray-900">
          {title}
        </h1>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close dialog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}; 