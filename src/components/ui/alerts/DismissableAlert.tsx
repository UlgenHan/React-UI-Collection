import React, { useState, useEffect } from 'react';

interface DismissableAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  show?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const DismissableAlert: React.FC<DismissableAlertProps> = ({
  variant = 'info',
  message,
  show = true,
  autoClose = false,
  duration = 5000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const buttonVariantClasses = {
    success: 'text-green-500 hover:text-green-700',
    info: 'text-blue-500 hover:text-blue-700',
    warning: 'text-yellow-500 hover:text-yellow-700',
    error: 'text-red-500 hover:text-red-700',
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`p-4 border rounded-lg relative ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium pr-8">{message}</p>
        <button
          onClick={handleClose}
          className={`ml-2 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonVariantClasses[variant]}`}
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
      </div>
    </div>
  );
}; 