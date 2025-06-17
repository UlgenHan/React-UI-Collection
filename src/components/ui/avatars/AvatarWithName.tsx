import React from 'react';

interface AvatarWithNameProps {
  src?: string;
  alt?: string;
  name: string;
  subtitle?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  avatarPosition?: 'left' | 'right' | 'top' | 'bottom';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  src,
  alt,
  name,
  subtitle,
  size = 'md',
  layout = 'horizontal',
  avatarPosition = 'left',
  backgroundColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
}) => {
  const avatarSizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const spacingClasses = {
    xs: layout === 'horizontal' ? 'space-x-2' : 'space-y-1',
    sm: layout === 'horizontal' ? 'space-x-2' : 'space-y-1',
    md: layout === 'horizontal' ? 'space-x-3' : 'space-y-2',
    lg: layout === 'horizontal' ? 'space-x-3' : 'space-y-2',
    xl: layout === 'horizontal' ? 'space-x-4' : 'space-y-3',
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

  const avatarElement = (
    <div className={`
      flex-shrink-0 rounded-full overflow-hidden
      ${avatarSizeClasses[size]}
      ${!src || imageError ? `${backgroundColor} ${textColor}` : ''}
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

  const textElement = (
    <div className={`min-w-0 ${layout === 'vertical' ? 'text-center' : ''}`}>
      <p className={`font-medium text-gray-900 truncate ${textSizeClasses[size]}`}>
        {name}
      </p>
      {subtitle && (
        <p className={`text-gray-500 truncate ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );

  const getLayoutClasses = () => {
    if (layout === 'vertical') {
      return `flex flex-col items-center ${spacingClasses[size]}`;
    }
    
    if (avatarPosition === 'right') {
      return `flex items-center flex-row-reverse ${spacingClasses[size]}`;
    }
    
    return `flex items-center ${spacingClasses[size]}`;
  };

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {avatarElement}
      {textElement}
    </div>
  );
}; 