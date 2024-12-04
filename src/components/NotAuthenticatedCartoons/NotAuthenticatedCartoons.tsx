import { PlaylistsType, VideoCategory } from '@/types';
import { Playlist } from '@/types/VideoData';
import { Box } from '@mui/material';

import { ToggleSliderToGrid } from '../ToggleSliderToGrid';

interface Props {
  playlists: Playlist[];
  categories?: VideoCategory[];
}

const NotAuthenticatedCartoons = ({ playlists, categories }: Props) => {
  const playlistsForLittleKids = playlists
    .map((playlist) => ({
      ...playlist,
      videos: playlist.videos.filter((video) => video.recommendedAge <= 5),
    }))
    .filter((playlist) => playlist.videos.length > 0);

  const playlistsForBiggerKids = playlists
    .map((playlist) => ({
      ...playlist,
      videos: playlist.videos.filter((video) => video.recommendedAge > 5),
    }))
    .filter((playlist) => playlist.videos.length > 0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: {
          xs: '16px',
          sm: '32px',
        },
      }}
    >
      {!!playlistsForLittleKids.length && (
        <ToggleSliderToGrid
          user={null}
          title="Маленьким дітям"
          playlists={playlistsForLittleKids}
          categories={categories}
          playlistsType={PlaylistsType.ByCategory}
        />
      )}
      {!!playlistsForBiggerKids.length && (
        <ToggleSliderToGrid
          user={null}
          title="Дітям старшого віку"
          playlists={playlistsForBiggerKids}
          categories={categories}
          playlistsType={PlaylistsType.ByCategory}
        />
      )}
    </Box>
  );
};
export default NotAuthenticatedCartoons;
