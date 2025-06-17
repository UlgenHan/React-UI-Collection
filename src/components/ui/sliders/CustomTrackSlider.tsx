import React from 'react';

interface CustomTrackSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const CustomTrackSlider: React.FC<CustomTrackSliderProps> = ({
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
        className="w-full h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full appearance-none cursor-pointer"
        aria-label="Custom track slider"
      />
      
      <div className="text-center mt-3">
        <span className="text-lg font-bold text-purple-600">
          {value}
        </span>
      </div>
    </div>
  );
}; 