import React, { useState, useEffect } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  thumbnail?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  showZoomIcon?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  thumbnail,
  width = 'w-full',
  height = 'h-64',
  rounded = 'lg',
  objectFit = 'cover',
  loading = 'lazy',
  showZoomIcon = true,
  className = '',
  onLoad,
  onError,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${width} ${height} relative group cursor-pointer overflow-hidden ${roundedClasses[rounded]} ${className}`} onClick={openLightbox}>
        <img
          src={thumbnail || src}
          alt={alt}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
          className={`w-full h-full ${objectFitClasses[objectFit]} transition-transform duration-300 group-hover:scale-105`}
        />
        {showZoomIcon && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}; 