import { Alert, Typography } from '@mui/material';
import React, { forwardRef } from 'react';

interface Props {
  onClose?: () => void;
  children: React.ReactNode;
}

const SuccessAlert = forwardRef<HTMLDivElement, Props>(
  ({ onClose, children }: Props, ref) => {
    return (
      <Alert
        ref={ref}
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
  },
);

SuccessAlert.displayName = 'SuccessAlert';

export default SuccessAlert;
