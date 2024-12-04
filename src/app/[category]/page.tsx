import { ToggleSliderToGrid } from '@/components';
import NotAuthenticatedCartoons from '@/components/NotAuthenticatedCartoons/NotAuthenticatedCartoons';
import { getCategories } from '@/lib';
import { getUserData } from '@/lib/api/getUserData';
import { getClList } from '@/lib/playlists/continueWatching';
import { fetchPlaylistsByCategory } from '@/lib/playlists/getSortedPlaylists';
import { PlaylistsType, User } from '@/types';
import { Playlist } from '@/types/VideoData';
import { filterPlaylistsByAge } from '@/utils';
import { Box, Collapse, Container } from '@mui/material';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const categories = await getCategories();
  const user: User | null = await getUserData();
  const isAuthenticated = !!user;

  const currentCategory = categories?.find((c) => c.name === category);

  const playlists: Playlist[] = await fetchPlaylistsByCategory(category);
  const videosByAgeCategory = filterPlaylistsByAge(playlists, user?.age);

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
            <ToggleSliderToGrid
              user={user}
              categories={categories}
              category={currentCategory}
              playlists={videosByAgeCategory}
              playlistsType={PlaylistsType.ByCategory}
            />
          </Collapse>

          {isAuthenticated && continueWatchingPlaylists.length > 0 && (
            <ToggleSliderToGrid
              user={user}
              categories={categories}
              title={'Продовжити перегляд'}
              playlists={continueWatchingPlaylists}
              CWlinks={continueWatchingLinks}
              playlistsType={PlaylistsType.ContinueWatching}
            />
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
