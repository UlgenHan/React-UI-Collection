import { useState, useMemo } from 'react';
import type { RowData } from './types';

export function usePagination(
  data: RowData[],
  initialPage: number = 1,
  pageSize: number = 10
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    currentPage,
    totalPages,
    pagedData,
    setCurrentPage: goToPage,
  };
} 