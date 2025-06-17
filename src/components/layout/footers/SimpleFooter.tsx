import React from 'react';

export interface SimpleFooterProps {
  companyName?: string;
  year?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const SimpleFooter: React.FC<SimpleFooterProps> = ({
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  bgColor = 'bg-white',
  textColor = 'text-gray-600',
  className = ''
}) => {
  return (
    <footer className={`py-8 border-t border-gray-200 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`text-sm ${textColor}`}>
            © {year} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter; 