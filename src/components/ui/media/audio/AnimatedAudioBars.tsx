import React, { useState, useRef } from 'react';

interface AnimatedAudioBarsProps {
  src: string;
  title?: string;
  artist?: string;
  barCount?: number;
  barColor?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export const AnimatedAudioBars: React.FC<AnimatedAudioBarsProps> = ({
  src,
  title,
  artist,
  barCount = 12,
  barColor = 'bg-blue-500',
  autoplay = false,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Generate random animation delays and durations for each bar
  const bars = Array.from({ length: barCount }, (_, index) => ({
    id: index,
    animationDelay: `${Math.random() * 0.5}s`,
    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
    height: Math.random() * 60 + 20, // Random height between 20-80%
  }));

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 max-w-md ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoplay}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={title ? `${title}${artist ? ` by ${artist}` : ''}` : 'Audio player with animated bars'}
      />
      
      {/* Track Info */}
      {(title || artist) && (
        <div className="text-center mb-6">
          {title && <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>}
          {artist && <p className="text-sm text-gray-600">{artist}</p>}
        </div>
      )}
      
      {/* Animated Bars Visualizer */}
      <div className="flex items-end justify-center space-x-1 h-24 mb-6">
        {bars.map((bar) => (
          <div
            key={bar.id}
            className={`w-2 ${barColor} rounded-t transition-all duration-200 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              height: isPlaying ? `${bar.height}%` : '20%',
              animationDelay: isPlaying ? bar.animationDelay : '0s',
              animationDuration: isPlaying ? bar.animationDuration : '0s',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
            }}
          />
        ))}
      </div>
      
      {/* Play/Pause Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={togglePlayPause}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Status Indicator */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
        <span className="text-xs text-gray-500 font-medium">
          {isPlaying ? 'PLAYING' : 'PAUSED'}
        </span>
      </div>
      
      {/* Additional animated elements when playing */}
      {isPlaying && (
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 