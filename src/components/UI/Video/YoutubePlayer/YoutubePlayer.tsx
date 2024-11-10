'use client';

import {
  removePlaylistFromCW,
  saveProgress,
} from '@/lib/playlists/continueWatching';
import useAuthStore from '@/store/useAuthStore';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface YouTubePlayerProps {
  videoId: string;
  playlistId: string;
  onEnded: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  onEnded,
  playlistId,
}) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const { user } = useAuthStore();

  const VideoUrlFromDB = isAutoplay
    ? `https://www.youtube.com/watch?v=${videoId}&autoplay=1`
    : `https://www.youtube.com/watch?v=${videoId}`;

  const handlePause = () => {
    console.log('pause');
    setIsPlaying(false);
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log(`current videoId - ${videoId}`);
      if (user) {
        saveProgress(user.id, playlistId, videoId, currentTime);
      }
    }
  };

  const handleEnded = () => {
    onEnded();
    if (!hasWatched) {
      if (user) {
        removePlaylistFromCW(user.id, playlistId);
      }
      setHasWatched(true);
    }
    setIsAutoplay(true);
  };

  const handleProgress = (state: { played: number }) => {
    if (state.played >= 0.9 && !hasWatched) {
      setHasWatched(true);
      console.log('Відео переглянуто');
    }
  };

  return (
    <ReactPlayer
      ref={playerRef}
      url={VideoUrlFromDB}
      playing={isPlaying}
      onPause={handlePause}
      onEnded={handleEnded}
      onProgress={handleProgress}
      controls
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default YouTubePlayer;
