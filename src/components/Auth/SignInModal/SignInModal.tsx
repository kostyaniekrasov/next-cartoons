'use client';

import { CloseIcon } from '@/assets/icons';
import { SignInForm } from '@/components';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modalSignIn = searchParams.get('sign-in');

  const [open, setOpen] = useState(false);
  const closeSignInModal = () => {
    router.replace(pathname);
  };

  const openSignUpModal = () => {
    router.push(`${pathname}?sign-up=true`);
  };

  useEffect(() => {
    if (modalSignIn === 'true') {
      setOpen(true);
    } else setOpen(false);
  }, [modalSignIn]);

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
              Авторизація
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
          <SignInForm onClose={closeSignInModal} showSignUp={openSignUpModal} />
        </Box>
      </Box>
    </Modal>
  );
}

export default SignInModal;
