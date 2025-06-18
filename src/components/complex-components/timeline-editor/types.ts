export type TrackType = 'video' | 'audio' | 'caption';

export interface Track {
  id: string;
  label: string;
  type: TrackType;
}

export interface Clip {
  id: string;
  trackId: string;
  start: number;
  end: number;
  duration: number;
  label: string;
  type: TrackType;
}

export interface TimelineState {
  tracks: Track[];
  clips: Clip[];
  selectedClipId?: string;
  playheadTime: number;
  zoomLevel: number;
}

export type TimelineAction =
  | { type: 'ADD_TRACK'; track: Track }
  | { type: 'REMOVE_TRACK'; trackId: string }
  | { type: 'ADD_CLIP'; clip: Clip }
  | { type: 'REMOVE_CLIP'; clipId: string }
  | { type: 'SELECT_CLIP'; clipId?: string }
  | { type: 'MOVE_CLIP'; clipId: string; newStart: number }
  | { type: 'RESIZE_CLIP'; clipId: string; newStart: number; newEnd: number }
  | { type: 'SPLIT_CLIP'; clipId: string; at: number }
  | { type: 'SET_PLAYHEAD'; time: number }
  | { type: 'SET_ZOOM'; zoom: number }; 