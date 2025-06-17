import React from 'react';

interface BasicAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  className?: string;
}

export const BasicAlert: React.FC<BasicAlertProps> = ({
  variant = 'info',
  message,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div
      className={`p-4 border rounded-lg ${variantClasses[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}; 