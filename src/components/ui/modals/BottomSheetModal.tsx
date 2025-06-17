import React, { useEffect, useState } from 'react';

export interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: 'auto' | 'half' | 'full';
  showHandle?: boolean;
  showCloseButton?: boolean;
  closeOnSwipeDown?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'auto',
  showHandle = true,
  showCloseButton = true,
  closeOnSwipeDown = true,
  closeOnOverlayClick = true,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const heightClasses = {
    auto: 'max-h-[80vh]',
    half: 'h-1/2',
    full: 'h-full'
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

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

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black transition-opacity duration-300 z-50
        ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}
      `}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`
          fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl
          transform transition-transform duration-300 ease-out
          ${heightClasses[height]}
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          ${className}
        `}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
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
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheetModal; 