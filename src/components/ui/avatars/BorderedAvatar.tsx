import React from 'react';

interface BorderedAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  borderColor?: string;
  borderWidth?: 'thin' | 'medium' | 'thick';
  shadowSize?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const BorderedAvatar: React.FC<BorderedAvatarProps> = ({
  src,
  alt,
  name = '',
  size = 'md',
  borderColor = 'border-white',
  borderWidth = 'medium',
  shadowSize = 'md',
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

  const borderWidthClasses = {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
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
      ${borderWidthClasses[borderWidth]}
      ${borderColor}
      ${shadowClasses[shadowSize]}
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
      ) : name ? (
        <div className="w-full h-full flex items-center justify-center font-medium">
          {getInitials(name)}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <svg
            className="w-3/4 h-3/4 text-gray-500"
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
        </div>
      )}
    </div>
  );
}; 