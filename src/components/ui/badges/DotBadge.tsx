import React from 'react';

interface DotBadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const DotBadge: React.FC<DotBadgeProps> = ({
  variant = 'primary',
  size = 'md',
  animated = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const variantClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <span
      className={`
        inline-block rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${animated ? 'animate-pulse' : ''}
        ${className}
      `}
      aria-label="Status indicator"
    />
  );
}; 