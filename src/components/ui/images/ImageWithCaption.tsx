import React from 'react';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  captionPosition?: 'bottom' | 'overlay';
  captionSize?: 'sm' | 'md' | 'lg';
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  src,
  alt,
  caption,
  width = 'w-full',
  height = 'h-64',
  rounded = 'lg',
  objectFit = 'cover',
  captionPosition = 'bottom',
  captionSize = 'md',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const captionSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (captionPosition === 'overlay') {
    return (
      <div className={`${width} relative ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
          className={`${width} ${height} ${objectFitClasses[objectFit]} ${roundedClasses[rounded]}`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
          <p className={`text-white font-medium ${captionSizeClasses[captionSize]}`}>
            {caption}
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure className={`${width} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        className={`${width} ${height} ${objectFitClasses[objectFit]} ${roundedClasses[rounded]}`}
      />
      <figcaption className={`mt-2 text-gray-600 ${captionSizeClasses[captionSize]}`}>
        {caption}
      </figcaption>
    </figure>
  );
}; 