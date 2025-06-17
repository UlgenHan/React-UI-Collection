import React from 'react';

interface DarkAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
  className?: string;
}

export const DarkAlert: React.FC<DarkAlertProps> = ({
  variant = 'info',
  message,
  onClose,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-900 border-green-700 text-green-100',
    info: 'bg-blue-900 border-blue-700 text-blue-100',
    warning: 'bg-yellow-900 border-yellow-700 text-yellow-100',
    error: 'bg-red-900 border-red-700 text-red-100',
  };

  const buttonVariantClasses = {
    success: 'text-green-300 hover:text-green-100',
    info: 'text-blue-300 hover:text-blue-100',
    warning: 'text-yellow-300 hover:text-yellow-100',
    error: 'text-red-300 hover:text-red-100',
  };

  return (
    <div
      className={`p-4 border rounded-lg relative ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium pr-8">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-2 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${buttonVariantClasses[variant]}`}
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