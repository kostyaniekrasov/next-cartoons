import { Box, Button, Modal, Typography } from '@mui/material';

interface Props {
  open: boolean;
  closeModal: () => void;
  someFunction: () => Promise<void>;
  title: string;
}

const TabModal = ({ open, closeModal, someFunction, title }: Props) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            background: 'rgba(255, 255, 255, 0.20)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          component="div"
          sx={{
            width: {
              sm: '300px',
            },
            mx: 'auto',
            padding: '32px',
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography textAlign="center" variant="h3Semibold" color="gray.900">
            {title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={someFunction}
              sx={{ textTransform: 'none' }}
            >
              <Typography variant="mainTextMedium">Так</Typography>
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={closeModal}
              sx={{ textTransform: 'none' }}
            >
              <Typography variant="mainTextMedium" color="white">
                Ні
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TabModal;
