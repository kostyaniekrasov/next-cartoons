import { VideoData } from '@/types/VideoData';
import { slugify } from '@/utils';

function getMostFrequentCategory(videos: VideoData[]): string {
  const categoryCounts: { [key: string]: number } = {};

  videos.forEach((video) => {
    const category = video.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.keys(categoryCounts).reduce(
    (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
    Object.keys(categoryCounts)[0] || '',
  );
}

function sortPlaylistsByTitle(
  videos: VideoData[],
): { id: string; title: string; category: string; videos: VideoData[] }[] {
  const playlists: { [key: string]: VideoData[] } = {};

  videos.forEach((video) => {
    const playlistName = video.name;

    if (!playlists[playlistName]) {
      playlists[playlistName] = [];
    }

    playlists[playlistName].push(video);
  });

  return Object.keys(playlists).map((playlistName) => {
    const playlistVideos = playlists[playlistName];
    const playlistCategory = getMostFrequentCategory(playlistVideos);
    const id = `${slugify(playlistName)}-${Math.floor(Math.random() * 10000)}`;

    return {
      title: playlistName,
      category: playlistCategory,
      videos: playlistVideos,
      id: id,
    };
  });
}

export default sortPlaylistsByTitle;
