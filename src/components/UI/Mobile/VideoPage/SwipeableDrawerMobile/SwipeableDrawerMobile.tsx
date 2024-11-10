import { CaretDownIcon, MenuMoreHorizontalIcon } from '@/assets/icons';
import { Playlist, VideoData } from '@/types';
import { seriesTitle } from '@/utils';
import {
  Box,
  Divider,
  Icon,
  IconButton,
  SwipeableDrawer,
  Typography,
} from '@mui/material';

interface Props {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
  playlist: Playlist;
  currentVideo: VideoData;
  videoHeight: number | null;
  changeVideo: (video: VideoData) => void;
}

const SwipeableDrawerMobile = ({
  open,
  toggleDrawer,
  playlist,
  currentVideo,
  videoHeight,
  changeVideo,
}: Props) => {
  const currentIndex = playlist.videos.findIndex(
    (v) => v.id === currentVideo.id,
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      ModalProps={{
        BackdropProps: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: '100vw',
          overflow: 'auto',
          backgroundColor: 'background.default',
          top: videoHeight ? `${videoHeight}px` : '0',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          component={'button'}
          onClick={toggleDrawer(false)}
          sx={{
            backgroundColor: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
            border: 'none',
            mb: '16px',
          }}
        >
          <Icon
            sx={{
              position: 'absolute',
              left: '16px',
            }}
          >
            <CaretDownIcon />
          </Icon>

          <Typography
            alignSelf={'center'}
            variant="captionBold"
            textTransform={'uppercase'}
          >
            {playlist?.title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          <Divider
            sx={{
              position: 'absolute',
              left: '-16px',
              right: '-16px',
            }}
          />
        </Box>

        <Box sx={{ paddingTop: '16px', width: '100%' }}>
          <Typography
            variant="captionBold"
            textAlign={'left'}
            component={'p'}
            sx={{
              marginBottom: '16px',
            }}
          >
            Зараз йде
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '21px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="secondaryText"
                color="accentPink"
                fontWeight={'900'}
              >
                {currentIndex + 1}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <Typography variant="footnote" color="accentPink">
                  {currentVideo &&
                    playlist &&
                    seriesTitle(currentVideo?.snippet.title, playlist?.title)}
                </Typography>
                <Typography
                  variant="footnote"
                  fontWeight={'400'}
                  color="gray.900"
                  fontSize={'10px'}
                >
                  {playlist?.title}
                </Typography>
              </Box>
            </Box>

            <IconButton
              sx={{
                padding: 0,
                color: 'gray.900',
              }}
            >
              <MenuMoreHorizontalIcon />
            </IconButton>
          </Box>

          <Typography
            variant="captionBold"
            textAlign={'left'}
            component={'p'}
            sx={{
              marginBottom: '16px',
            }}
          >
            {`Наступне з "${playlist.title}"`}
          </Typography>

          {playlist.videos.map(
            (video, index) =>
              video.id !== currentVideo.id && (
                <Box
                  component={'div'}
                  key={video.id}
                  onClick={() => changeVideo(video)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '21px',
                    border: 'none',
                    width: '100%',
                    padding: 0,
                    backgroundColor: 'transparent',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="secondaryText"
                      color="gray.900"
                      fontWeight={'900'}
                    >
                      {index + 1}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <Typography variant="footnote" color="gray.900">
                        {playlist &&
                          seriesTitle(video?.snippet.title, playlist?.title)}
                      </Typography>
                      <Typography
                        variant="footnote"
                        fontWeight={'400'}
                        color="gray.900"
                        fontSize={'10px'}
                      >
                        {playlist?.title}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton
                    sx={{
                      padding: 0,
                      color: 'gray.900',
                    }}
                  >
                    <MenuMoreHorizontalIcon />
                  </IconButton>
                </Box>
              ),
          )}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableDrawerMobile;
