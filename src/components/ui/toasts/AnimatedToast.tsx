import React, { useState, useEffect } from 'react';

interface AnimatedToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  animation?: 'slide' | 'fade' | 'bounce';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const AnimatedToast: React.FC<AnimatedToastProps> = ({
  message,
  variant = 'info',
  animation = 'slide',
  show = true,
  duration = 4000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
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
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  const variantClasses = {
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const animationClasses = {
    slide: `transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`,
    fade: `transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`,
    bounce: `transition-all duration-300 transform ${
      isVisible
        ? 'translate-y-0 opacity-100 scale-100'
        : '-translate-y-2 opacity-0 scale-95'
    }`,
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium mr-4">{message}</p>
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
  );
}; 