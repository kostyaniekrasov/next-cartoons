import { Playlist } from '@/types';

const filterPlaylistsByAge = (playlists: Playlist[], userAge?: number) =>
  playlists
    .map((playlist) => ({
      ...playlist,
      videos: playlist.videos.filter((video) => {
        if (userAge && userAge >= 8) {
          return video.recommendedAge >= 8;
        }

        if (userAge && userAge >= 5) {
          return video.recommendedAge >= 5 && video.recommendedAge < 8;
        }

        if (userAge && userAge < 5) {
          return video.recommendedAge < 5;
        }
      }),
    }))
    .filter((playlist) => playlist.videos.length > 0);

export default filterPlaylistsByAge;
