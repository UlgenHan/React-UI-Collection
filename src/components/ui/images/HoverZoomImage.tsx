import React from 'react';

interface HoverZoomImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  zoomScale?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
}

export const HoverZoomImage: React.FC<HoverZoomImageProps> = ({
  src,
  alt,
  width = 'w-full',
  height = 'h-64',
  zoomScale = 'md',
  rounded = 'lg',
  objectFit = 'cover',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
  onClick,
}) => {
  const zoomClasses = {
    sm: 'hover:scale-105',
    md: 'hover:scale-110',
    lg: 'hover:scale-125',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  return (
    <div className={`${width} ${height} overflow-hidden ${roundedClasses[rounded]} ${onClick ? 'cursor-pointer' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        onClick={onClick}
        className={`w-full h-full ${objectFitClasses[objectFit]} transition-transform duration-300 ease-in-out ${zoomClasses[zoomScale]} ${className}`}
      />
    </div>
  );
}; 