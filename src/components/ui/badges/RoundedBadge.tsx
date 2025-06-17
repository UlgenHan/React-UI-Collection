import React from 'react';

interface RoundedBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  className?: string;
}

export const RoundedBadge: React.FC<RoundedBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  outline = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  const solidVariantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const outlineVariantClasses = {
    primary: 'border-blue-600 text-blue-600 bg-blue-50',
    secondary: 'border-gray-600 text-gray-600 bg-gray-50',
    success: 'border-green-600 text-green-600 bg-green-50',
    warning: 'border-yellow-600 text-yellow-600 bg-yellow-50',
    error: 'border-red-600 text-red-600 bg-red-50',
  };

  const variantClasses = outline ? outlineVariantClasses[variant] : solidVariantClasses[variant];

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${outline ? 'border' : ''}
        ${sizeClasses[size]}
        ${variantClasses}
        ${className}
      `}
    >
      {children}
    </span>
  );
}; 