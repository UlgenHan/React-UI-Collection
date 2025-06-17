import React, { useState } from 'react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  layout?: 'grid' | 'masonry';
  columns?: 2 | 3 | 4 | 5;
  lightbox?: boolean;
  backgroundColor?: 'white' | 'gray-50' | 'gray-100';
  className?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  images,
  layout = 'grid',
  columns = 3,
  lightbox = true,
  backgroundColor = 'white',
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  const columnClasses = {
    2: layout === 'masonry' ? 'columns-2' : 'grid-cols-2',
    3: layout === 'masonry' ? 'columns-2 md:columns-3' : 'grid-cols-2 md:grid-cols-3',
    4: layout === 'masonry' ? 'columns-2 md:columns-3 lg:columns-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: layout === 'masonry' ? 'columns-2 md:columns-3 lg:columns-5' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    if (lightbox) {
      setSelectedImage(image);
      setCurrentIndex(index);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Gallery */}
        <div className={`${layout === 'masonry' ? columnClasses[columns] : `grid ${columnClasses[columns]}`} gap-4`}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${layout === 'masonry' ? 'break-inside-avoid mb-4' : 'aspect-square'} group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300`}
              onClick={() => openLightbox(image, index)}
            >
              <div className="relative h-full">
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />
              
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
                  <p className="text-white text-center">{selectedImage.caption}</p>
                </div>
              )}

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image counter */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection; 