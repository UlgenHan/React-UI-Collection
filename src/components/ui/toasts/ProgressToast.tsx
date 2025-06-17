import React, { useState, useEffect } from 'react';

interface ProgressToastProps {
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  pauseOnHover?: boolean;
  className?: string;
}

export const ProgressToast: React.FC<ProgressToastProps> = ({
  message,
  variant = 'info',
  show = true,
  duration = 5000,
  onClose,
  pauseOnHover = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      setProgress(100);
    }
  }, [show]);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          handleClose();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, duration, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const variantClasses = {
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const progressVariantClasses = {
    success: 'bg-green-400',
    info: 'bg-blue-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-4 py-3">
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
      <div className="h-1 bg-black bg-opacity-20">
        <div
          className={`h-full transition-all duration-100 ease-linear ${progressVariantClasses[variant]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}; 