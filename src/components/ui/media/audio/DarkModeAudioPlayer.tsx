import React, { useState, useRef, useEffect } from 'react';

interface DarkModeAudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  album?: string;
  coverArt?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export const DarkModeAudioPlayer: React.FC<DarkModeAudioPlayerProps> = ({
  src,
  title,
  artist,
  album,
  coverArt,
  autoplay = false,
  loop = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden max-w-sm ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoplay}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={title ? `${title}${artist ? ` by ${artist}` : ''}` : 'Dark mode audio player'}
      />
      
      {/* Cover Art Section */}
      <div className="relative p-6 pb-4">
        {coverArt ? (
          <img
            src={coverArt}
            alt={`${album || title} cover`}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
        )}
        
        {/* Track Info */}
        <div className="text-center">
          {title && <h3 className="text-xl font-bold text-white mb-1 truncate">{title}</h3>}
          {artist && <p className="text-sm text-gray-300 mb-1 truncate">{artist}</p>}
          {album && <p className="text-xs text-gray-400 truncate">{album}</p>}
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="px-6 pb-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${progress}%, #374151 ${progress}%, #374151 100%)`
            }}
            aria-label="Seek audio"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Volume control"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            </button>
            
            {showVolumeSlider && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                aria-label="Volume"
              />
            )}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
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
          
          {/* Loop Button */}
          <button
            className={`p-2 rounded-full transition-colors ${
              loop ? 'text-blue-400 bg-blue-900' : 'text-gray-400 hover:text-gray-300'
            }`}
            aria-label="Toggle loop"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </button>
        </div>
        
        {/* Visual Equalizer */}
        {isPlaying && (
          <div className="flex items-center justify-center space-x-1 mt-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-blue-400 animate-pulse rounded-full"
                style={{
                  height: `${Math.random() * 16 + 4}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 