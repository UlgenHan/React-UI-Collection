import React from 'react';

interface OverlayLoaderProps {
  show?: boolean;
  text?: string;
  spinnerSize?: 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  className?: string;
}

export const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  show = true,
  text = 'Loading...',
  spinnerSize = 'lg',
  backgroundColor = 'bg-white bg-opacity-80',
  className = '',
}) => {
  const spinnerSizeClasses = {
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${backgroundColor} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${spinnerSizeClasses[spinnerSize]}`}
        />
        {text && (
          <p className="text-lg font-medium text-gray-700">{text}</p>
        )}
      </div>
    </div>
  );
}; 