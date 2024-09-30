import colors from '@/utils/customColors';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import ClearIcon from '../../../public/icons/Interface/Close.svg';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

type Props = {
  open: boolean;
  close: () => void;
};

export default function AuthForm({ open, close }: Readonly<Props>) {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return (
    <Modal
      open={open}
      onClose={close}
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
        component="form"
        sx={{
          width: 435,
          mx: 'auto',
          p: '32px',
          border: `1px solid ${colors.gray[200]}`,
          borderRadius: '24px',
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
        }}
      >
        <div className="flex items-center justify-between">
          <Typography
            component="h3"
            textAlign="left"
            className="h3 text-gray-900"
          >
            {isSignUp ? 'Реєстрація' : 'Авторизація'}
          </Typography>

          <IconButton onClick={close}>
            <ClearIcon className="text-gray-900" width={24} height={24} />
          </IconButton>
        </div>
        {isSignUp ? (
          <SignUpForm toggleForm={toggleForm} />
        ) : (
          <SignInForm toggleForm={toggleForm} />
        )}
      </Box>
    </Modal>
  );
}
