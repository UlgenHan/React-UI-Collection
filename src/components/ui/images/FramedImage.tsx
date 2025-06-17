import React from 'react';

interface FramedImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  frameWidth?: 'thin' | 'medium' | 'thick';
  frameColor?: string;
  framePadding?: 'sm' | 'md' | 'lg' | 'xl';
  frameStyle?: 'solid' | 'dashed' | 'dotted' | 'double';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  shadow?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const FramedImage: React.FC<FramedImageProps> = ({
  src,
  alt,
  width = 'w-full',
  height = 'h-64',
  frameWidth = 'medium',
  frameColor = 'border-gray-300',
  framePadding = 'md',
  frameStyle = 'solid',
  rounded = 'lg',
  objectFit = 'cover',
  shadow = true,
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
  const frameWidthClasses = {
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4',
  };

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const frameStyleClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const shadowClass = shadow ? 'shadow-lg' : '';

  return (
    <div
      className={`${width} bg-white ${paddingClasses[framePadding]} ${frameWidthClasses[frameWidth]} ${frameColor} ${frameStyleClasses[frameStyle]} ${roundedClasses[rounded]} ${shadowClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        className={`w-full ${height} ${objectFitClasses[objectFit]} ${roundedClasses[rounded]}`}
      />
    </div>
  );
}; 