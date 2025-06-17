import React from 'react';

interface SliderWithStepsProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showStepLabels?: boolean;
  className?: string;
}

export const SliderWithSteps: React.FC<SliderWithStepsProps> = ({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 10,
  disabled = false,
  showStepLabels = true,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const steps = [];
  for (let i = min; i <= max; i += step) {
    steps.push(i);
  }

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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-label="Stepped slider"
      />
      
      {showStepLabels && (
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {steps.map((stepValue) => (
            <span key={stepValue}>{stepValue}</span>
          ))}
        </div>
      )}
    </div>
  );
}; 