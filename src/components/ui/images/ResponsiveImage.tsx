import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width = 'w-full',
  height = 'h-auto',
  objectFit = 'cover',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
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
      className={`${width} ${height} ${objectFitClasses[objectFit]} ${className}`}
    />
  );
}; 