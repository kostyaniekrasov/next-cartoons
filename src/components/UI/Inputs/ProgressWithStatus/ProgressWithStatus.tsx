import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import * as React from 'react';

interface Props {
  progress: number;
}

function ProgressWithStatus({ progress }: Readonly<Props>) {
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (progress >= 100) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [progress]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6">Статус процесу:</Typography>

      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {success ? (
          <Fab
            aria-label="completed"
            color="success"
            sx={{
              bgcolor: green[500],
              '&:hover': {
                bgcolor: green[700],
              },
            }}
          >
            <CheckIcon />
          </Fab>
        ) : (
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              color: green[500],
            }}
          />
        )}

        {progress < 100 && (
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default ProgressWithStatus;
