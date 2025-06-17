import React, { useEffect, useState } from 'react';

export interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  animation?: 'fade' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  duration?: 'fast' | 'normal' | 'slow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  animation = 'scale',
  duration = 'normal',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const durationClasses = {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500'
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const getAnimationClasses = () => {
    const baseClasses = `transform transition-all ${durationClasses[duration]} ease-out`;
    
    switch (animation) {
      case 'fade':
        return {
          enter: `${baseClasses} opacity-100`,
          exit: `${baseClasses} opacity-0`
        };
      case 'scale':
        return {
          enter: `${baseClasses} opacity-100 scale-100`,
          exit: `${baseClasses} opacity-0 scale-95`
        };
      case 'slideUp':
        return {
          enter: `${baseClasses} opacity-100 translate-y-0`,
          exit: `${baseClasses} opacity-0 translate-y-4`
        };
      case 'slideDown':
        return {
          enter: `${baseClasses} opacity-100 translate-y-0`,
          exit: `${baseClasses} opacity-0 -translate-y-4`
        };
      case 'slideLeft':
        return {
          enter: `${baseClasses} opacity-100 translate-x-0`,
          exit: `${baseClasses} opacity-0 translate-x-4`
        };
      case 'slideRight':
        return {
          enter: `${baseClasses} opacity-100 translate-x-0`,
          exit: `${baseClasses} opacity-0 -translate-x-4`
        };
      default:
        return {
          enter: `${baseClasses} opacity-100 scale-100`,
          exit: `${baseClasses} opacity-0 scale-95`
        };
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setIsAnimating(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  const animationClasses = getAnimationClasses();

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center p-4 z-50
        transition-opacity ${durationClasses[duration]}
        ${isVisible ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0'}
      `}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-hidden
          ${sizeClasses[size]}
          ${isVisible ? animationClasses.enter : animationClasses.exit}
          ${className}
        `}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors transform hover:scale-110 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedModal; 