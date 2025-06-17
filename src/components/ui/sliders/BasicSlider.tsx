import React from 'react';

interface BasicSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const BasicSlider: React.FC<BasicSliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider::-webkit-slider-thumb:appearance-none slider::-webkit-slider-thumb:h-4 slider::-webkit-slider-thumb:w-4 slider::-webkit-slider-thumb:rounded-full slider::-webkit-slider-thumb:bg-blue-500 slider::-webkit-slider-thumb:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
        }}
        aria-label="Basic slider"
      />
    </div>
  );
}; 