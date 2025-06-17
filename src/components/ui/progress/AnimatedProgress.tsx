import React, { useEffect, useState } from 'react';

interface AnimatedProgressProps {
  value: number;
  max?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  onComplete?: () => void;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max = 100,
  duration = 1000,
  easing = 'ease-out',
  className = '',
  size = 'md',
  variant = 'default',
  onComplete,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const currentPercentage = Math.min(Math.max((currentValue / max) * 100, 0), 100);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easingFunctions = {
        linear: (t: number) => t,
        'ease-in': (t: number) => t * t,
        'ease-out': (t: number) => 1 - Math.pow(1 - t, 2),
        'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      };

      const easedProgress = easingFunctions[easing](progress);
      const newValue = easedProgress * value;
      setCurrentValue(newValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, easing, onComplete]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
      role="progressbar"
      aria-valuenow={currentValue}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`h-full transition-none ${variantClasses[variant]}`}
        style={{ width: `${currentPercentage}%` }}
      />
    </div>
  );
}; 