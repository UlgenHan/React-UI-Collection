import React from 'react';

export interface ImageCardProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  children?: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  badge,
  badgeColor = 'blue',
  children,
  shadow = 'md',
  rounded = 'lg',
  className = '',
  onClick
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  };

  const badgeClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <div
      className={`
        bg-white overflow-hidden
        ${shadowClasses[shadow]}
        ${roundedClasses[rounded]}
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={imageAlt || title}
          className="w-full h-48 object-cover"
        />
        {badge && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeClasses[badgeColor]}`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 leading-relaxed mb-4">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default ImageCard; 