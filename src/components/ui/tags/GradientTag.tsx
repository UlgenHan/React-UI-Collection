import React from 'react';

interface GradientTagProps {
  label: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'red';
}

export const GradientTag: React.FC<GradientTagProps> = ({
  label,
  onClick,
  className = '',
  size = 'md',
  gradient = 'blue',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500',
    pink: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:ring-pink-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:ring-green-500',
    orange: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-500',
    red: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium text-white rounded-md shadow-lg
        ${sizeClasses[size]}
        ${gradientClasses[gradient]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200' : ''}
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