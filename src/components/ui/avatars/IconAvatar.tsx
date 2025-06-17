import React from 'react';

interface IconAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  icon?: React.ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  className?: string;
}

export const IconAvatar: React.FC<IconAvatarProps> = ({
  src,
  alt,
  name = '',
  size = 'md',
  icon,
  backgroundColor = 'bg-gray-300',
  iconColor = 'text-gray-500',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  };

  const [imageError, setImageError] = React.useState(false);

  const defaultUserIcon = (
    <svg
      className={`${iconSizeClasses[size]} ${iconColor}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className={`
      relative inline-block rounded-full overflow-hidden
      ${sizeClasses[size]}
      ${!src || imageError ? backgroundColor : ''}
      ${className}
    `}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {icon || defaultUserIcon}
        </div>
      )}
    </div>
  );
}; 