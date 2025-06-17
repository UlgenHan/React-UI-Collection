import React, { useState, useRef, useEffect } from 'react';

interface Track {
  id: string;
  src: string;
  title: string;
  artist?: string;
  duration?: string;
}

interface PlaylistAudioPlayerProps {
  tracks: Track[];
  autoplay?: boolean;
  loop?: boolean;
  shuffle?: boolean;
  className?: string;
  onTrackChange?: (track: Track) => void;
}

export const PlaylistAudioPlayer: React.FC<PlaylistAudioPlayerProps> = ({
  tracks,
  autoplay = false,
  loop = false,
  shuffle = false,
  className = '',
  onTrackChange,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(shuffle);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (currentTrack) {
      onTrackChange?.(currentTrack);
    }
  }, [currentTrack, onTrackChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
  };

  const previousTrack = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    if (loop) {
      audioRef.current?.play();
    } else {
      nextTrack();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={`bg-white rounded-lg shadow-lg max-w-md ${className}`}>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        autoPlay={autoplay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        aria-label={`${currentTrack.title}${currentTrack.artist ? ` by ${currentTrack.artist}` : ''}`}
      />
      
      {/* Current Track Display */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{currentTrack.title}</h3>
        {currentTrack.artist && (
          <p className="text-sm text-gray-600 mb-4">{currentTrack.artist}</p>
        )}
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{currentTrack.duration || formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-2 rounded-full transition-colors ${
              isShuffled ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Toggle shuffle"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
            </svg>
          </button>
          
          <button
            onClick={previousTrack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Previous track"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button
            onClick={nextTrack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Next track"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
          
          <button
            className={`p-2 rounded-full transition-colors ${
              loop ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setIsShuffled(!isShuffled)}
            aria-label="Toggle loop"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Playlist */}
      <div className="max-h-48 overflow-y-auto border-t border-gray-200">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
              index === currentTrackIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.title}</p>
                {track.artist && (
                  <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                )}
              </div>
              {track.duration && (
                <span className="text-xs text-gray-500 ml-2">{track.duration}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 