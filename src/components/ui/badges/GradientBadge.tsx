import React from 'react';

interface GradientBadgeProps {
  children: React.ReactNode;
  gradient?: 'blue' | 'purple' | 'pink' | 'orange' | 'green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GradientBadge: React.FC<GradientBadgeProps> = ({
  children,
  gradient = 'blue',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-700',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-700',
    pink: 'bg-gradient-to-r from-pink-500 to-pink-700',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-700',
    green: 'bg-gradient-to-r from-green-500 to-green-700',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded text-white shadow-lg
        ${sizeClasses[size]}
        ${gradientClasses[gradient]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}; 