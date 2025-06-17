import React, { useState } from 'react';

interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fallback?: string;
  showBorder?: boolean;
  borderColor?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  showBorder = false,
  borderColor = 'border-gray-300',
  loading = 'lazy',
  className = '',
  onLoad,
  onError,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const borderClass = showBorder ? `border-2 ${borderColor}` : '';

  if (!src || imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center ${textSizeClasses[size]} font-medium text-gray-600 ${borderClass} ${className}`}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={onLoad}
      onError={handleError}
      className={`${sizeClasses[size]} rounded-full object-cover ${borderClass} ${className}`}
    />
  );
}; 