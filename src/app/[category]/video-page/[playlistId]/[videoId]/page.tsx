'use client';

import { ChevronRightIcon } from '@/assets/icons';
import {
  CartoonSlider,
  ListWithCustomScroll,
  SwipeableDrawerMobile,
  SwipeableDrawerOpenButton,
  VerticalSlider,
  VerticalSliderSkeleton,
  VideoBlock,
} from '@/components';
import { fetchPlaylistsByCategory, getCategories } from '@/lib';
import { fetchPlaylistById } from '@/lib/playlists/fetchPlaylistById';
import { isPlaylistSaved } from '@/lib/playlists/isSavedVideo';
import { addToWatchLater } from '@/lib/playlists/savedVideos';
import useAuthStore from '@/store/useAuthStore';
import { PlaylistsType, VideoCategory } from '@/types';
import { Playlist, VideoData } from '@/types/VideoData';
import { getNextVideoInPlaylist } from '@/utils';
import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const VideoPage = ({
  params,
}: {
  params: { category: string; playlistId: string; videoId: string };
}) => {
  const { category, playlistId, videoId } = params;
  const [playlist, setPlaylist] = useState<Playlist>();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentCategory, setCurrentCategory] = useState<VideoCategory | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoData>();
  const { user } = useAuthStore();
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const nextVideo = useMemo(
    () => getNextVideoInPlaylist(playlist, currentVideo),
    [playlist, currentVideo],
  );
  const initialized = useRef(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState<number | null>(null);

  const handleAddToSaved = useCallback(async () => {
    if (playlist && user) {
      await addToWatchLater(user.id, playlist);
      setIsSaved(true);
    }
  }, [playlist, user]);

  const handleSlideClick = useCallback(
    (playlistId: string, videoId: string) => {
      router.push(`/${category}/video-page/${playlistId}/${videoId}`);
    },
    [router, category],
  );

  const handleChangeVideo = useCallback(
    (video: VideoData) => {
      setCurrentVideo(video);
      const newUrl = `/${category}/video-page/${playlistId}/${video.id}`;
      window.history.replaceState(null, '', newUrl);
    },
    [category, playlistId],
  );

  const openSignInModal = useCallback(() => {
    router.push(`${pathname}?signin=true`);
  }, [router, pathname]);

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    [],
  );

  const playNextVideo = useCallback(() => {
    if (!playlist || !currentVideo) return;
    const currentIndex = playlist.videos.findIndex(
      (video) => video.id === currentVideo.id,
    );
    if (currentIndex !== -1 && currentIndex < playlist.videos.length - 1) {
      setCurrentVideo(playlist.videos[currentIndex + 1]);
    }
  }, [playlist, currentVideo]);

  const playlistTitle = playlist?.title;

  useEffect(() => {
    if (videoRef.current?.firstChild && isMobileScreen) {
      const firstChild = videoRef.current.firstChild as HTMLElement;
      setVideoHeight(firstChild.offsetHeight);
    }
  }, [isMobileScreen]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fetchData = async () => {
      const foundPlaylist = await fetchPlaylistById(playlistId);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
        const initialVideo = videoId
          ? foundPlaylist.videos.find((video) => video.id === videoId)
          : foundPlaylist.videos[0];
        setCurrentVideo(initialVideo || foundPlaylist.videos[0]);
      }
    };

    fetchData();
  }, [playlistId, videoId]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!categories.length) {
        const fetchedCategories = await getCategories();
        if (fetchedCategories) {
          setCategories(fetchedCategories);
          const foundCategory = fetchedCategories.find(
            (c) => c.name === category,
          );
          if (foundCategory) setCurrentCategory(foundCategory);
        }
      }
    };

    fetchCategories();
  }, [categories.length, category]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!playlists.length) {
        const fetchedPlaylists = await fetchPlaylistsByCategory(category);
        setPlaylists(fetchedPlaylists || []);
      }
    };

    fetchPlaylists();
  }, [playlists.length, category]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (user) {
        const saved = await isPlaylistSaved(user.id, playlistId);
        setIsSaved(saved);
      }
    };

    checkIfSaved();
  }, [user, playlistId]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Container
        disableGutters
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Box
            id="video-block"
            ref={videoRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: '24px',
              justifyContent: { '3xl': 'center' },
              borderBottom: { xs: 'none', sm: '1px solid' },
              borderBottomColor: { sm: 'gray.200' },
              paddingBottom: { sm: '18px' },
            }}
          >
            <VideoBlock
              playlistTitle={playlistTitle}
              currentVideo={currentVideo}
              onVideoEnd={playNextVideo}
              saveVideo={handleAddToSaved}
              playlistId={playlistId}
              isSaved={isSaved}
              user={user}
              goToSignIn={openSignInModal}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="h2"
                color="gray.900"
                marginBottom="8px"
                paddingBottom="12px"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                Серії
              </Typography>
              <ListWithCustomScroll
                playlist={playlist}
                ChangeVideo={handleChangeVideo}
                currentId={currentVideo?.id}
              />
            </Box>
          </Box>
          {playlist ? (
            <VerticalSlider
              playlists={playlists}
              categories={categories}
              slideClick={handleSlideClick}
            />
          ) : (
            <VerticalSliderSkeleton />
          )}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'baseline',
              width: '100%',
              gap: '16px',
            }}
          >
            <IconButton
              sx={{
                color: 'gray.600',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '12px',
                width: 'max-content',
                transform: 'translateX(-5px)',
                padding: '5px',
              }}
            >
              {currentCategory && (
                <Typography
                  variant="h3"
                  color="gray.900"
                  sx={{ fontSize: { xs: '17px', sm: '21px' } }}
                >
                  {currentCategory.title}
                </Typography>
              )}
              <ChevronRightIcon />
            </IconButton>

            <CartoonSlider
              playlists={playlists}
              categories={categories}
              slideClick={handleSlideClick}
              playlistsType={PlaylistsType.ByCategory}
            />
          </Box>
        </Box>

        {playlistTitle && (
          <SwipeableDrawerOpenButton
            toggleDrawer={toggleDrawer}
            nextVideoTitle={nextVideo?.snippet.title}
            playlistTitle={playlistTitle}
          />
        )}
        {playlist && currentVideo && (
          <SwipeableDrawerMobile
            open={open}
            toggleDrawer={toggleDrawer}
            playlist={playlist}
            currentVideo={currentVideo}
            videoHeight={videoHeight}
            changeVideo={handleChangeVideo}
          />
        )}
      </Container>
    </Box>
  );
};

export default VideoPage;
