import React from 'react';

export interface CallToActionSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA: {
    text: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundGradient?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  backgroundColor?: 'white' | 'gray-900' | 'blue-600' | 'purple-600';
  textColor?: 'white' | 'gray-900';
  overlay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  backgroundGradient,
  backgroundColor = 'blue-600',
  textColor = 'white',
  overlay = true,
  size = 'lg',
  alignment = 'center',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'gray-900': 'bg-gray-900',
    'blue-600': 'bg-blue-600',
    'purple-600': 'bg-purple-600'
  };

  const gradientClasses = {
    blue: 'bg-gradient-to-r from-blue-600 to-blue-800',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-600',
    green: 'bg-gradient-to-r from-green-600 to-blue-600',
    orange: 'bg-gradient-to-r from-orange-500 to-red-600',
    red: 'bg-gradient-to-r from-red-600 to-pink-600'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const textColorClasses = {
    white: 'text-white',
    'gray-900': 'text-gray-900'
  };

  const getBackgroundClass = () => {
    if (backgroundGradient) return gradientClasses[backgroundGradient];
    if (backgroundImage || backgroundVideo) return '';
    return backgroundClasses[backgroundColor];
  };

  return (
    <section className={`relative ${sizeClasses[size]} ${getBackgroundClass()} overflow-hidden ${className}`}>
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}>
          <div className={alignmentClasses[alignment]}>
            {subtitle && (
              <p className={`text-lg font-medium mb-4 ${
                textColor === 'white' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {subtitle}
              </p>
            )}
            
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${textColorClasses[textColor]}`}>
              {title}
            </h2>
            
            {description && (
              <p className={`text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed ${
                alignment === 'center' ? 'mx-auto' : ''
              } ${textColor === 'white' ? 'text-gray-200' : 'text-gray-600'}`}>
                {description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={primaryCTA.onClick}
                className={`px-8 py-4 font-semibold rounded-lg transition-all duration-200 text-lg transform hover:scale-105 ${
                  textColor === 'white'
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                }`}
              >
                {primaryCTA.text}
              </button>
              
              {secondaryCTA && (
                <button
                  onClick={secondaryCTA.onClick}
                  className={`px-8 py-4 font-semibold rounded-lg transition-all duration-200 text-lg border-2 ${
                    textColor === 'white'
                      ? 'border-white text-white hover:bg-white hover:text-gray-900'
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {secondaryCTA.text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
      </div>
    </section>
  );
};

export default CallToActionSection; 