import { ToggleSliderToGrid } from '@/components';
import NotAuthenticatedCartoons from '@/components/NotAuthenticatedCartoons/NotAuthenticatedCartoons';
import { getCategories } from '@/lib';
import { getUserData } from '@/lib/api/getUserData';
import { getClList } from '@/lib/playlists/continueWatching';
import { fetchPlaylistsByCategory } from '@/lib/playlists/getSortedPlaylists';
import { PlaylistsType, User } from '@/types';
import { Playlist } from '@/types/VideoData';
import { Box, Collapse, Container } from '@mui/material';

const filterVideosByAge = (playlists: Playlist[], userAge?: number) =>
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

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const categories = await getCategories();
  const user: User | null = await getUserData();
  const isAuthenticated = !!user;

  const currentCategory = categories?.find((c) => c.name === category);

  const playlists: Playlist[] = await fetchPlaylistsByCategory(category);

  const videosByAgeCategory = filterVideosByAge(playlists, user?.age);

  const continueWatchingLinks =
    isAuthenticated && user.id ? await getClList(user.id) : [];

  const continueWatchingPlaylists = playlists.filter((playlist) =>
    continueWatchingLinks.some((cw) => cw.playlistId === playlist.id),
  );

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Container disableGutters>
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
          <Collapse in={isAuthenticated} unmountOnExit>
            <Box
              sx={{
                borderBottom: '1px solid',
                borderColor: 'gray.200',
                paddingBottom: {
                  xs: '16px',
                  sm: '30px',
                },
              }}
            >
              <ToggleSliderToGrid
                categories={categories}
                category={currentCategory}
                playlists={videosByAgeCategory}
                playlistsType={PlaylistsType.ByCategory}
              />
            </Box>
          </Collapse>

          {isAuthenticated && continueWatchingPlaylists.length > 0 && (
            <Box
              sx={{
                borderBottom: '1px solid',
                borderColor: 'gray.200',
                paddingBottom: '30px',
              }}
            >
              <ToggleSliderToGrid
                categories={categories}
                title={'Продовжити перегляд'}
                playlists={continueWatchingPlaylists}
                CWlinks={continueWatchingLinks}
                playlistsType={PlaylistsType.ContinueWatching}
              />
            </Box>
          )}
        </Box>

        <Collapse in={!isAuthenticated} unmountOnExit>
          <NotAuthenticatedCartoons
            playlists={playlists}
            categories={categories}
          />
        </Collapse>
      </Container>
    </Box>
  );
};

export default CategoryPage;
