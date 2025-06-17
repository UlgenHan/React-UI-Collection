import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface SearchableMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  keywords?: string[];
  description?: string;
}

export interface SearchableMenuProps {
  trigger: React.ReactNode;
  items: SearchableMenuItem[];
  placeholder?: string;
  emptyMessage?: string;
  maxHeight?: string;
  position?: 'left' | 'right' | 'center';
  className?: string;
}

const SearchableMenu: React.FC<SearchableMenuProps> = ({
  trigger,
  items,
  placeholder = 'Search...',
  emptyMessage = 'No results found',
  maxHeight = 'max-h-64',
  position = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => {
      const labelMatch = item.label.toLowerCase().includes(term);
      const descriptionMatch = item.description?.toLowerCase().includes(term);
      const keywordsMatch = item.keywords?.some(keyword => 
        keyword.toLowerCase().includes(term)
      );
      
      return labelMatch || descriptionMatch || keywordsMatch;
    });
  }, [items, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleItemClick = (item: SearchableMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      <div
        className={`absolute top-full mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-200 origin-top ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        } ${positionClasses[position]}`}
      >
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={`${maxHeight} overflow-y-auto`}>
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">{emptyMessage}</p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => {
                      if (item.disabled) {
                        e.preventDefault();
                      } else {
                        setIsOpen(false);
                        setSearchTerm('');
                      }
                    }}
                  >
                    {item.icon && <span className="mr-3 w-5 h-5 text-gray-400">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {highlightText(item.label, searchTerm)}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {highlightText(item.description, searchTerm)}
                        </p>
                      )}
                    </div>
                  </a>
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {item.icon && <span className="mr-3 w-5 h-5 text-gray-400">{item.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {highlightText(item.label, searchTerm)}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {highlightText(item.description, searchTerm)}
                        </p>
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        
        {filteredItems.length > 0 && (
          <div className="p-2 border-t border-gray-200 text-xs text-gray-500 text-center">
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableMenu; 