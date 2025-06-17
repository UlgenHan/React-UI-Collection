import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  startTime?: number;
  endTime?: number;
  className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video player',
  aspectRatio = '16:9',
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  startTime,
  endTime,
  className = '',
}) => {
  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  };

  const buildUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();

    if (autoplay) params.append('autoplay', '1');
    if (muted) params.append('mute', '1');
    if (loop) {
      params.append('loop', '1');
      params.append('playlist', videoId);
    }
    if (!controls) params.append('controls', '0');
    if (startTime) params.append('start', startTime.toString());
    if (endTime) params.append('end', endTime.toString());

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  return (
    <div className={`relative w-full ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <iframe
        src={buildUrl()}
        title={title}
        className="absolute inset-0 w-full h-full rounded-lg shadow-md"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}; 