'use client';

import { LogoMenuIcon, XmarkIcon } from '@/assets/icons';
import { SignUpForm } from '@/components';
import { useModalStore } from '@/store';
import { Box, Icon, IconButton, Modal, Typography } from '@mui/material';
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

  const closeCurrentModal = () => {
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
      onClose={closeCurrentModal}
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
              style={{ width: '100%' }}
            >
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
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
                    xs: '16px',
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
                    position: 'relative',
                  }}
                >
                  <Typography
                    textAlign="left"
                    variant="h3Semibold"
                    color="gray.900"
                    sx={{
                      display: {
                        xs: 'none',
                        xl: 'block',
                      },
                    }}
                  >
                    {title}
                  </Typography>

                  <Icon
                    sx={{
                      width: 'max-content',
                      height: 'max-content',
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: {
                        xl: 'none',
                      },
                    }}
                  >
                    <LogoMenuIcon />
                  </Icon>

                  <IconButton
                    onClick={closeCurrentModal}
                    sx={{
                      color: 'gray.900',
                      boxSizing: 'border-box',
                      border: '1px solid',
                      borderColor: 'gray.200',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      width: '32px',
                      height: '32px',
                      ml: {
                        xs: 'auto',
                        xl: 0,
                      },
                    }}
                  >
                    <Icon
                      sx={{
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        color: 'gray.900',
                      }}
                    >
                      <XmarkIcon />
                    </Icon>
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 'auto',
                    width: '100%',
                    gap: '40px',
                  }}
                >
                  <Typography
                    variant="mainText"
                    textAlign={'center'}
                    component={'p'}
                    sx={{
                      display: {
                        xl: 'none',
                      },
                    }}
                  >
                    {title}
                  </Typography>

                  <SignUpForm
                    onClose={closeCurrentModal}
                    newTitle={ChangeTitle}
                    openModal={handleOpenModal}
                  />
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Modal>
  );
}

export default SignUpModal;
