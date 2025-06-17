import React from 'react';

interface OutlinedTagProps {
  label: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const OutlinedTag: React.FC<OutlinedTagProps> = ({
  label,
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs border',
    md: 'px-3 py-1 text-sm border',
    lg: 'px-4 py-2 text-base border-2',
  };

  const variantClasses = {
    default: 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
    primary: 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400',
    success: 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400',
    warning: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400',
    error: 'border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-md bg-transparent
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1' : ''}
        ${variant === 'primary' && onClick ? 'focus:ring-blue-500' : ''}
        ${variant === 'success' && onClick ? 'focus:ring-green-500' : ''}
        ${variant === 'warning' && onClick ? 'focus:ring-yellow-500' : ''}
        ${variant === 'error' && onClick ? 'focus:ring-red-500' : ''}
        ${variant === 'default' && onClick ? 'focus:ring-gray-500' : ''}
        ${className}
      `}
      onClick={onClick}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {label}
    </span>
  );
}; 