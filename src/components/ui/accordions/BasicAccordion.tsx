import React, { useState } from 'react';

interface BasicAccordionProps {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

export const BasicAccordion: React.FC<BasicAccordionProps> = ({
  title,
  content,
  defaultOpen = false,
  onToggle,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-t-lg"
        aria-expanded={isOpen}
        aria-controls="accordion-content"
      >
        <div className="flex justify-between items-center">
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div
          id="accordion-content"
          className="px-4 py-3 text-gray-700 border-t border-gray-200"
          role="region"
          aria-labelledby="accordion-header"
        >
          {content}
        </div>
      )}
    </div>
  );
}; 