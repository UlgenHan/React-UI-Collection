import React from 'react';

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        bg-transparent font-medium rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
        transition-colors duration-200
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Ghost button'}
    >
      {children}
    </button>
  );
}; 