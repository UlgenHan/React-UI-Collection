import React from 'react';

interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showZero?: boolean;
  className?: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  variant = 'primary',
  size = 'md',
  showZero = false,
  className = '',
}) => {
  if (count === 0 && !showZero) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs min-w-[1.25rem] h-5',
    md: 'px-2 py-0.5 text-sm min-w-[1.5rem] h-6',
    lg: 'px-2.5 py-1 text-base min-w-[2rem] h-8',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span
      className={`
        inline-flex items-center justify-center font-bold rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      aria-label={`${count} ${count === 1 ? 'notification' : 'notifications'}`}
    >
      {displayCount}
    </span>
  );
}; 