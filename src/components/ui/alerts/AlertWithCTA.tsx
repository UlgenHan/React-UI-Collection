import React from 'react';

interface AlertWithCTAProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  ctaLabel: string;
  onCtaClick: () => void;
  onClose?: () => void;
  className?: string;
}

export const AlertWithCTA: React.FC<AlertWithCTAProps> = ({
  variant = 'info',
  message,
  ctaLabel,
  onCtaClick,
  onClose,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const buttonVariantClasses = {
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const closeButtonVariantClasses = {
    success: 'text-green-500 hover:text-green-700',
    info: 'text-blue-500 hover:text-blue-700',
    warning: 'text-yellow-500 hover:text-yellow-700',
    error: 'text-red-500 hover:text-red-700',
  };

  return (
    <div
      className={`p-4 border rounded-lg ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-3">{message}</p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCtaClick}
              className={`px-3 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${buttonVariantClasses[variant]}`}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-4 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${closeButtonVariantClasses[variant]}`}
            aria-label="Close alert"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}; 