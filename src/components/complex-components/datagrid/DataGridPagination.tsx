import React from 'react';

interface DataGridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DataGridPagination: React.FC<DataGridPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex justify-end items-center space-x-2 mt-4" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default DataGridPagination; 