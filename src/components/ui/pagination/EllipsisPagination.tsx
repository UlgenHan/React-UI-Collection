import React from 'react';

interface EllipsisPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export const EllipsisPagination: React.FC<EllipsisPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  maxVisiblePages = 7
}) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = Math.floor(maxVisiblePages / 2);
    const left = currentPage - delta;
    const right = currentPage + delta;

    if (left <= 1) {
      const pages = Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1);
      return [...pages, '...', totalPages];
    }

    if (right >= totalPages) {
      const pages = Array.from({ length: maxVisiblePages - 1 }, (_, i) => totalPages - maxVisiblePages + 2 + i);
      return [1, '...', ...pages];
    }

    const pages = Array.from({ length: maxVisiblePages - 4 }, (_, i) => left + 1 + i);
    return [1, '...', ...pages, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination Navigation">
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

        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm text-gray-500" aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
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
            )}
          </React.Fragment>
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
  );
}; 