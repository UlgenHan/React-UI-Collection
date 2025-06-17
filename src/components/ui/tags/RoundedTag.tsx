import React from 'react';

interface RoundedTagProps {
  label: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const RoundedTag: React.FC<RoundedTagProps> = ({
  label,
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2' : ''}
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