import React from 'react';

interface ToastItem {
  id: string;
  message: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

interface StackedToastProps {
  toasts: ToastItem[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: (toastId: string) => void;
  className?: string;
}

export const StackedToast: React.FC<StackedToastProps> = ({
  toasts,
  position = 'top-right',
  onClose,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={`fixed z-50 ${positionClasses[position]} ${className}`}>
      <div className="space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform ${
              variantClasses[toast.variant || 'info']
            }`}
            style={{
              transform: `translateY(${index * 4}px) scale(${1 - index * 0.05})`,
              zIndex: 1000 - index,
            }}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium mr-4">{toast.message}</p>
              {onClose && (
                <button
                  onClick={() => onClose(toast.id)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Close toast"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 