import React from 'react';

export interface ModalContainerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: boolean;
  className?: string;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  isOpen = true,
  onClose,
  size = 'md',
  padding = 'md',
  overlay = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Modal Content */}
      <div className={`
        relative bg-white rounded-lg shadow-xl w-full
        ${sizeClasses[size]} ${paddingClasses[padding]} ${className}
      `}>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default ModalContainer; 