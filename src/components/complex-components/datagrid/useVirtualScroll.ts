import { useRef, useState, useCallback } from 'react';
import type { RowData } from './types';

export function useVirtualScroll(
  data: RowData[],
  rowHeight: number = 40,
  overscan: number = 5
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * rowHeight;
  const visibleCount = containerRef.current
    ? Math.ceil(containerRef.current.offsetHeight / rowHeight)
    : 10;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    data.length,
    Math.ceil((scrollTop + (containerRef.current?.offsetHeight || 0)) / rowHeight) + overscan
  );
  const visibleRows = data.slice(startIndex, endIndex);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  return {
    containerRef,
    visibleRows,
    startIndex,
    endIndex,
    totalHeight,
    handleScroll,
  };
} 