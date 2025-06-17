import React from 'react';

interface IconBadgeProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  children,
  icon,
  variant = 'primary',
  size = 'md',
  iconPosition = 'left',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const spacing = size === 'sm' ? 'space-x-1' : 'space-x-1.5';

  const content = iconPosition === 'left' ? (
    <>
      <span className={iconSizeClasses[size]}>{icon}</span>
      <span>{children}</span>
    </>
  ) : (
    <>
      <span>{children}</span>
      <span className={iconSizeClasses[size]}>{icon}</span>
    </>
  );

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded ${spacing}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {content}
    </span>
  );
}; 