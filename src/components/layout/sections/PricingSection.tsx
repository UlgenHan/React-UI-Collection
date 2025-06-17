import React from 'react';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  featured?: boolean;
  ctaText?: string;
  onCTAClick?: () => void;
}

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingToggle?: {
    monthly: string;
    yearly: string;
    onToggle: (period: 'monthly' | 'yearly') => void;
    current: 'monthly' | 'yearly';
  };
  backgroundColor?: 'white' | 'gray-50' | 'gray-100';
  className?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  title,
  subtitle,
  plans,
  billingToggle,
  backgroundColor = 'white',
  className = ''
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle || billingToggle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {title}
              </h2>
            )}
            
            {billingToggle && (
              <div className="flex items-center justify-center mb-8">
                <span className={`mr-3 ${billingToggle.current === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  {billingToggle.monthly}
                </span>
                <button
                  onClick={() => billingToggle.onToggle(billingToggle.current === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      billingToggle.current === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`ml-3 ${billingToggle.current === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  {billingToggle.yearly}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl ${
                plan.featured
                  ? 'bg-blue-600 text-white shadow-2xl scale-105 lg:scale-110'
                  : 'bg-white text-gray-900 shadow-lg'
              } p-8`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                
                {plan.description && (
                  <p className={`mb-6 ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                )}

                <div className="mb-8">
                  <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-lg ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>

                <button
                  onClick={plan.onCTAClick}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 mb-8 ${
                    plan.featured
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.ctaText || 'Get Started'}
                </button>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {feature.included ? (
                      <svg className={`w-5 h-5 mr-3 ${plan.featured ? 'text-green-300' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className={`w-5 h-5 mr-3 ${plan.featured ? 'text-red-300' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`${
                      feature.included 
                        ? (plan.featured ? 'text-white' : 'text-gray-700')
                        : (plan.featured ? 'text-blue-100' : 'text-gray-400')
                    } ${!feature.included ? 'line-through' : ''}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 