import React from 'react';

interface InitialsAvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  backgroundColor = 'bg-blue-500',
  textColor = 'text-white',
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`
      relative inline-block rounded-full overflow-hidden
      ${sizeClasses[size]}
      ${!src || imageError ? `${backgroundColor} ${textColor}` : ''}
      ${className}
    `}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-medium">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}; 