import React, { useState, useRef } from 'react';

interface DoubleThumbSliderProps {
  minValue?: number;
  maxValue?: number;
  onChange?: (min: number, max: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const DoubleThumbSlider: React.FC<DoubleThumbSliderProps> = ({
  minValue = 20,
  maxValue = 80,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxValue - step);
    onChange?.(newMin, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minValue + step);
    onChange?.(minValue, newMax);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative h-2 bg-gray-200 rounded-lg">
        <div
          className="absolute h-2 bg-blue-500 rounded-lg"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        
        <input
          type="range"
          value={minValue}
          onChange={handleMinChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          aria-label="Minimum value"
        />
        
        <input
          type="range"
          value={maxValue}
          onChange={handleMaxChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          aria-label="Maximum value"
        />
      </div>
    </div>
  );
}; 