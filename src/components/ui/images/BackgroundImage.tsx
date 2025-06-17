import React from 'react';

interface BackgroundImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'auto' | 'cover' | 'contain';
  repeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt,
  children,
  width = 'w-full',
  height = 'h-64',
  position = 'center',
  size = 'cover',
  repeat = 'no-repeat',
  overlay = false,
  overlayColor = 'bg-black',
  overlayOpacity = 'medium',
  rounded = 'lg',
  className = '',
}) => {
  const positionClasses = {
    center: 'bg-center',
    top: 'bg-top',
    bottom: 'bg-bottom',
    left: 'bg-left',
    right: 'bg-right',
    'top-left': 'bg-left-top',
    'top-right': 'bg-right-top',
    'bottom-left': 'bg-left-bottom',
    'bottom-right': 'bg-right-bottom',
  };

  const sizeClasses = {
    auto: 'bg-auto',
    cover: 'bg-cover',
    contain: 'bg-contain',
  };

  const repeatClasses = {
    repeat: 'bg-repeat',
    'no-repeat': 'bg-no-repeat',
    'repeat-x': 'bg-repeat-x',
    'repeat-y': 'bg-repeat-y',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const overlayOpacityClasses = {
    light: 'bg-opacity-25',
    medium: 'bg-opacity-50',
    dark: 'bg-opacity-75',
  };

  return (
    <div
      className={`${width} ${height} ${positionClasses[position]} ${sizeClasses[size]} ${repeatClasses[repeat]} ${roundedClasses[rounded]} relative overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt}
    >
      {overlay && (
        <div className={`absolute inset-0 ${overlayColor} ${overlayOpacityClasses[overlayOpacity]}`} />
      )}
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}; 