import React, { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  showClearButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  onClear,
  disabled = false,
  className = '',
  id,
  showClearButton = true,
  size = 'md'
}: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `search-input-${Math.random().toString(36).substr(2, 9)}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && value) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const sizeClasses = {
    sm: 'px-8 py-1.5 text-sm',
    md: 'px-10 py-2 text-base',
    lg: 'px-12 py-3 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconPositions = {
    sm: 'left-2.5',
    md: 'left-3',
    lg: 'left-4'
  };

  const clearPositions = {
    sm: 'right-2.5',
    md: 'right-3',
    lg: 'right-4'
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <div className={`absolute inset-y-0 ${iconPositions[size]} flex items-center pointer-events-none`}>
          <svg
            className={`${iconSizes[size]} ${focused ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-200`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full ${sizeClasses[size]} border border-gray-300 rounded-full text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            transition-all duration-200
            ${showClearButton && value ? 'pr-10' : 'pr-4'}
            ${focused ? 'shadow-md' : 'shadow-sm'}
          `}
          role="searchbox"
          aria-label="Search"
        />
        {showClearButton && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute inset-y-0 ${clearPositions[size]} flex items-center`}
            aria-label="Clear search"
          >
            <svg
              className={`${iconSizes[size]} text-gray-400 hover:text-gray-600 transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 