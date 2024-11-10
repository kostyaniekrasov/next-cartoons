'use client';

import { CloseIcon } from '@/assets/icons';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

interface Props {
  open: boolean;
}

function ResetPasswordModal({ open }: Readonly<Props>) {
  const router = useRouter();
  const pathname = usePathname();

  const closeResetPasswordModal = () => {
    router.replace(pathname);
  };

  return (
    <Modal
      open={open}
      onClose={closeResetPasswordModal}
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
              sm: '435px',
              '3xl': '592px',
            },
            mx: 'auto',
            padding: '32px',
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography textAlign="left" variant="h3Semibold" color="gray.900">
              Відновлення паролю
            </Typography>

            <IconButton
              onClick={closeResetPasswordModal}
              sx={{
                color: 'gray.900',
              }}
            >
              <CloseIcon width={24} height={24} />
            </IconButton>
          </Box>
          <ResetPasswordForm />
        </Box>
      </Box>
    </Modal>
  );
}

export default ResetPasswordModal;
