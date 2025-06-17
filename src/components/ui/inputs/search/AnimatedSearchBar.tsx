import React, { useState, useEffect } from 'react';

interface AnimatedSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  animation?: 'fade' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight';
  className?: string;
}

export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value: controlledValue,
  isOpen: controlledIsOpen,
  onToggle,
  animation = 'slideDown',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onToggle?.(newIsOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    } else if (e.key === 'Escape') {
      handleToggle();
    }
  };

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    switch (animation) {
      case 'fade':
        return `${baseClasses} ${isOpen ? 'opacity-100' : 'opacity-0'}`;
      case 'slideDown':
        return `${baseClasses} transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`;
      case 'slideUp':
        return `${baseClasses} transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`;
      case 'slideLeft':
        return `${baseClasses} transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`;
      case 'slideRight':
        return `${baseClasses} transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleToggle}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
        aria-label="Toggle search"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {shouldRender && (
        <div className={`absolute top-full left-0 right-0 mt-2 ${getAnimationClasses()}`}>
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
                aria-label="Search"
                autoFocus={isOpen}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}; 