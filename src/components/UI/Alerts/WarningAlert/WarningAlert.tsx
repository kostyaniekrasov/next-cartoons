import { WarningIcon } from '@/assets/icons';
import { Alert, Typography } from '@mui/material';
import React from 'react';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const WarnignAlert = ({ onClose, children }: Props) => {
  return (
    <Alert
      severity="warning"
      onClose={onClose}
      icon={<WarningIcon widht={24} height={24} />}
      sx={{
        borderRadius: '12px',
      }}
    >
      <Typography color="warning" variant="secondaryText">
        {children}
      </Typography>
    </Alert>
  );
};

export default WarnignAlert;
