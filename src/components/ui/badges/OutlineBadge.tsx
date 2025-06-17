import React from 'react';

interface OutlineBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OutlineBadge: React.FC<OutlineBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const variantClasses = {
    primary: 'border-blue-600 text-blue-600 bg-blue-50',
    secondary: 'border-gray-600 text-gray-600 bg-gray-50',
    success: 'border-green-600 text-green-600 bg-green-50',
    warning: 'border-yellow-600 text-yellow-600 bg-yellow-50',
    error: 'border-red-600 text-red-600 bg-red-50',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded border
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}; 