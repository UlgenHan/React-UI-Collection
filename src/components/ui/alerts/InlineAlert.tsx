import React from 'react';

interface InlineAlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const InlineAlert: React.FC<InlineAlertProps> = ({
  variant = 'error',
  message,
  size = 'sm',
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  const iconVariantClasses = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  const defaultIcons = {
    success: (
      <svg className={iconSizeClasses[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg className={iconSizeClasses[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className={iconSizeClasses[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    error: (
      <svg className={iconSizeClasses[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <div
      className={`border rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconVariantClasses[variant]}`}>
          {defaultIcons[variant]}
        </div>
        <p className={`ml-2 font-medium ${size === 'sm' ? 'leading-tight' : ''}`}>{message}</p>
      </div>
    </div>
  );
}; 