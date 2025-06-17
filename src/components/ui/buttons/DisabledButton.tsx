import React from 'react';

interface DisabledButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  reason?: string;
  className?: string;
}

export const DisabledButton: React.FC<DisabledButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  reason = 'This action is currently unavailable',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gray-300 text-gray-500',
    secondary: 'bg-gray-100 text-gray-400 border border-gray-200',
    outline: 'border-2 border-gray-300 text-gray-400 bg-transparent',
  };

  return (
    <div className="relative">
      <button
        disabled={true}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          font-medium rounded-lg cursor-not-allowed opacity-60
          ${className}
        `}
        aria-label={`${typeof children === 'string' ? children : 'Button'} - disabled`}
        aria-disabled="true"
        title={reason}
      >
        {children}
      </button>
    </div>
  );
}; 