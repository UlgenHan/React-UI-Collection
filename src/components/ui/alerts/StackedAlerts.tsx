import React from 'react';

interface AlertItem {
  id: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  dismissable?: boolean;
}

interface StackedAlertsProps {
  alerts: AlertItem[];
  onDismiss?: (alertId: string) => void;
  className?: string;
}

export const StackedAlerts: React.FC<StackedAlertsProps> = ({
  alerts,
  onDismiss,
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const buttonVariantClasses = {
    success: 'text-green-500 hover:text-green-700',
    info: 'text-blue-500 hover:text-blue-700',
    warning: 'text-yellow-500 hover:text-yellow-700',
    error: 'text-red-500 hover:text-red-700',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 border rounded-lg relative ${variantClasses[alert.variant || 'info']}`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium pr-8">{alert.message}</p>
            {alert.dismissable && onDismiss && (
              <button
                onClick={() => onDismiss(alert.id)}
                className={`ml-2 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  buttonVariantClasses[alert.variant || 'info']
                }`}
                aria-label="Close alert"
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
  );
}; 