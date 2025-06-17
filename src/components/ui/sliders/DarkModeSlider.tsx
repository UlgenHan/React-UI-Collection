import React from 'react';

interface DarkModeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const DarkModeSlider: React.FC<DarkModeSliderProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={`w-full bg-gray-900 p-4 rounded-lg ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-100">
            {label}
          </label>
          <span className="text-sm font-medium text-blue-400">
            {value}
          </span>
        </div>
      )}
      
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        aria-label={label || "Dark mode slider"}
      />
    </div>
  );
}; 