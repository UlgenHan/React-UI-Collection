import { useState, useCallback } from 'react';
import { CanvasComponent } from './types';

interface UndoRedoState {
  past: CanvasComponent[][];
  present: CanvasComponent[];
  future: CanvasComponent[][];
}

export const useUndoRedo = (initialState: CanvasComponent[] = []) => {
  const [state, setState] = useState<UndoRedoState>({
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const updateState = useCallback((newPresent: CanvasComponent[]) => {
    setState(currentState => ({
      past: [...currentState.past, currentState.present],
      present: newPresent,
      future: []
    }));
  }, []);

  const undo = useCallback(() => {
    setState(currentState => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState({
      past: [],
      present: state.present,
      future: []
    });
  }, [state.present]);

  return {
    components: state.present,
    updateComponents: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  };
}; 