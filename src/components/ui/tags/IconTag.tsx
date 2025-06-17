import React from 'react';

interface IconTagProps {
  label: string;
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const IconTag: React.FC<IconTagProps> = ({
  label,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
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
        inline-flex items-center font-medium rounded-md
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1' : ''}
        ${variant === 'primary' && onClick ? 'focus:ring-blue-500' : ''}
        ${variant === 'success' && onClick ? 'focus:ring-green-500' : ''}
        ${variant === 'warning' && onClick ? 'focus:ring-yellow-500' : ''}
        ${variant === 'error' && onClick ? 'focus:ring-red-500' : ''}
        ${variant === 'default' && onClick ? 'focus:ring-gray-500' : ''}
        ${iconPosition === 'right' ? 'flex-row-reverse' : ''}
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
      <span className={`flex-shrink-0 ${iconSizeClasses[size]}`}>
        {icon}
      </span>
      <span>{label}</span>
    </span>
  );
}; 