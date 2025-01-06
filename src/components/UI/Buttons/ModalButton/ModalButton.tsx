import { Button, ButtonProps } from '@mui/material';
import React from 'react';

const ModalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        sx={{
          fontFamily: 'var(--font-inter), sans-serif',

          color: 'accentPink.main',
          textTransform: 'none',
          padding: '0 32px',
          height: {
            xs: '45px',
            xl: '56px',
          },
          border: '1px solid',
          boxSizing: 'border-box',
          borderColor: 'transparent',
          '&.MuiButton-root': {
            backgroundColor: 'accentPink.main',
            color: 'white',

            borderRadius: '12px',
            margin: 0,
          },

          '&.Mui-selected, &.Mui-selected:hover, &:hover': {
            backgroundColor: 'white',
            color: 'accentPink.main',
            borderColor: 'gray.200',
          },

          '&.Mui-disabled': {
            backgroundColor: 'gray.100',
            color: 'gray.400',
          },
        }}
      />
    );
  },
);

ModalButton.displayName = 'SignInModalButton';

export default ModalButton;
