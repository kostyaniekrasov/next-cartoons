'use client';

import { CloseIcon } from '@/assets/icons';
import { ResetPasswordForm } from '@/components/Auth/ResetPasswordModal/ResetPasswordForm';
import { SuccessAlert } from '@/components/UI';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Fade, IconButton, Snackbar, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { ChangePasswordScreen } from '../ChangePasswordScreen';
import TabPanel from '../TabPanel/TabPanel';
import { AllSettings } from './AllSettings';

interface Props {
  value: number;
  handleClose: () => void;
  index: number;
}

const TabSettings = ({ value, handleClose, index }: Props) => {
  const [successChangeAlert, setSuccessChangeAlert] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('all');

  const handleShowAlert = () => {
    setSuccessChangeAlert(true);
  };

  const handleBackScreen = () => {
    if (currentScreen === 'changePassword') {
      setCurrentScreen('all');
    }

    if (currentScreen === 'resetPassword') {
      setCurrentScreen('changePassword');
    }
  };

  const handleChangeScreen = (name: string) => {
    setCurrentScreen(name);
  };
  const getTitle = () => {
    switch (currentScreen) {
      case 'all':
        return 'Налаштування';

      case 'changePassword':
        return 'Зміна паролю';

      case 'resetPassword':
        return 'Відновлення паролю';

      default:
        return 'Налаштування';
    }
  };

  return (
    <TabPanel value={value} index={index}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          paddingLeft: '16px',
        }}
      >
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Fade in={currentScreen !== 'all'}>
            <IconButton onClick={handleBackScreen}>
              <ArrowBackIosNewIcon
                fontSize="small"
                sx={{
                  color: 'gray.900',
                }}
              />
            </IconButton>
          </Fade>
          <Typography
            variant="h3Semibold"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              marginRight: '-24px',
            }}
          >
            {getTitle()}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'gray.900',
            }}
          >
            <CloseIcon width={24} height={24} />
          </IconButton>
        </Box>

        {/* <Fade timeout={200} in={currentScreen === 'all'} unmountOnExit> */}
        <AnimatePresence mode="wait">
          {currentScreen === 'all' && (
            <motion.div
              key="AllSettings"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <AllSettings
                openChangePassword={() => setCurrentScreen('changePassword')}
              />
            </motion.div>
          )}

          {currentScreen === 'changePassword' && (
            <motion.div
              key="changePassword"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ChangePasswordScreen
                showAlert={handleShowAlert}
                handleChangeScreen={handleChangeScreen}
              />
            </motion.div>
          )}

          {currentScreen === 'resetPassword' && (
            <motion.div
              key="resetPassword"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ResetPasswordForm showBackToSignIn={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <Snackbar
        open={!!successChangeAlert}
        onClose={() => setSuccessChangeAlert(false)}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SuccessAlert>Пароль успішно змінено.</SuccessAlert>
      </Snackbar>
    </TabPanel>
  );
};

export default TabSettings;
