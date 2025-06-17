import React, { useState, useEffect } from 'react';

interface AutoDismissToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  fadeOutDuration?: number;
  className?: string;
}

export const AutoDismissToast: React.FC<AutoDismissToastProps> = ({
  message,
  variant = 'info',
  show = true,
  duration = 4000,
  onClose,
  fadeOutDuration = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isRendered, setIsRendered] = useState(show);

  useEffect(() => {
    if (show) {
      setIsRendered(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), fadeOutDuration);
    }
  }, [show, fadeOutDuration]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setIsRendered(false);
          onClose?.();
        }, fadeOutDuration);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, fadeOutDuration, onClose]);

  const variantClasses = {
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const iconVariantClasses = {
    success: 'text-green-200',
    info: 'text-blue-200',
    warning: 'text-yellow-200',
    error: 'text-red-200',
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
  };

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-${fadeOutDuration} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconVariantClasses[variant]}`}>
          {defaultIcons[variant]}
        </div>
        <p className="ml-3 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}; 