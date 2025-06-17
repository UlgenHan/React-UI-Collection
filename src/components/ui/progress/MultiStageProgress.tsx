import React from 'react';

interface Stage {
  id: string;
  label: string;
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

interface MultiStageProgressProps {
  stages: Stage[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showPercentages?: boolean;
}

export const MultiStageProgress: React.FC<MultiStageProgressProps> = ({
  stages,
  className = '',
  size = 'md',
  showLabels = true,
  showPercentages = false,
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {stages.map((stage) => {
        const percentage = Math.min(Math.max((stage.value / (stage.max || 100)) * 100, 0), 100);
        
        return (
          <div key={stage.id} className="w-full">
            {showLabels && (
              <div className={`flex justify-between items-center mb-1 ${textSizeClasses[size]}`}>
                <span className="font-medium text-gray-700">{stage.label}</span>
                {showPercentages && (
                  <span className="text-gray-500">{Math.round(percentage)}%</span>
                )}
              </div>
            )}
            <div
              className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
              role="progressbar"
              aria-valuenow={stage.value}
              aria-valuemin={0}
              aria-valuemax={stage.max || 100}
              aria-label={stage.label}
            >
              <div
                className={`h-full transition-all duration-300 ease-out ${
                  variantClasses[stage.variant || 'default']
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}; 