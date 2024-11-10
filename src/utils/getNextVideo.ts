import { Playlist, VideoData } from '@/types';

function getNextVideoInPlaylist(
  playlist: Playlist | undefined,
  currentVideo: VideoData | undefined,
): VideoData | null {
  if (!currentVideo || !playlist?.videos.length) return null;

  const currentIndex = playlist.videos.findIndex(
    (video) => video.id === currentVideo.id,
  );

  if (currentIndex !== -1 && currentIndex < playlist.videos.length - 1) {
    return playlist.videos[currentIndex + 1];
  }

  return null;
}

export default getNextVideoInPlaylist;
