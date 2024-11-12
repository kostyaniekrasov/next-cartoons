import { ToggleButton, ToggleButtonProps } from '@mui/material';
import React from 'react';

const CustomToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  return (
    <ToggleButton
      ref={ref}
      {...props}
      sx={{
        color: 'gray.900',
        textTransform: 'none',
        padding: '8px 16px',
        boxSizing: 'border-box',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&.MuiToggleButton-root': {
          border: '1px solid',
          borderColor: 'gray.200',
          borderRadius: '99px',
          margin: 0,
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: 'accentPink.main',
          color: 'white',
          borderColor: 'accentPink.main',
        },
        '&:hover': {
          border: '1px solid',
          borderColor: 'gray.100',
        },
      }}
    />
  );
});

CustomToggleButton.displayName = 'CustomToggleButton';

export default React.memo(CustomToggleButton);
