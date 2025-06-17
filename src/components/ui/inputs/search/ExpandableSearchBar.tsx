import React, { useState, useRef } from 'react';

interface ExpandableSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  collapsedWidth?: string;
  expandedWidth?: string;
  className?: string;
}

export const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value: controlledValue,
  collapsedWidth = 'w-12',
  expandedWidth = 'w-64',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsExpanded(false);
    }
  };

  const handleIconClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      onSearch?.(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isExpanded ? expandedWidth : collapsedWidth
        } h-10`}
      >
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer z-10"
          onClick={handleIconClick}
        >
          <svg
            className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
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
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={isExpanded ? placeholder : ''}
          className={`block w-full h-full pl-10 pr-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
            !isExpanded ? 'cursor-pointer' : ''
          }`}
          aria-label="Search"
          readOnly={!isExpanded}
        />
      </div>
    </form>
  );
}; 