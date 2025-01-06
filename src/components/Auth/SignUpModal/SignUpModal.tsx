'use client';

import { CloseIcon } from '@/assets/icons';
import { SignUpForm } from '@/components';
import { useModalStore } from '@/store';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
}

function SignUpModal({ openModal }: Readonly<Props>) {
  const router = useRouter();
  const { modals, closeModal } = useModalStore();
  const [isVisible, setIsVisible] = useState(modals['sign-up']);
  const [title, setTitle] = useState('Реєстрація');

  const closeSignInModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push('?');
      closeModal('sign-up');
    }, 300);
  };

  const handleOpenModal = (modal: keyof typeof modals) => {
    openModal(modal);
    closeModal('sign-up');
  };

  const ChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  useEffect(() => {
    setIsVisible(modals['sign-up']);
  }, [modals]);

  return (
    <Modal
      open={modals['sign-up']}
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
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key="signUpModal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
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
                  <Typography
                    textAlign="left"
                    variant="h3Semibold"
                    color="gray.900"
                  >
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
                  openModal={handleOpenModal}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
