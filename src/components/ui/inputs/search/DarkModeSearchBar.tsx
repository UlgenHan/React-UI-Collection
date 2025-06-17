import React, { useState } from 'react';

interface DarkModeSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  dark?: boolean;
  className?: string;
}

export const DarkModeSearchBar: React.FC<DarkModeSearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value: controlledValue,
  dark = false,
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
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const lightClasses = {
    container: 'bg-white border-gray-300',
    input: 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500',
    icon: 'text-gray-400',
  };

  const darkClasses = {
    container: 'bg-gray-800 border-gray-600',
    input: 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400',
    icon: 'text-gray-400',
  };

  const classes = dark ? darkClasses : lightClasses;

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className={`h-5 w-5 ${classes.icon}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:placeholder-gray-400 focus:ring-1 transition-colors ${classes.container} ${classes.input}`}
          aria-label="Search"
        />
      </div>
    </form>
  );
}; 