import React from 'react';

interface RoundedImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const RoundedImage: React.FC<RoundedImageProps> = ({
  src,
  alt,
  width = 'w-full',
  height = 'h-auto',
  rounded = 'lg',
  objectFit = 'cover',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
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
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      className={`${width} ${height} ${roundedClasses[rounded]} ${objectFitClasses[objectFit]} ${className}`}
    />
  );
}; 