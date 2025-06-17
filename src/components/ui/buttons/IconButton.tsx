import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  iconPosition = 'left',
  className = '',
}) => {
  const sizeClasses = {
    sm: children ? 'px-3 py-1.5 text-sm' : 'p-1.5',
    md: children ? 'px-4 py-2 text-base' : 'p-2',
    lg: children ? 'px-6 py-3 text-lg' : 'p-3',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderContent = () => {
    if (!children) {
      return <span className={iconSizeClasses[size]}>{icon}</span>;
    }

    if (iconPosition === 'right') {
      return (
        <>
          {children}
          <span className={`ml-2 ${iconSizeClasses[size]}`}>{icon}</span>
        </>
      );
    }

    return (
      <>
        <span className={`mr-2 ${iconSizeClasses[size]}`}>{icon}</span>
        {children}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-medium rounded-lg inline-flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Icon button'}
    >
      {renderContent()}
    </button>
  );
}; 