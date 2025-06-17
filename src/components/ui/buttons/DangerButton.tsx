import React from 'react';

interface DangerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  confirmAction?: boolean;
  className?: string;
}

export const DangerButton: React.FC<DangerButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'filled',
  size = 'md',
  confirmAction = false,
  className = '',
}) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    filled: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500',
    ghost: 'text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500',
  };

  const handleClick = () => {
    if (confirmAction && !showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000); // Reset after 3 seconds
      return;
    }
    
    onClick?.();
    setShowConfirm(false);
  };

  const buttonText = showConfirm ? 'Click again to confirm' : children;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-medium rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${showConfirm ? 'animate-pulse' : ''}
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Danger button'}
    >
      {buttonText}
    </button>
  );
}; 