import React from 'react';

interface PaginationWithSummaryProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationWithSummary: React.FC<PaginationWithSummaryProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = ''
}) => {
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

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Summary */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span>
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </span>
        <span>
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </span>
      </div>

      {/* Pagination */}
      <nav className="flex items-center justify-center" aria-label="Pagination Navigation">
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
      </nav>

      {/* Additional Summary */}
      <div className="text-center text-xs text-gray-500">
        {totalItems === 0 ? (
          'No results found'
        ) : (
          <>
            {totalItems === 1 ? '1 result' : `${totalItems} results`} •{' '}
            {totalPages === 1 ? '1 page' : `${totalPages} pages`}
          </>
        )}
      </div>
    </div>
  );
}; 