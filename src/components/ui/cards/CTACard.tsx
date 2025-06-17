import React from 'react';

export interface CTACardProps {
  title: string;
  message?: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  backgroundPattern?: boolean;
  className?: string;
}

const CTACard: React.FC<CTACardProps> = ({
  title,
  message,
  buttonText,
  onButtonClick,
  secondaryButton,
  variant = 'primary',
  size = 'md',
  icon,
  backgroundPattern = false,
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white',
    secondary: 'bg-gradient-to-br from-gray-600 to-gray-700 text-white',
    success: 'bg-gradient-to-br from-green-600 to-green-700 text-white',
    warning: 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white',
    danger: 'bg-gradient-to-br from-red-600 to-red-700 text-white'
  };

  const sizeClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10'
  };

  const buttonVariantClasses = {
    primary: 'bg-white text-blue-600 hover:bg-gray-100',
    secondary: 'bg-white text-gray-600 hover:bg-gray-100',
    success: 'bg-white text-green-600 hover:bg-gray-100',
    warning: 'bg-white text-orange-600 hover:bg-gray-100',
    danger: 'bg-white text-red-600 hover:bg-gray-100'
  };

  const secondaryButtonClasses = {
    primary: 'border-white text-white hover:bg-white hover:text-blue-600',
    secondary: 'border-white text-white hover:bg-white hover:text-gray-600',
    success: 'border-white text-white hover:bg-white hover:text-green-600',
    warning: 'border-white text-white hover:bg-white hover:text-orange-600',
    danger: 'border-white text-white hover:bg-white hover:text-red-600'
  };

  return (
    <div
      className={`
        relative rounded-xl shadow-lg overflow-hidden
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='6' cy='6' r='4'/%3E%3Ccircle cx='54' cy='54' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      )}

      <div className="relative z-10 text-center">
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 text-white">
              {icon}
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold mb-4">
          {title}
        </h3>

        {message && (
          <p className="text-lg opacity-90 mb-6 leading-relaxed">
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onButtonClick}
            className={`
              px-6 py-3 rounded-lg font-semibold text-lg
              transition-all duration-200 transform hover:scale-105
              shadow-lg hover:shadow-xl
              ${buttonVariantClasses[variant]}
            `}
          >
            {buttonText}
          </button>

          {secondaryButton && (
            <button
              onClick={secondaryButton.onClick}
              className={`
                px-6 py-3 rounded-lg font-semibold text-lg border-2
                transition-all duration-200
                ${secondaryButtonClasses[variant]}
              `}
            >
              {secondaryButton.text}
            </button>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full" />
        <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full" />
        <div className="absolute top-12 right-12 w-6 h-6 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default CTACard; 