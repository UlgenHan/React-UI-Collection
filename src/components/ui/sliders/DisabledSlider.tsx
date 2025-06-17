import React from 'react';

interface DisabledSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  reason?: string;
  className?: string;
}

export const DisabledSlider: React.FC<DisabledSliderProps> = ({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  label = 'Disabled Setting',
  reason = 'This setting is currently unavailable',
  className = '',
}) => {
  return (
    <div className={`w-full opacity-60 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-500">
          {label}
        </label>
        <span className="text-sm font-medium text-gray-400">
          {value}
        </span>
      </div>
      
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={true}
        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:cursor-not-allowed [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-200"
        style={{
          background: `linear-gradient(to right, #d1d5db 0%, #d1d5db ${((value - min) / (max - min)) * 100}%, #f3f4f6 ${((value - min) / (max - min)) * 100}%, #f3f4f6 100%)`,
        }}
        aria-label={`${label} - disabled`}
        aria-disabled="true"
      />
      
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {reason && (
        <p className="text-xs text-gray-400 mt-2 italic">
          {reason}
        </p>
      )}
    </div>
  );
}; 