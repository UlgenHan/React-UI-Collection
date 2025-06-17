import React, { useState, useEffect } from 'react';

interface DarkModeToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error' | 'neutral';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const DarkModeToast: React.FC<DarkModeToastProps> = ({
  message,
  variant = 'neutral',
  show = true,
  duration = 4000,
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

  const variantClasses = {
    success: 'bg-gray-800 text-green-400 border-green-400',
    info: 'bg-gray-800 text-blue-400 border-blue-400',
    warning: 'bg-gray-800 text-yellow-400 border-yellow-400',
    error: 'bg-gray-800 text-red-400 border-red-400',
    neutral: 'bg-gray-800 text-gray-100 border-gray-600',
  };

  const iconVariantClasses = {
    success: 'text-green-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    neutral: 'text-gray-400',
  };

  const defaultIcons = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg border transition-opacity duration-300 ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconVariantClasses[variant]}`}>
            {defaultIcons[variant]}
          </div>
          <p className="ml-3 text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 p-1 text-gray-400 hover:text-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
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
  );
}; 