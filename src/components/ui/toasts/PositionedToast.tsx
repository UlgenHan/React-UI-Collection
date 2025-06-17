import React, { useState, useEffect } from 'react';

interface PositionedToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const PositionedToast: React.FC<PositionedToastProps> = ({
  message,
  variant = 'info',
  position = 'top-right',
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

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${positionClasses[position]} ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}; 