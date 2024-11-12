'use client';

import { ChevronLeftIcon } from '@/assets/icons';
import { GridForList, SliderSkeleton } from '@/components';
import {
  getUserLists,
  removeFromWatchLater,
} from '@/lib/playlists/savedVideos';
import useAuthStore from '@/store/useAuthStore';
import { Playlist } from '@/types/VideoData';
import { Alert, Box, Container, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SavedVideos = () => {
  const { user, loading } = useAuthStore();
  const [watchLaterPlaylists, setWatchLaterPlaylists] = useState<Playlist[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleRemoveFromSaved = async (playlistId: string) => {
    if (user) {
      await removeFromWatchLater(user.id, playlistId);
      setWatchLaterPlaylists((prevPlaylists) =>
        prevPlaylists.filter((list) => list.id !== playlistId),
      );
    }
  };

  useEffect(() => {
    const fetchWatchLaterPlaylists = async () => {
      if (!user?.id) return;

      try {
        const playlists = await getUserLists(user.id);
        setWatchLaterPlaylists(playlists.watchLater || []);
      } catch (error) {
        console.error('Error fetching watch later playlists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchWatchLaterPlaylists();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!loading && !user) {
    return (
      <Container disableGutters>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Alert variant="filled" severity="warning">
            Цей список доступний лише авторизованим користувачам. Будь ласка,
            виконайте вхід в систему.
          </Alert>
        </Box>
      </Container>
    );
  }

  let content;

  if (isLoading) {
    content = (
      <Box sx={{ display: 'flex', gap: '24px' }}>
        {Array.from(new Array(4)).map((index, element) => (
          <SliderSkeleton key={`skeleton-${element}`} />
        ))}
      </Box>
    );
  } else if (watchLaterPlaylists.length > 0) {
    content = (
      <>
        <Typography variant="h1" color="gray.900" marginBottom={'32px'}>
          Збережені
        </Typography>
        <GridForList
          playlists={watchLaterPlaylists}
          removeFromSaved={handleRemoveFromSaved}
        />
      </>
    );
  } else if (!watchLaterPlaylists.length) {
    content = (
      <Typography variant="h5" color="gray.600">
        У вас немає збережених відео.
      </Typography>
    );
  }

  return (
    <Box>
      <Container disableGutters>
        <IconButton
          onClick={() => router.push('/all')}
          sx={{
            alignItems: 'center',
            marginBottom: '16px',
            padding: '0 10px 0 0',
            borderRadius: '12px',
          }}
        >
          <ChevronLeftIcon width={17} height={17} />
          <Typography variant="mainTextSemibold" color="gray.700">
            Повернутися
          </Typography>
        </IconButton>
        {content}
      </Container>
    </Box>
  );
};

export default SavedVideos;
