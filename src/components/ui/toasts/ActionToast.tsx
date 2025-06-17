import React, { useState, useEffect } from 'react';

interface ActionToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  actionLabel: string;
  onAction: () => void;
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const ActionToast: React.FC<ActionToastProps> = ({
  message,
  variant = 'info',
  actionLabel,
  onAction,
  show = true,
  duration = 6000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleAction = () => {
    onAction();
    handleClose();
  };

  const variantClasses = {
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium mr-4">{message}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAction}
            className="px-3 py-1 text-xs font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            {actionLabel}
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Close toast"
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
    </div>
  );
}; 