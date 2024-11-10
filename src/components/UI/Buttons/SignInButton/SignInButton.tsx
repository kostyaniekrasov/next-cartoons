import { Button, ButtonProps } from '@mui/material';
import React from 'react';

const SignInButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        sx={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '17px',
          fontWeight: '500',
          lineHeight: '140%',
          color: 'accentPink',
          textTransform: 'none',
          padding: '0 32px',
          border: ' 1px solid',
          borderColor: 'gray.200',
          height: '56px',
          borderRadius: '99px',

          '&.Mui-selected, &.Mui-selected:hover, &:hover': {
            backgroundColor: 'gray.100',
          },
          '&.MuiButton-root': {
            border: '1px solid',
            borderColor: 'gray.200',

            borderRadius: '99px',
            margin: 0,
          },
        }}
      />
    );
  },
);

SignInButton.displayName = 'SignInButton';

export default SignInButton;
