import React from 'react';

interface TagWithAvatarProps {
  label: string;
  avatarSrc?: string;
  avatarAlt?: string;
  initials?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const TagWithAvatar: React.FC<TagWithAvatarProps> = ({
  label,
  avatarSrc,
  avatarAlt = '',
  initials,
  onClick,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  const avatarSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const avatarTextSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  const avatarBgClasses = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
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
      <div className={`flex-shrink-0 rounded-full overflow-hidden ${avatarSizeClasses[size]}`}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`
            w-full h-full flex items-center justify-center text-white font-medium
            ${avatarBgClasses[variant]}
            ${avatarTextSizeClasses[size]}
          `}>
            {initials || label.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span>{label}</span>
    </span>
  );
}; 