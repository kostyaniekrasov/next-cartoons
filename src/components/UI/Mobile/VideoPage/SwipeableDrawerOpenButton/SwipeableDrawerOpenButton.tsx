import { CaretUpIcon, ListUnorderedIcon } from '@/assets/icons';
import { seriesTitle } from '@/utils';
import { Box, Icon, IconButton, Typography } from '@mui/material';

interface Props {
  toggleDrawer: (newOpen: boolean) => () => void;
  nextVideoTitle?: string;
  playlistTitle: string;
}

const SwipeableDrawerOpenButton = ({
  toggleDrawer,
  nextVideoTitle,
  playlistTitle,
}: Props) => {
  return (
    <Box
      component={'div'}
      onClick={toggleDrawer(true)}
      sx={{
        display: {
          xs: 'flex',
          sm: 'none',
        },
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        border: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <Icon
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListUnorderedIcon />
        </Icon>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {nextVideoTitle && (
            <Typography
              color="gray.900"
              variant="captionBold"
              textAlign={'left'}
            >
              {nextVideoTitle ? `Наступне: ` : 'Це остання серія'}
              <Typography variant="caption">
                {seriesTitle(nextVideoTitle, playlistTitle)}
              </Typography>
            </Typography>
          )}
          <Typography
            color="gray.700"
            variant="caption"
            fontSize={'10px'}
            textAlign={'left'}
          >{`Плейлист: ${playlistTitle}`}</Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          padding: 0,
        }}
      >
        <CaretUpIcon />
      </IconButton>
    </Box>
  );
};

export default SwipeableDrawerOpenButton;
