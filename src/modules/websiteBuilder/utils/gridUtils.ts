export interface GridConfig {
  size: number;
  enabled: boolean;
}

export const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const snapPositionToGrid = (
  position: { x: number; y: number },
  gridSize: number
): { x: number; y: number } => {
  return {
    x: snapToGrid(position.x, gridSize),
    y: snapToGrid(position.y, gridSize)
  };
};

export const snapSizeToGrid = (
  size: { width: number; height: number },
  gridSize: number
): { width: number; height: number } => {
  return {
    width: snapToGrid(size.width, gridSize),
    height: snapToGrid(size.height, gridSize)
  };
};

export const getGridLines = (
  canvasSize: { width: number; height: number },
  gridSize: number
): { vertical: number[]; horizontal: number[] } => {
  const vertical: number[] = [];
  const horizontal: number[] = [];

  for (let x = 0; x <= canvasSize.width; x += gridSize) {
    vertical.push(x);
  }

  for (let y = 0; y <= canvasSize.height; y += gridSize) {
    horizontal.push(y);
  }

  return { vertical, horizontal };
};

export const isNearGridLine = (
  value: number,
  gridSize: number,
  threshold: number = 5
): boolean => {
  const snapped = snapToGrid(value, gridSize);
  return Math.abs(value - snapped) <= threshold;
}; 