import React, { useState, useEffect } from 'react';

interface BasicToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const BasicToast: React.FC<BasicToastProps> = ({
  message,
  variant = 'info',
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
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}; 