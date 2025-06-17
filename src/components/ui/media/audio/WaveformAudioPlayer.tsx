import React, { useState, useRef, useEffect } from 'react';

interface WaveformAudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  autoplay?: boolean;
  loop?: boolean;
  waveformColor?: string;
  progressColor?: string;
  className?: string;
}

export const WaveformAudioPlayer: React.FC<WaveformAudioPlayerProps> = ({
  src,
  title,
  artist,
  autoplay = false,
  loop = false,
  waveformColor = 'bg-gray-300',
  progressColor = 'bg-blue-500',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate random waveform heights for visualization
  const waveformBars = Array.from({ length: 100 }, () => Math.random() * 100 + 10);

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

  const handleWaveformClick = (index: number) => {
    if (audioRef.current && duration) {
      const newTime = (index / waveformBars.length) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progress = duration ? currentTime / duration : 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 max-w-2xl ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoplay}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={title ? `${title}${artist ? ` by ${artist}` : ''}` : 'Audio player'}
      />
      
      {(title || artist) && (
        <div className="mb-4 text-center">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {artist && <p className="text-sm text-gray-600">{artist}</p>}
        </div>
      )}
      
      <div className="relative mb-6 h-20 flex items-end justify-center space-x-0.5 cursor-pointer">
        {waveformBars.map((height, index) => {
          const isActive = index / waveformBars.length <= progress;
          return (
            <div
              key={index}
              className={`w-1 transition-colors duration-300 ${
                isActive ? progressColor : waveformColor
              }`}
              style={{ height: `${height}%` }}
              onClick={() => handleWaveformClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleWaveformClick(index);
                }
              }}
              aria-label={`Seek to ${Math.round((index / waveformBars.length) * 100)}%`}
            />
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
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
        
        {isPlaying && (
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 ${progressColor} animate-pulse`}
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 