'use client';

import { ChevronLeftIcon } from '@/assets/icons';
import { SignInButton, SliderSkeleton, ToggleSliderToGrid } from '@/components';
import { getUserLists } from '@/lib/playlists/savedVideos';
import useAuthStore from '@/store/useAuthStore';
import useVideoStore from '@/store/useVideoStore';
import { PlaylistsType } from '@/types';
import {
  Alert,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SavedVideos = () => {
  const { user, loading } = useAuthStore();
  const {
    categories,
    fetchCategoriesIfEmpty,
    savedPlaylists,
    setSavedPlaylists,
  } = useVideoStore();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleShowSignIn = () => {
    router.push(`${pathname}?signin=true`);
  };

  useEffect(() => {
    const fetchWatchLaterPlaylists = async () => {
      if (!user?.id) return;

      try {
        const playlists = await getUserLists(user.id);
        setSavedPlaylists(playlists.watchLater || []);
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
  }, [setSavedPlaylists, user]);

  useEffect(() => {
    const fetchCategories = async () => {
      await fetchCategoriesIfEmpty();
    };

    fetchCategories();
  });

  if (!loading && !user) {
    return (
      <Container disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            mx: 'auto',
            width: {
              xs: '100%',
              lg: 'max-content',
            },
            justifyContent: 'center',
          }}
        >
          <Alert variant="filled" severity="warning">
            Цей список доступний лише авторизованим користувачам. Будь ласка,
            виконайте вхід в систему.
          </Alert>
          <SignInButton onClick={handleShowSignIn}>
            <Typography color="accentPink">Виконати вхід</Typography>
          </SignInButton>
        </Box>
      </Container>
    );
  }

  let content;

  if (isLoading) {
    content = (
      <Box sx={{ display: 'flex', gap: '24px' }}>
        {Array.from(new Array(4)).map((_, i) => {
          return <SliderSkeleton key={i} />;
        })}
      </Box>
    );
  } else if (savedPlaylists.length > 0) {
    content = (
      <ToggleSliderToGrid
        title="Збережені"
        user={user}
        playlists={savedPlaylists}
        playlistsType={PlaylistsType.Saved}
        categories={categories}
        borderBottom={false}
        showOnly="grid"
      />
    );
  } else if (!savedPlaylists.length) {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
          // inset: 0,
        }}
      >
        <Typography variant="h2" color="gray.600" marginBottom={'8px'}>
          Додайте до своєї бібліотеки
        </Typography>

        <Typography variant="caption" color="gray.700" marginBottom={'4px'}>
          Відкривайте мультфільми та музику, все в одному місці. Ваші улюблені
          збережені матеріали завжди тут.
        </Typography>

        <Button
          onClick={() => router.back()}
          sx={{
            textTransform: 'none',
            backgroundColor: 'gray.200',
            borderRadius: '8px',
            padding: '8px 16px',
          }}
        >
          <Typography variant="footnote" color="accentPink">
            Відкрити більше
          </Typography>
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Container disableGutters>
        <IconButton
          onClick={() => router.back()}
          sx={{
            alignItems: 'center',
            marginBottom: {
              xs: '8px',
              xl: '16px',
            },
            padding: '0 10px 0 0',
            borderRadius: '12px',
          }}
        >
          <Icon
            color="accentPink"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'max-content',
            }}
          >
            <ChevronLeftIcon width={15} height={15} />
          </Icon>
          <Typography variant="caption" color="accentPink">
            Повернутися
          </Typography>
        </IconButton>

        {content}
      </Container>
    </Box>
  );
};

export default SavedVideos;
