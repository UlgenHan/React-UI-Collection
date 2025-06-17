import React from 'react';

interface OutlinedAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  className?: string;
}

export const OutlinedAlert: React.FC<OutlinedAlertProps> = ({
  variant = 'info',
  message,
  className = '',
}) => {
  const variantClasses = {
    success: 'border-green-500 text-green-700 bg-white',
    info: 'border-blue-500 text-blue-700 bg-white',
    warning: 'border-yellow-500 text-yellow-700 bg-white',
    error: 'border-red-500 text-red-700 bg-white',
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}; 