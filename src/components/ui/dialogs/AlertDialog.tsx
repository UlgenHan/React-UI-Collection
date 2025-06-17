import React, { useEffect } from 'react';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  acknowledgeText?: string;
  className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  message,
  variant = 'info',
  acknowledgeText = 'OK',
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

  const variantStyles = {
    info: {
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
    success: {
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      buttonColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    },
    warning: {
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    },
    error: {
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      buttonColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
  };

  const icons = {
    info: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    success: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    ),
    warning: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
    ),
    error: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ),
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-message"
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-sm w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${variantStyles[variant].bgColor}`}>
              <svg className={`w-6 h-6 ${variantStyles[variant].iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[variant]}
              </svg>
            </div>
            <h3 id="alert-dialog-title" className="ml-4 text-lg font-medium text-gray-900">
              {title}
            </h3>
          </div>
          <p id="alert-dialog-message" className="text-gray-600 mb-6">
            {message}
          </p>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 ${variantStyles[variant].buttonColor}`}
          >
            {acknowledgeText}
          </button>
        </div>
      </div>
    </div>
  );
}; 