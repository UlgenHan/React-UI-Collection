import React from 'react';

interface AspectRatioImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'wide' | 'ultrawide';
  width?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  width = 'w-full',
  rounded = 'lg',
  objectFit = 'cover',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    ultrawide: 'aspect-[21/9]',
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
    <div className={`${width} ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        className={`w-full h-full ${objectFitClasses[objectFit]} ${roundedClasses[rounded]}`}
      />
    </div>
  );
}; 