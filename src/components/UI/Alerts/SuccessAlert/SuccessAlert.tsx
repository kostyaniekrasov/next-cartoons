import { Alert, Typography } from '@mui/material';
import React from 'react';

interface Props {
  onClose?: () => void;
  children: React.ReactNode;
}

const SuccessAlert = ({ onClose, children }: Props) => {
  return (
    <Alert
      severity="success"
      onClose={onClose}
      sx={{
        borderRadius: '12px',
      }}
    >
      <Typography color="success" variant="secondaryText">
        {children}
      </Typography>
    </Alert>
  );
};

export default SuccessAlert;
