import React, { useEffect, useState } from 'react';

export interface SidePanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showOverlay?: boolean;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const SidePanelModal: React.FC<SidePanelModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = 'md',
  showOverlay = true,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const widthClasses = {
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[28rem]',
    xl: 'w-[32rem]',
    full: 'w-full'
  };

  const getPositionClasses = () => {
    if (position === 'left') {
      return {
        container: 'justify-start',
        panel: isOpen ? 'translate-x-0' : '-translate-x-full',
        enter: 'translate-x-0',
        exit: '-translate-x-full'
      };
    } else {
      return {
        container: 'justify-end',
        panel: isOpen ? 'translate-x-0' : 'translate-x-full',
        enter: 'translate-x-0',
        exit: 'translate-x-full'
      };
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const positionClasses = getPositionClasses();

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
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex ${positionClasses.container}
        ${showOverlay ? `transition-colors duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'bg-transparent'}` : ''}
      `}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`
          h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out
          ${widthClasses[width]} ${positionClasses.panel}
          ${className}
        `}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`
          overflow-y-auto flex-1
          ${title || showCloseButton ? 'h-[calc(100vh-80px)]' : 'h-full'}
          ${title || showCloseButton ? 'p-6' : 'p-0'}
        `}>
          {children}
        </div>

        {/* Mobile drag indicator */}
        <div className="md:hidden flex justify-center py-2 bg-gray-50">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SidePanelModal; 