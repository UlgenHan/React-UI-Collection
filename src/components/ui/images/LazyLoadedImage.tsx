import React, { useState, useRef, useEffect } from 'react';

interface LazyLoadedImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  placeholder?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  threshold?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyLoadedImage: React.FC<LazyLoadedImageProps> = ({
  src,
  alt,
  width = 'w-full',
  height = 'h-64',
  placeholder,
  rounded = 'lg',
  objectFit = 'cover',
  threshold = 0.1,
  className = '',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

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

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  return (
    <div
      ref={imgRef}
      className={`${width} ${height} ${roundedClasses[rounded]} overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}
    >
      {!isInView ? (
        <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ) : imageError ? (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      ) : (
        <>
          {placeholder && !isLoaded && (
            <img
              src={placeholder}
              alt=""
              className={`w-full h-full ${objectFitClasses[objectFit]} opacity-50`}
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full ${objectFitClasses[objectFit]} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${placeholder && !isLoaded ? 'absolute inset-0' : ''}`}
          />
        </>
      )}
    </div>
  );
}; 