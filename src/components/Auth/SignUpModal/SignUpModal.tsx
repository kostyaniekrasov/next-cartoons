'use client';

import { CloseIcon } from '@/assets/icons';
import { SignUpForm } from '@/components';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  open: boolean;
}

function SignUpModal({ open }: Readonly<Props>) {
  const [title, setTitle] = useState('Реєстрація');
  const router = useRouter();
  const pathname = usePathname();

  const closeSignInModal = () => {
    router.replace(pathname);
  };

  const openSignInModal = () => {
    router.push(`${pathname}?signin=true`);
  };

  const ChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <Modal
      open={open}
      onClose={closeSignInModal}
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
              xs: '100%',
              sm: '435px',
              '3xl': '592px',
            },
            height: {
              xs: '100vh',
              sm: 'auto',
            },
            mx: {
              sm: 'auto',
            },
            padding: {
              xs: '8px 16px',
              sm: '32px',
            },
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: {
              sm: '24px',
            },
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
              {title}
            </Typography>

            <IconButton
              onClick={closeSignInModal}
              sx={{
                color: 'gray.900',
                padding: 0,
              }}
            >
              <CloseIcon width={24} height={24} />
            </IconButton>
          </Box>
          <SignUpForm
            onClose={closeSignInModal}
            newTitle={ChangeTitle}
            openSignIn={openSignInModal}
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
