import React from 'react';
import {
  // Audio Components
  BasicAudioPlayer,
  MinimalAudioPlayer,
  AudioWithTrackInfo,
  WaveformAudioPlayer,
  CircularAudioButton,
  AutoplayAudioPlayer,
  CustomControlsAudio,
  PlaylistAudioPlayer,
  DarkModeAudioPlayer,
  AnimatedAudioBars,
  // Video Components
  BasicVideoPlayer,
  ResponsiveVideo,
  PosterVideoPlayer,
  MutedAutoplayVideo,
  VideoPlayerWithOverlay,
  FullscreenVideoPlayer,
  MinimalVideoPlayer,
  YouTubeEmbed,
  CustomControlsVideo,
  VideoThumbnailPreview,
} from '../components';

const MediaGallery: React.FC = () => {
  // Using public domain sample files and placeholders
  const sampleAudioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
  const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterImage = 'https://via.placeholder.com/640x360/4A90E2/ffffff?text=Video+Poster';
  const coverArt = 'https://via.placeholder.com/100x100/667eea/ffffff?text=♪';
  
  // Sample track data for playlist
  const sampleTracks = [
    {
      id: '1',
      title: 'Sample Track 1',
      artist: 'Demo Artist',
      src: sampleAudioUrl,
      duration: '3:45'
    },
    {
      id: '2',
      title: 'Sample Track 2', 
      artist: 'Demo Artist',
      src: sampleAudioUrl,
      duration: '4:12'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Media Components</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of audio and video player components for modern web applications.
          </p>
        </div>

        {/* Audio Components Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Audio Players</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Audio Player</h3>
              <BasicAudioPlayer src={sampleAudioUrl} />
              <p className="text-sm text-gray-600 mt-2">Simple HTML5 audio player with basic controls.</p>
            </div>

            {/* Minimal Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimal Audio Player</h3>
              <MinimalAudioPlayer 
                src={sampleAudioUrl}
              />
              <p className="text-sm text-gray-600 mt-2">Clean and minimal audio player design.</p>
            </div>

            {/* Audio With Track Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio With Track Info</h3>
              <AudioWithTrackInfo 
                src={sampleAudioUrl}
                title="Demo Track"
                artist="Sample Artist"
                album="Demo Album"
                coverArt={coverArt}
              />
              <p className="text-sm text-gray-600 mt-2">Audio player with detailed track information display.</p>
            </div>

            {/* Waveform Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Waveform Audio Player</h3>
              <WaveformAudioPlayer 
                src={sampleAudioUrl}
              />
              <p className="text-sm text-gray-600 mt-2">Audio player with visual waveform display.</p>
            </div>

            {/* Circular Audio Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Circular Audio Button</h3>
              <div className="flex justify-center">
                <CircularAudioButton 
                  src={sampleAudioUrl}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Elegant circular play button for audio.</p>
            </div>

            {/* Autoplay Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Autoplay Audio Player</h3>
              <AutoplayAudioPlayer 
                src={sampleAudioUrl}
                title="Autoplay Demo"
              />
              <p className="text-sm text-gray-600 mt-2">Audio player with autoplay functionality (disabled for demo).</p>
            </div>

            {/* Custom Controls Audio */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Controls Audio</h3>
              <CustomControlsAudio 
                src={sampleAudioUrl}
              />
              <p className="text-sm text-gray-600 mt-2">Audio player with custom-styled controls.</p>
            </div>

            {/* Playlist Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Playlist Audio Player</h3>
              <PlaylistAudioPlayer 
                tracks={sampleTracks}
              />
              <p className="text-sm text-gray-600 mt-2">Audio player with playlist support.</p>
            </div>

            {/* Dark Mode Audio Player */}
            <div className="bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Dark Mode Audio Player</h3>
              <DarkModeAudioPlayer 
                src={sampleAudioUrl}
                title="Dark Mode Demo"
                artist="Sample Artist"
              />
              <p className="text-sm text-gray-300 mt-2">Audio player optimized for dark themes.</p>
            </div>

            {/* Animated Audio Bars */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Animated Audio Bars</h3>
              <AnimatedAudioBars 
                src={sampleAudioUrl}
                title="Animated Demo"
              />
              <p className="text-sm text-gray-600 mt-2">Animated bars to indicate audio playback.</p>
            </div>
          </div>
        </div>

        {/* Video Components Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Video Players</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Video Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Video Player</h3>
              <BasicVideoPlayer src={sampleVideoUrl} />
              <p className="text-sm text-gray-600 mt-2">Simple HTML5 video player with standard controls.</p>
            </div>

            {/* Responsive Video */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsive Video</h3>
              <ResponsiveVideo src={sampleVideoUrl} />
              <p className="text-sm text-gray-600 mt-2">Video player that adapts to container size.</p>
            </div>

            {/* Poster Video Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Poster Video Player</h3>
              <PosterVideoPlayer 
                src={sampleVideoUrl}
                poster={posterImage}
              />
              <p className="text-sm text-gray-600 mt-2">Video player with custom poster image.</p>
            </div>

            {/* Muted Autoplay Video */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Muted Autoplay Video</h3>
              <MutedAutoplayVideo src={sampleVideoUrl} />
              <p className="text-sm text-gray-600 mt-2">Auto-playing video with muted sound.</p>
            </div>

            {/* Video Player With Overlay */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Player With Overlay</h3>
              <VideoPlayerWithOverlay 
                src={sampleVideoUrl}
                title="Sample Video"
                description="This is a demo video with overlay text"
              />
              <p className="text-sm text-gray-600 mt-2">Video player with text overlay.</p>
            </div>

            {/* Fullscreen Video Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fullscreen Video Player</h3>
              <FullscreenVideoPlayer src={sampleVideoUrl} />
              <p className="text-sm text-gray-600 mt-2">Video player with fullscreen capability.</p>
            </div>

            {/* Minimal Video Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimal Video Player</h3>
              <MinimalVideoPlayer 
                src={sampleVideoUrl}
                poster={posterImage}
              />
              <p className="text-sm text-gray-600 mt-2">Clean and minimal video player design.</p>
            </div>

            {/* YouTube Embed */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">YouTube Embed</h3>
              <YouTubeEmbed 
                videoId="dQw4w9WgXcQ"
              />
              <p className="text-sm text-gray-600 mt-2">Embedded YouTube video player.</p>
            </div>

            {/* Custom Controls Video */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Controls Video</h3>
              <CustomControlsVideo 
                src={sampleVideoUrl}
                poster={posterImage}
              />
              <p className="text-sm text-gray-600 mt-2">Video player with custom-styled controls.</p>
            </div>

            {/* Video Thumbnail Preview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Thumbnail Preview</h3>
              <VideoThumbnailPreview 
                src={sampleVideoUrl}
                poster={posterImage}
                title="Preview Demo"
                duration="2:30"
              />
              <p className="text-sm text-gray-600 mt-2">Video thumbnail with hover preview.</p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Audio Components</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use BasicAudioPlayer for simple audio playback</li>
                <li>• Choose WaveformAudioPlayer for music applications</li>
                <li>• Use PlaylistAudioPlayer for multi-track experiences</li>
                <li>• Apply DarkModeAudioPlayer for dark themes</li>
                <li>• Use CircularAudioButton for minimal interfaces</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Components</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use BasicVideoPlayer for standard video playback</li>
                <li>• Choose ResponsiveVideo for flexible layouts</li>
                <li>• Use MutedAutoplayVideo for background videos</li>
                <li>• Apply YouTubeEmbed for YouTube content</li>
                <li>• Use VideoThumbnailPreview for video galleries</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-md font-semibold text-blue-900 mb-2">Available Components</h4>
            <p className="text-sm text-blue-800">
              This library includes 20 media components: 10 audio players and 10 video players. 
              Each component is fully customizable and built with TypeScript for excellent developer experience.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Features</h3>
            <p className="text-gray-600">Custom controls, playlists, waveforms, and audio visualizations</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Features</h3>
            <p className="text-gray-600">Responsive players, overlays, thumbnails, and custom controls</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
            <p className="text-gray-600">Optimized for web performance with lazy loading support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery; 