'use client';

import { MoreHorizontalIcon } from '@/assets/icons';
import { SliderMenu, SliderNavigation } from '@/components';
import { ContinueWatching, PlaylistsType, VideoCategory } from '@/types';
import { Playlist } from '@/types/VideoData';
import { getCategoryName } from '@/utils';
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

interface Props {
  playlists: Playlist[];
  continueWatchingList?: ContinueWatching[];
  categories?: VideoCategory[];
  slideClick?: (playlistId: string, videoId: string) => void;
  playlistsType: PlaylistsType;
}

const CartoonSlider = React.memo(
  ({
    playlists,
    continueWatchingList = [],
    categories,
    slideClick,
    playlistsType,
  }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: false,
      slidesToScroll: 1,
      align: 'start',
    });
    const [hover, setHover] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const open = Boolean(anchorEl);
    const [alert, setAlert] = useState('');
    const [imageHeight, setImageHeight] = useState(0);

    const handleShowAlert = useCallback(
      (alertName: string) => setAlert(alertName),
      [],
    );

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

    const handleImageLoadComplete = useCallback((naturalHeight: number) => {
      setImageHeight((prevHeight) =>
        prevHeight !== naturalHeight ? naturalHeight : prevHeight,
      );
    }, []);

    const memoizedPlaylists = useMemo(
      () =>
        playlists.filter(
          (playlist) => playlist.videos && playlist.videos.length > 0,
        ),
      [playlists],
    );

    return (
      <>
        <Box
          id="box-1"
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          <SliderNavigation emblaApi={emblaApi} imageHeight={imageHeight} />
          <Box ref={emblaRef} sx={{ overflow: 'hidden', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                gap: {
                  xs: '8px',
                  sm: '24px',
                  '3xl': '40px',
                },
              }}
            >
              {memoizedPlaylists.map((playlist) => {
                const cwLink = continueWatchingList.find(
                  (cw) => cw.playlistId === playlist.id,
                );
                const selectedVideoId = cwLink
                  ? cwLink.videoId
                  : playlist.videos[0].id;
                const firstVideo = playlist.videos[0];

                return (
                  <Box
                    key={playlist.id}
                    sx={{ flex: '0 0 auto', width: 'auto' }}
                  >
                    <Box
                      onMouseEnter={() => !open && setHover(playlist.id)}
                      onMouseLeave={() => !open && setHover(null)}
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
                              : (firstVideo.snippet.thumbnails.standard?.url ??
                                'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=')
                          }
                          alt={firstVideo.snippet.title}
                          fill
                          quality={85}
                          priority
                          loading="eager"
                          sizes="100%"
                          onClick={() =>
                            slideClick
                              ? slideClick(playlist.id, selectedVideoId)
                              : handleSlideClick(playlist.id, selectedVideoId)
                          }
                          style={{
                            borderRadius: '12px',
                            objectPosition: 'center',
                          }}
                          onLoad={(event) =>
                            handleImageLoadComplete(
                              (event.target as HTMLImageElement).height,
                            )
                          }
                        />
                      </Box>

                      <Collapse
                        in={continueWatchingList && hover === playlist.id}
                      >
                        <Box
                          onClick={() =>
                            slideClick
                              ? slideClick(playlist.id, selectedVideoId)
                              : handleSlideClick(playlist.id, selectedVideoId)
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
                    <Typography
                      variant="mainTextSemibold"
                      color="gray.900"
                      textTransform={'capitalize'}
                      sx={{
                        fontSize: {
                          xs: '15px',
                          sm: '17px',
                        },
                      }}
                    >
                      {playlist.title.toLowerCase()}
                    </Typography>
                    <Typography
                      variant="mainText"
                      color="gray.700"
                      component="p"
                      sx={{
                        fontSize: {
                          xs: '13px',
                          sm: '17px',
                        },
                      }}
                    >
                      {categories &&
                        getCategoryName(categories, firstVideo.category)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {open && (
            <SliderMenu
              playlist={activePlaylist!}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              selectedVideoId={activeVideoId!}
              showAlert={handleShowAlert}
              slideClick={slideClick ? slideClick : handleSlideClick}
              playlistsType={playlistsType}
            />
          )}
        </Box>

        <Snackbar
          open={alert === 'sharedAlert'}
          autoHideDuration={3000}
          onClose={() => setAlert('')}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Alert severity="success">Посилання скопійовано в буфер обміну</Alert>
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
      </>
    );
  },
);

CartoonSlider.displayName = 'CartoonSlider';

export default CartoonSlider;
