import React from 'react';

export interface StatisticCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  suffix?: string;
  prefix?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  size = 'md',
  suffix,
  prefix,
  loading = false,
  className = '',
  onClick
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      value: 'text-blue-900'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      value: 'text-green-900'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      value: 'text-red-900'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      value: 'text-yellow-900'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      value: 'text-purple-900'
    },
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'text-indigo-600',
      value: 'text-indigo-900'
    }
  };

  const sizeClasses = {
    sm: {
      padding: 'p-4',
      title: 'text-sm',
      value: 'text-2xl',
      icon: 'w-8 h-8'
    },
    md: {
      padding: 'p-6',
      title: 'text-base',
      value: 'text-3xl',
      icon: 'w-10 h-10'
    },
    lg: {
      padding: 'p-8',
      title: 'text-lg',
      value: 'text-4xl',
      icon: 'w-12 h-12'
    }
  };

  const formatValue = (val: string | number) => {
    if (loading) return '---';
    
    let formattedValue = '';
    if (prefix) formattedValue += prefix;
    formattedValue += val.toString();
    if (suffix) formattedValue += suffix;
    
    return formattedValue;
  };

  const getChangeIcon = () => {
    if (change?.type === 'increase') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17l-10-10M7 7h10v10" />
        </svg>
      );
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg border shadow-sm
        hover:shadow-md transition-shadow duration-200
        ${sizeClasses[size].padding}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`font-medium text-gray-600 ${sizeClasses[size].title}`}>
            {title}
          </h3>
          
          <div className={`font-bold mt-2 ${colorClasses[color].value} ${sizeClasses[size].value}`}>
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-24 rounded" />
            ) : (
              formatValue(value)
            )}
          </div>
          
          {change && !loading && (
            <div className="flex items-center mt-2">
              <span
                className={`flex items-center text-sm font-medium ${
                  change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {getChangeIcon()}
                <span className="ml-1">
                  {change.value > 0 ? '+' : ''}{change.value}%
                </span>
              </span>
              {change.period && (
                <span className="text-sm text-gray-500 ml-2">
                  {change.period}
                </span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`${colorClasses[color].bg} rounded-lg p-3`}>
            <div className={`${colorClasses[color].icon} ${sizeClasses[size].icon}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticCard; 