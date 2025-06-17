import React from 'react';

export interface OverlayCardProps {
  title: string;
  description?: string;
  backgroundImage: string;
  overlayColor?: 'black' | 'blue' | 'purple' | 'green' | 'red';
  overlayOpacity?: 'light' | 'medium' | 'dark';
  textPosition?: 'top' | 'center' | 'bottom';
  textAlign?: 'left' | 'center' | 'right';
  height?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const OverlayCard: React.FC<OverlayCardProps> = ({
  title,
  description,
  backgroundImage,
  overlayColor = 'black',
  overlayOpacity = 'medium',
  textPosition = 'bottom',
  textAlign = 'left',
  height = 'md',
  gradient = true,
  children,
  className = '',
  onClick
}) => {
  const heightClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96'
  };

  const positionClasses = {
    top: 'justify-start items-start',
    center: 'justify-center items-center',
    bottom: 'justify-end items-start'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const overlayClasses = {
    black: {
      light: 'bg-black bg-opacity-30',
      medium: 'bg-black bg-opacity-50',
      dark: 'bg-black bg-opacity-70'
    },
    blue: {
      light: 'bg-blue-900 bg-opacity-30',
      medium: 'bg-blue-900 bg-opacity-50',
      dark: 'bg-blue-900 bg-opacity-70'
    },
    purple: {
      light: 'bg-purple-900 bg-opacity-30',
      medium: 'bg-purple-900 bg-opacity-50',
      dark: 'bg-purple-900 bg-opacity-70'
    },
    green: {
      light: 'bg-green-900 bg-opacity-30',
      medium: 'bg-green-900 bg-opacity-50',
      dark: 'bg-green-900 bg-opacity-70'
    },
    red: {
      light: 'bg-red-900 bg-opacity-30',
      medium: 'bg-red-900 bg-opacity-50',
      dark: 'bg-red-900 bg-opacity-70'
    }
  };

  const getGradientClass = () => {
    if (!gradient) return '';
    
    switch (textPosition) {
      case 'top':
        return 'bg-gradient-to-b from-black/60 to-transparent';
      case 'bottom':
        return 'bg-gradient-to-t from-black/60 to-transparent';
      case 'center':
        return 'bg-gradient-to-r from-black/60 via-black/30 to-black/60';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        relative rounded-lg overflow-hidden shadow-lg cursor-pointer
        hover:shadow-xl transition-shadow duration-300
        ${heightClasses[height]}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlayColor][overlayOpacity]}`} />
      
      {/* Gradient Overlay */}
      {gradient && (
        <div className={`absolute inset-0 ${getGradientClass()}`} />
      )}
      
      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col p-6 ${positionClasses[textPosition]}`}>
        <div className={`${alignmentClasses[textAlign]} ${textPosition === 'center' ? 'text-center' : ''}`}>
          <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
            {title}
          </h3>
          
          {description && (
            <p className="text-gray-200 leading-relaxed mb-4 drop-shadow-md">
              {description}
            </p>
          )}
          
          {children}
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OverlayCard; 