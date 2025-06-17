import React, { useState } from 'react';

interface InputPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const InputPagination: React.FC<InputPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputValue, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputValue('');
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className={`flex flex-col items-center space-y-4 ${className}`} aria-label="Pagination Navigation">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200
            ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-100 border-gray-200'
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            }
          `}
          aria-label="Go to previous page"
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200
              ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
              }
            `}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200
            ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed bg-gray-100 border-gray-200'
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            }
          `}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <label htmlFor="page-input" className="text-sm text-gray-600">
          Go to page:
        </label>
        <input
          id="page-input"
          type="number"
          min="1"
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={currentPage.toString()}
          aria-label="Enter page number"
        />
        <button
          type="submit"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200"
        >
          Go
        </button>
        <span className="text-sm text-gray-500">
          of {totalPages}
        </span>
      </form>
    </nav>
  );
}; 