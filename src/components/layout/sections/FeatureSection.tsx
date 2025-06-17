import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  layout?: 'grid' | 'flex';
  iconPosition?: 'top' | 'left';
  backgroundColor?: 'white' | 'gray-50' | 'gray-100' | 'blue-50';
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  layout = 'grid',
  iconPosition = 'top',
  backgroundColor = 'white',
  className = ''
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100',
    'blue-50': 'bg-blue-50'
  };

  const featureItemClasses = iconPosition === 'top' 
    ? 'text-center' 
    : 'flex gap-4 text-left';

  const iconClasses = iconPosition === 'top'
    ? 'mx-auto mb-4 w-12 h-12 text-blue-600'
    : 'flex-shrink-0 w-12 h-12 text-blue-600';

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

        {/* Features */}
        <div className={`${layout === 'grid' ? `grid ${columnClasses[columns]} gap-8` : 'flex flex-wrap justify-center gap-8'}`}>
          {features.map((feature, index) => (
            <div key={index} className={featureItemClasses}>
              {iconPosition === 'top' ? (
                <>
                  <div className={iconClasses}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={iconClasses}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 