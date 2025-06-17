import React from 'react';

interface ClosableTagProps {
  label: string;
  onClose: () => void;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const ClosableTag: React.FC<ClosableTagProps> = ({
  label,
  onClose,
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const closeButtonSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  const closeButtonVariantClasses = {
    default: 'hover:bg-gray-300',
    primary: 'hover:bg-blue-300',
    success: 'hover:bg-green-300',
    warning: 'hover:bg-yellow-300',
    error: 'hover:bg-red-300',
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleCloseKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-md
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1' : ''}
        ${variant === 'primary' && onClick ? 'focus:ring-blue-500' : ''}
        ${variant === 'success' && onClick ? 'focus:ring-green-500' : ''}
        ${variant === 'warning' && onClick ? 'focus:ring-yellow-500' : ''}
        ${variant === 'error' && onClick ? 'focus:ring-red-500' : ''}
        ${variant === 'default' && onClick ? 'focus:ring-gray-500' : ''}
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
      <span>{label}</span>
      <button
        type="button"
        onClick={handleClose}
        onKeyDown={handleCloseKeyDown}
        className={`
          flex-shrink-0 ml-1 rounded-full p-0.5 focus:outline-none focus:ring-1 focus:ring-offset-1
          ${closeButtonSizeClasses[size]}
          ${closeButtonVariantClasses[variant]}
          ${variant === 'primary' ? 'focus:ring-blue-500' : ''}
          ${variant === 'success' ? 'focus:ring-green-500' : ''}
          ${variant === 'warning' ? 'focus:ring-yellow-500' : ''}
          ${variant === 'error' ? 'focus:ring-red-500' : ''}
          ${variant === 'default' ? 'focus:ring-gray-500' : ''}
        `}
        aria-label="Remove tag"
      >
        <svg
          className="w-full h-full"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </span>
  );
}; 