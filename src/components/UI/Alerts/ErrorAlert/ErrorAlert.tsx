import { WarningIcon } from '@/assets/icons';
import { Alert, Typography } from '@mui/material';
import React from 'react';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const ErrorALert = ({ onClose, children }: Props) => {
  return (
    <Alert
      severity="error"
      onClose={onClose}
      icon={<WarningIcon widht={24} height={24} />}
      sx={{
        borderRadius: '12px',
      }}
    >
      <Typography color="error" variant="secondaryText">
        {children}
      </Typography>
    </Alert>
  );
};

export default ErrorALert;
