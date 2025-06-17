import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  gradient?: 'blue' | 'purple' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  gradient = 'blue',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-500',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 focus:ring-purple-500',
    pink: 'bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 focus:ring-pink-500',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 focus:ring-orange-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${gradientClasses[gradient]}
        text-white font-semibold rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Gradient button'}
    >
      {children}
    </button>
  );
}; 