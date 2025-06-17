import React from 'react';

interface VerticalSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  height?: string;
  className?: string;
}

export const VerticalSlider: React.FC<VerticalSliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  height = '200px',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col items-center ${className}`} style={{ height }}>
      <div className="relative w-2 bg-gray-200 rounded-lg flex-1">
        <div
          className="absolute bottom-0 w-2 bg-blue-500 rounded-lg transition-all duration-150"
          style={{ height: `${percentage}%` }}
        />
        
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          orient="vertical"
          className="absolute inset-0 w-2 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{
            writingMode: 'bt-lr',
            WebkitAppearance: 'slider-vertical',
          }}
          aria-label="Vertical slider"
        />
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-blue-600">{value}</span>
      </div>
    </div>
  );
}; 