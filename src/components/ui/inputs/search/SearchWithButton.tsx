import React, { useState } from 'react';

interface SearchWithButtonProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  buttonText?: string;
  disabled?: boolean;
  className?: string;
}

export const SearchWithButton: React.FC<SearchWithButtonProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value: controlledValue,
  buttonText = 'Search',
  disabled = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSearch?.(value);
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      onSearch?.(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-md ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="block w-full px-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          aria-label="Search"
        />
      </div>
      <button
        type="submit"
        onClick={handleButtonClick}
        disabled={disabled}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
}; 