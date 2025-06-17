import React, { useState, useRef, useEffect } from 'react';

interface AutoplayAudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  volume?: number;
  loop?: boolean;
  showControls?: boolean;
  muted?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const AutoplayAudioPlayer: React.FC<AutoplayAudioPlayerProps> = ({
  src,
  title,
  artist,
  volume = 0.5,
  loop = false,
  showControls = true,
  muted = false,
  className = '',
  onPlay,
  onPause,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = currentVolume;
      // Attempt autoplay with user gesture handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            onPlay?.();
          })
          .catch(() => {
            // Autoplay was prevented, which is normal behavior
            console.log('Autoplay was prevented by the browser');
          });
      }
    }
  }, [currentVolume, onPlay]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 max-w-md ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        muted={muted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        aria-label={title ? `${title}${artist ? ` by ${artist}` : ''}` : 'Auto-playing audio'}
      />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-600 font-medium">AUTO-PLAY</span>
        </div>
        
        {isPlaying && (
          <div className="flex space-x-0.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-green-500 animate-pulse"
                style={{
                  height: `${Math.random() * 12 + 4}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {(title || artist) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>}
          {artist && <p className="text-sm text-gray-600 truncate">{artist}</p>}
        </div>
      )}
      
      {showControls && (
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <div className="flex items-center space-x-2 flex-1">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Volume control"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </button>
            
            {showVolumeSlider && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Volume"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 