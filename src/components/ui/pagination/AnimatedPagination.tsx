import React, { useState, useEffect } from 'react';

interface AnimatedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const AnimatedPagination: React.FC<AnimatedPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

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

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || isAnimating) return;

    setDirection(newPage > currentPage ? 'right' : 'left');
    setIsAnimating(true);

    // Simulate page change animation
    setTimeout(() => {
      onPageChange(newPage);
      setIsAnimating(false);
      setDirection(null);
    }, 150);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination Navigation">
      <div className="relative">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform
              ${
                currentPage === 1 || isAnimating
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100 scale-95'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95'
              }
            `}
            aria-label="Go to previous page"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="relative overflow-hidden">
            <div
              className={`
                flex items-center space-x-1 transition-transform duration-300 ease-in-out
                ${
                  isAnimating && direction === 'left'
                    ? 'transform translate-x-2'
                    : isAnimating && direction === 'right'
                    ? 'transform -translate-x-2'
                    : 'transform translate-x-0'
                }
              `}
            >
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isAnimating}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 transform
                    ${
                      page === currentPage
                        ? 'bg-blue-600 text-white shadow-lg scale-110 z-10'
                        : isAnimating
                        ? 'text-gray-500 bg-gray-100 scale-95'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95'
                    }
                  `}
                  style={{
                    transitionDelay: isAnimating ? `${Math.abs(page - currentPage) * 50}ms` : '0ms'
                  }}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  <span
                    className={`
                      transition-all duration-300
                      ${
                        page === currentPage && !isAnimating
                          ? 'animate-pulse'
                          : ''
                      }
                    `}
                  >
                    {page}
                  </span>
                  
                  {/* Ripple effect */}
                  {page === currentPage && (
                    <span
                      className={`
                        absolute inset-0 rounded-md bg-white opacity-25
                        ${isAnimating ? 'animate-ping' : ''}
                      `}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform
              ${
                currentPage === totalPages || isAnimating
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100 scale-95'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95'
              }
            `}
            aria-label="Go to next page"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Loading indicator */}
        {isAnimating && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 