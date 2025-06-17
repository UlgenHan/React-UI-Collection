import React from 'react';

export interface HorizontalCardProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  imageSize?: 'sm' | 'md' | 'lg';
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'left',
  imageSize = 'md',
  badge,
  badgeColor = 'blue',
  children,
  className = '',
  onClick
}) => {
  const imageSizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 lg:w-40 lg:h-40',
    lg: 'w-40 h-40 lg:w-48 lg:h-48'
  };

  const badgeClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  const ImageComponent = () => (
    <div className={`flex-shrink-0 ${imageSizeClasses[imageSize]} overflow-hidden rounded-lg`}>
      <img
        src={image}
        alt={imageAlt || title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
      />
    </div>
  );

  const ContentComponent = () => (
    <div className="flex-1 min-w-0">
      {badge && (
        <div className="mb-2">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6 
        hover:shadow-lg transition-shadow duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Mobile: Stacked Layout */}
      <div className="flex flex-col space-y-4 lg:hidden">
        <ImageComponent />
        <ContentComponent />
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className={`hidden lg:flex items-start space-x-6 ${imagePosition === 'right' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <ImageComponent />
        <ContentComponent />
      </div>
    </div>
  );
};

export default HorizontalCard; 