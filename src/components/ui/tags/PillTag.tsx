import React from 'react';

interface PillTagProps {
  label: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const PillTag: React.FC<PillTagProps> = ({
  label,
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variantClasses = {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    error: 'bg-red-500 text-white hover:bg-red-600',
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