'use client';

import { CloseIcon } from '@/assets/icons';
import { useModalStore } from '@/store';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

interface Props {
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
}

function ResetPasswordModal({ openModal }: Readonly<Props>) {
  const router = useRouter();
  const { modals, closeModal } = useModalStore();
  const [isVisible, setIsVisible] = useState(modals['reset-password']);

  const closeResetPasswordModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push('?');
      closeModal('reset-password');
    }, 300);
  };

  const handleOpenModal = (modal: keyof typeof modals) => {
    openModal(modal);
    closeModal('reset-password');
  };

  useEffect(() => {
    setIsVisible(modals['reset-password']);
  }, [modals]);

  return (
    <Modal
      open={modals['reset-password']}
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
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key="resetPasswordModal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
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
                  <Typography
                    textAlign="left"
                    variant="h3Semibold"
                    color="gray.900"
                  >
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
                <ResetPasswordForm openModal={handleOpenModal} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
}

export default ResetPasswordModal;
