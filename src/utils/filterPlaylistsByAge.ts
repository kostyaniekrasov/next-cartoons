import { Playlist } from '@/types';

const filterPlaylistsByAge = (playlists: Playlist[], userAge?: number) =>
  playlists
    .map((playlist) => ({
      ...playlist,
      videos: playlist.videos.filter((video) =>
        userAge && userAge >= 8
          ? video.recommendedAge >= 8
          : video.recommendedAge <= 5,
      ),
    }))
    .filter((playlist) => playlist.videos.length > 0);

export default filterPlaylistsByAge;
