import React from 'react';

interface BorderedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const BorderedPagination: React.FC<BorderedPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination Navigation">
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-4 py-3 text-sm font-medium border-r-2 border-gray-300 transition-all duration-200
            ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600'
            }
          `}
          aria-label="Go to previous page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-4 py-3 text-sm font-medium transition-all duration-200
              ${index < totalPages - 1 ? 'border-r-2 border-gray-300' : ''}
              ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600'
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
            px-4 py-3 text-sm font-medium border-l-2 border-gray-300 transition-all duration-200
            ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600'
            }
          `}
          aria-label="Go to next page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  );
}; 