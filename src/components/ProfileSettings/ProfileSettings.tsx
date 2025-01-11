'use client';

import {
  ExitProfileIcon,
  SettingsProfileIcon,
  UserProfileIcon,
} from '@/assets/icons';
import { TabProfile, TabSettings, a11yProps } from '@/components';
import { useModalStore } from '@/store';
import useAuthStore from '@/store/useAuthStore';
import { Box, Modal, Tabs } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SettingsTab, TabModal } from '../UI';

const ProfileSettings = () => {
  const { modals, closeModal } = useModalStore();
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    router.push('?');
    closeModal('settings');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setValue(0);
  };

  return (
    <Modal
      open={modals['settings']}
      onClose={handleClose}
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
            display: 'flex',
            width: {
              sm: '660px',
              xl: '760px',
            },
            padding: '24px',
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: 'gray.100',

              minWidth: {
                '2xl': '228px',
              },
              minHeight: {
                '2xl': '513px',
              },
              paddingRight: '16px',
              '& .MuiTabs-indicator': {
                display: 'none',
              },

              '& .MuiTab-root': {
                marginBottom: '8px',
              },
              '& .MuiTabs-root': {
                marginBottom: '8px',
              },
            }}
          >
            <SettingsTab
              customIcon={<UserProfileIcon />}
              customLabel="Профіль"
              {...a11yProps(0)}
            />

            <SettingsTab
              customIcon={<SettingsProfileIcon />}
              customLabel="Налаштування"
              {...a11yProps(1)}
            />

            <SettingsTab
              customIcon={<ExitProfileIcon />}
              customLabel="Вихід"
              onClick={() => setShowModal(true)}
            />
          </Tabs>

          <AnimatePresence mode="wait">
            {value === 0 && (
              <motion.div
                key="TabProfile"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                }}
              >
                <TabProfile value={value} handleClose={handleClose} index={0} />
              </motion.div>
            )}

            {value === 1 && (
              <motion.div
                key="TabSettings"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                }}
              >
                <TabSettings
                  value={value}
                  index={1}
                  handleClose={handleClose}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <TabModal
            title="Вийти з системи?"
            open={showModal}
            closeModal={handleCloseModal}
            someFunction={logout}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileSettings;
