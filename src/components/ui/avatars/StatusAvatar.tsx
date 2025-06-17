import React from 'react';

interface StatusAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const StatusAvatar: React.FC<StatusAvatarProps> = ({
  src,
  alt,
  name = '',
  size = 'md',
  status = 'offline',
  showStatus = true,
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

  const statusDotSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    away: 'bg-yellow-400',
    busy: 'bg-red-400',
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
    <div className={`relative inline-block ${className}`}>
      <div className={`
        rounded-full overflow-hidden
        ${sizeClasses[size]}
        ${!src || imageError ? `${backgroundColor} ${textColor}` : ''}
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
      {showStatus && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full ring-2 ring-white
            ${statusDotSizes[size]}
            ${statusColors[status]}
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}; 