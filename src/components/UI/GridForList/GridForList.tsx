'use client';

import { MoreHorizontalIcon } from '@/assets/icons';
import { ContinueWatching, VideoCategory } from '@/types';
import { Playlist } from '@/types/VideoData';
import { getCategoryName } from '@/utils';
import {
  Alert,
  Box,
  Collapse,
  Grid2,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { SliderMenu } from '../Slider';

interface Props {
  categories?: VideoCategory[];
  playlists: Playlist[];
  continueWatchingList?: ContinueWatching[];
  isSavedPage?: boolean;
  removeFromSaved?: (playlistId: string) => Promise<void>;
}

const GridForList = ({
  playlists,
  continueWatchingList,
  isSavedPage,
  removeFromSaved,
  categories,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [hover, setHover] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const [alert, setAlert] = useState('');

  const handleShowAlert = (alertName: string) => {
    setAlert(alertName);
  };

  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      playlist: Playlist,
      videoId: string,
    ) => {
      setAnchorEl(event.currentTarget);
      setActivePlaylist(playlist);
      setActiveVideoId(videoId);
    },
    [],
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setActivePlaylist(null);
    setActiveVideoId(null);
  }, []);

  const handleSlideClick = useCallback(
    (playlistId: string, videoId: string) => {
      router.push(`${pathname}/video-page/${playlistId}/${videoId}`);
    },
    [router, pathname],
  );

  return (
    <Grid2 container spacing={4} columnSpacing={3}>
      {playlists.map((playlist) => {
        if (!playlist.videos || playlist.videos.length === 0) {
          return null;
        }

        const cwLink = continueWatchingList?.find(
          (cw) => cw.playlistId === playlist.id,
        );

        const selectedVideoId = cwLink ? cwLink.videoId : playlist.videos[0].id;

        const firstVideo = playlist.videos[0];

        return (
          <Grid2 size={{ xs: 2, sm: 6, md: 3 }} key={playlist.id}>
            <Box>
              <Box>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '12px',
                    boxSizing: 'border-box',
                    width: {
                      xs: '255px',
                      sm: '318px',
                      '3xl': '416px',
                    },
                    aspectRatio: '16/9',
                    marginBottom: '8px',
                    border: '1px solid',
                    borderColor: 'gray.300',
                  }}
                  onMouseEnter={() => !open && setHover(playlist.id)}
                  onMouseLeave={() => !open && setHover(null)}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '12px',
                    }}
                  >
                    <Image
                      src={
                        firstVideo.snippet.thumbnails.maxres
                          ? firstVideo.snippet.thumbnails.maxres.url
                          : (firstVideo.snippet.thumbnails.standard.url ??
                            'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=')
                      }
                      alt={firstVideo.snippet.title}
                      fill
                      quality={85}
                      priority
                      loading="eager"
                      sizes="100%"
                      onClick={() =>
                        handleSlideClick(playlist.id, selectedVideoId)
                      }
                      style={{
                        borderRadius: '12px',
                        objectPosition: 'center',
                      }}
                    />
                  </Box>

                  <Collapse
                    in={continueWatchingList && hover === playlist.id}
                    unmountOnExit
                  >
                    <Box
                      onClick={() =>
                        handleSlideClick(playlist.id, selectedVideoId)
                      }
                      sx={{
                        position: 'absolute',
                        padding: '16px',
                        inset: 0,
                        background: 'rgba(54, 54, 54, 0.6)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderRadius: '12px',
                      }}
                    >
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClick(event, playlist, selectedVideoId);
                        }}
                        id="menu-slider"
                        aria-controls={open ? 'menu-slider' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                          backgroundColor: ' rgba(242, 242, 247, 0.5)',
                          padding: 0,
                          color: 'white',
                          borderRadius: '999px',
                          width: '24px',
                          height: '24px',
                        }}
                      >
                        <MoreHorizontalIcon />
                      </IconButton>
                    </Box>
                  </Collapse>
                  <Collapse
                    in={!continueWatchingList && hover === playlist.id}
                    unmountOnExit
                  >
                    <Box
                      onClick={() =>
                        handleSlideClick(playlist.id, selectedVideoId)
                      }
                      sx={{
                        position: 'absolute',
                        padding: '16px',
                        inset: 0,
                        background: 'rgba(54, 54, 54, 0.6)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderRadius: '12px',
                      }}
                    >
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClick(event, playlist, selectedVideoId);
                        }}
                        id="menu-slider"
                        aria-controls={open ? 'menu-slider' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                          backgroundColor: ' rgba(242, 242, 247, 0.5)',
                          padding: 0,
                          color: 'white',
                          borderRadius: '999px',
                          width: '24px',
                          height: '24px',
                        }}
                      >
                        <MoreHorizontalIcon />
                      </IconButton>
                    </Box>
                  </Collapse>
                </Box>

                {open && (
                  <SliderMenu
                    playlist={activePlaylist!}
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleClose}
                    selectedVideoId={activeVideoId!}
                    showAlert={handleShowAlert}
                    showRemove={!!continueWatchingList || !!isSavedPage}
                    removeFromSaved={removeFromSaved}
                    isSavedPage={isSavedPage}
                  />
                )}
              </Box>
              <Typography variant="mainTextSemibold" color="gray.900">
                {playlist.title.toLowerCase()}
              </Typography>
              <Typography variant="mainText" color="gray.700" component="p">
                {categories && getCategoryName(categories, firstVideo.category)}
              </Typography>
            </Box>
          </Grid2>
        );
      })}

      <Snackbar
        open={alert === 'sharedAlert'}
        autoHideDuration={3000}
        onClose={() => setAlert('')}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="success">Посилання скопійовано в буфер обіну</Alert>
      </Snackbar>

      <Snackbar
        open={alert === 'savedAlert'}
        autoHideDuration={3000}
        onClose={() => setAlert('')}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="success">Відео додано до збережених</Alert>
      </Snackbar>

      <Snackbar
        open={alert === 'removedAlert'}
        autoHideDuration={3000}
        onClose={() => setAlert('')}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity="success">Відео видалено зі списку</Alert>
      </Snackbar>
    </Grid2>
  );
};

export default GridForList;
