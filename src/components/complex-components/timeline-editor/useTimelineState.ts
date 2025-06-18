import { useReducer } from 'react';
import type { TimelineState, TimelineAction, Track, Clip } from './types';

const initialState: TimelineState = {
  tracks: [
    { id: 'track1', label: 'Video Track', type: 'video' },
  ],
  clips: [
    { id: 'clip1', trackId: 'track1', start: 2, end: 12, duration: 10, label: 'Sample Clip', type: 'video' },
  ],
  selectedClipId: undefined,
  playheadTime: 0,
  zoomLevel: 2,
};

function reducer(state: TimelineState, action: TimelineAction): TimelineState {
  switch (action.type) {
    case 'ADD_TRACK':
      return { ...state, tracks: [...state.tracks, action.track] };
    case 'REMOVE_TRACK':
      return { ...state, tracks: state.tracks.filter(t => t.id !== action.trackId), clips: state.clips.filter(c => c.trackId !== action.trackId) };
    case 'ADD_CLIP':
      return { ...state, clips: [...state.clips, action.clip] };
    case 'REMOVE_CLIP':
      return { ...state, clips: state.clips.filter(c => c.id !== action.clipId) };
    case 'SELECT_CLIP':
      return { ...state, selectedClipId: action.clipId };
    case 'MOVE_CLIP':
      return { ...state, clips: state.clips.map(c => c.id === action.clipId ? { ...c, start: action.newStart, end: c.end } : c) };
    case 'RESIZE_CLIP':
      return { ...state, clips: state.clips.map(c => c.id === action.clipId ? { ...c, start: action.newStart, end: action.newEnd, duration: action.newEnd - action.newStart } : c) };
    case 'SPLIT_CLIP': {
      const clip = state.clips.find(c => c.id === action.clipId);
      if (!clip || action.at <= clip.start || action.at >= clip.end) return state;
      const left: Clip = { ...clip, end: action.at, duration: action.at - clip.start, id: clip.id + '_L' };
      const right: Clip = { ...clip, start: action.at, duration: clip.end - action.at, id: clip.id + '_R' };
      return { ...state, clips: [...state.clips.filter(c => c.id !== clip.id), left, right], selectedClipId: left.id };
    }
    case 'SET_PLAYHEAD':
      return { ...state, playheadTime: action.time };
    case 'SET_ZOOM':
      return { ...state, zoomLevel: action.zoom };
    default:
      return state;
  }
}

export function useTimelineState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,
    setZoomLevel: (z: (prev: number) => number) => dispatch({ type: 'SET_ZOOM', zoom: z(state.zoomLevel) }),
    setPlayheadTime: (t: number) => dispatch({ type: 'SET_PLAYHEAD', time: t }),
    selectClip: (id?: string) => dispatch({ type: 'SELECT_CLIP', clipId: id }),
    moveClip: (id: string, newStart: number) => dispatch({ type: 'MOVE_CLIP', clipId: id, newStart }),
    resizeClip: (id: string, newStart: number, newEnd: number) => dispatch({ type: 'RESIZE_CLIP', clipId: id, newStart, newEnd }),
    splitClip: (id: string, at: number) => dispatch({ type: 'SPLIT_CLIP', clipId: id, at }),
    addTrack: (track: Track) => dispatch({ type: 'ADD_TRACK', track }),
    removeTrack: (trackId: string) => dispatch({ type: 'REMOVE_TRACK', trackId }),
  };
} 