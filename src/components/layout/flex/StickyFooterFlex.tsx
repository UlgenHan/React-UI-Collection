import React from 'react';

export interface StickyFooterFlexProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
  minHeight?: 'screen' | '96' | '80' | '64';
  className?: string;
}

const StickyFooterFlex: React.FC<StickyFooterFlexProps> = ({
  header,
  children,
  footer,
  minHeight = 'screen',
  className = ''
}) => {
  const heightClasses = {
    screen: 'min-h-screen',
    '96': 'min-h-96',
    '80': 'min-h-80',
    '64': 'min-h-64'
  };

  return (
    <div className={`flex flex-col ${heightClasses[minHeight]} ${className}`}>
      {header && <div className="flex-shrink-0">{header}</div>}
      <div className="flex-1">{children}</div>
      <div className="flex-shrink-0 mt-auto">{footer}</div>
    </div>
  );
};

export default StickyFooterFlex; 