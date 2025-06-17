import React from 'react';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  overlay?: boolean;
  alignment?: 'left' | 'center' | 'right';
  minHeight?: 'screen' | '96' | '80' | '64';
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  primaryCTA,
  secondaryCTA,
  overlay = true,
  alignment = 'center',
  minHeight = 'screen',
  className = ''
}) => {
  const heightClasses = {
    screen: 'min-h-screen',
    '96': 'min-h-96',
    '80': 'min-h-80',
    '64': 'min-h-64'
  };

  const alignmentClasses = {
    left: 'text-left justify-start items-start',
    center: 'text-center justify-center items-center',
    right: 'text-right justify-end items-end'
  };

  return (
    <section className={`relative ${heightClasses[minHeight]} flex flex-col ${alignmentClasses[alignment]} overflow-hidden ${className}`}>
      {/* Background Video */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay */}
      {overlay && (backgroundImage || backgroundVideo) && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {subtitle && (
            <p className="text-lg font-medium text-blue-400 mb-4">{subtitle}</p>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
          
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCTA && (
                <button
                  onClick={primaryCTA.onClick}
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
                >
                  {primaryCTA.text}
                </button>
              )}
              {secondaryCTA && (
                <button
                  onClick={secondaryCTA.onClick}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 text-lg"
                >
                  {secondaryCTA.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 