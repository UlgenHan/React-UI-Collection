import React, { useEffect } from 'react';

interface FooterButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

interface CustomFooterDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  footerButtons: FooterButton[];
  footerAlignment?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const CustomFooterDialog: React.FC<CustomFooterDialogProps> = ({
  open,
  onClose,
  title,
  content,
  footerButtons,
  footerAlignment = 'right',
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

  const getButtonStyles = (variant: string = 'secondary') => {
    const styles = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-blue-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };
    return styles[variant as keyof typeof styles] || styles.secondary;
  };

  const getFooterAlignment = () => {
    const alignments = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };
    return alignments[footerAlignment];
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-footer-dialog-title"
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 id="custom-footer-dialog-title" className="text-lg font-semibold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="text-gray-600 mb-6">
            {content}
          </div>
        </div>
        
        <div className={`px-6 py-4 bg-gray-50 rounded-b-lg flex ${getFooterAlignment()} space-x-3`}>
          {footerButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              disabled={button.disabled || button.loading}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${getButtonStyles(button.variant)}`}
            >
              {button.loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 