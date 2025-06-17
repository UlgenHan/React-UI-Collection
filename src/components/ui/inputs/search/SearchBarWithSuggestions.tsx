import React, { useState, useRef, useEffect } from 'react';

interface Suggestion {
  id: string;
  text: string;
  category?: string;
}

interface SearchBarWithSuggestionsProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onSuggestionSelect?: (suggestion: Suggestion) => void;
  value?: string;
  suggestions?: Suggestion[];
  maxSuggestions?: number;
  showCategories?: boolean;
  className?: string;
}

export const SearchBarWithSuggestions: React.FC<SearchBarWithSuggestionsProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  onSuggestionSelect,
  value: controlledValue,
  suggestions = [],
  maxSuggestions = 5,
  showCategories = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const filteredSuggestions = suggestions
    .filter(suggestion => 
      suggestion.text.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, maxSuggestions);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (controlledValue === undefined) {
      setInternalValue(suggestion.text);
    }
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredSuggestions.length === 0) {
      if (e.key === 'Enter') {
        onSearch?.(value);
        setShowSuggestions(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        } else {
          onSearch?.(value);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (value.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      setTimeout(() => setShowSuggestions(false), 100);
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <form onSubmit={handleSubmit}>
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
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            role="combobox"
          />
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          role="listbox"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                index === selectedIndex
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <span className="flex-1">{suggestion.text}</span>
              {showCategories && suggestion.category && (
                <span className="text-xs text-gray-500 ml-2">
                  {suggestion.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 