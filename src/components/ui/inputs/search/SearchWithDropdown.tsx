import React, { useState } from 'react';

interface SearchOption {
  value: string;
  label: string;
}

interface SearchWithDropdownProps {
  placeholder?: string;
  onSearch?: (value: string, category: string) => void;
  onChange?: (value: string) => void;
  onCategoryChange?: (category: string) => void;
  value?: string;
  selectedCategory?: string;
  options?: SearchOption[];
  className?: string;
}

export const SearchWithDropdown: React.FC<SearchWithDropdownProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  onCategoryChange,
  value: controlledValue,
  selectedCategory: controlledCategory,
  options = [
    { value: 'all', label: 'All' },
    { value: 'products', label: 'Products' },
    { value: 'users', label: 'Users' },
    { value: 'articles', label: 'Articles' },
  ],
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [internalCategory, setInternalCategory] = useState(options[0]?.value || 'all');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    if (controlledCategory === undefined) {
      setInternalCategory(newCategory);
    }
    onCategoryChange?.(newCategory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value, selectedCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value, selectedCategory);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${className}`}>
      <div className="flex">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-3 py-2 border border-gray-300 border-r-0 rounded-l-md bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search category"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="block w-full px-3 py-2 border border-gray-300 rounded-r-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
        </div>
      </div>
    </form>
  );
}; 