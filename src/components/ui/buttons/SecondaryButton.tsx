import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        bg-gray-200 text-gray-900 font-medium rounded-lg
        hover:bg-gray-300 active:bg-gray-400
        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200
        transition-colors duration-200
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Secondary button'}
    >
      {children}
    </button>
  );
}; 