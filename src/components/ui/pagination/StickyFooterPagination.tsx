import React from 'react';

interface StickyFooterPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showSummary?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export const StickyFooterPagination: React.FC<StickyFooterPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showSummary = false,
  totalItems = 0,
  itemsPerPage = 10
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
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-3 sm:space-y-0">
          {/* Summary (optional) */}
          {showSummary && totalItems > 0 && (
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startItem}</span> to{' '}
              <span className="font-medium">{endItem}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </div>
          )}

          {/* Pagination Controls */}
          <nav className="flex items-center" aria-label="Pagination Navigation">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }
                `}
                aria-label="Go to previous page"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                      ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }
                    `}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Mobile page indicator */}
              <div className="sm:hidden px-3 py-2 text-sm text-gray-700">
                {currentPage} / {totalPages}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
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

          {!showSummary && (
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 