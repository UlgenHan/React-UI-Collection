import React, { useEffect, useState } from 'react';

interface AnimatedDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  content: React.ReactNode;
  animation?: 'fade' | 'scale' | 'slideUp' | 'slideDown';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  className?: string;
}

export const AnimatedDialog: React.FC<AnimatedDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  animation = 'scale',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showCancel = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
  };

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-out';
    
    switch (animation) {
      case 'fade':
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'scale':
        return `${baseClasses} transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`;
      case 'slideUp':
        return `${baseClasses} transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`;
      case 'slideDown':
        return `${baseClasses} transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`;
      default:
        return baseClasses;
    }
  };

  const getBackdropClasses = () => {
    return `transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`;
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ${getBackdropClasses()}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="animated-dialog-title"
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto ${getAnimationClasses()} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 id="animated-dialog-title" className="text-lg font-semibold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="text-gray-600 mb-6">
            {content}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          {showCancel && (
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 