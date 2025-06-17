import React from 'react';

export interface HoverEffectCardProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'rotate' | 'slideUp';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  onClick?: () => void;
}

const HoverEffectCard: React.FC<HoverEffectCardProps> = ({
  title,
  description,
  image,
  children,
  hoverEffect = 'lift',
  intensity = 'medium',
  className = '',
  onClick
}) => {
  const getHoverClasses = () => {
    const effects = {
      lift: {
        subtle: 'hover:shadow-lg hover:-translate-y-1',
        medium: 'hover:shadow-xl hover:-translate-y-2',
        strong: 'hover:shadow-2xl hover:-translate-y-3'
      },
      scale: {
        subtle: 'hover:scale-102',
        medium: 'hover:scale-105',
        strong: 'hover:scale-110'
      },
      glow: {
        subtle: 'hover:shadow-lg hover:shadow-blue-500/25',
        medium: 'hover:shadow-xl hover:shadow-blue-500/30',
        strong: 'hover:shadow-2xl hover:shadow-blue-500/40'
      },
      rotate: {
        subtle: 'hover:rotate-1 hover:shadow-lg',
        medium: 'hover:rotate-2 hover:shadow-xl',
        strong: 'hover:rotate-3 hover:shadow-2xl'
      },
      slideUp: {
        subtle: 'hover:-translate-y-1 hover:shadow-lg',
        medium: 'hover:-translate-y-2 hover:shadow-xl',
        strong: 'hover:-translate-y-4 hover:shadow-2xl'
      }
    };
    
    return effects[hoverEffect][intensity];
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden group
        transition-all duration-300 ease-in-out cursor-pointer
        transform-gpu
        ${getHoverClasses()}
        ${className}
      `}
      onClick={onClick}
    >
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 leading-relaxed mb-4 transition-colors duration-300">
            {description}
          </p>
        )}
        
        {children}
        
        {/* Animated arrow indicator */}
        <div className="flex items-center text-blue-600 font-medium mt-4 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
          <span className="mr-2">Learn more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HoverEffectCard; 