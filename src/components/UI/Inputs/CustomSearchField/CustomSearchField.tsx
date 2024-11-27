import { TextField, TextFieldProps, useTheme } from '@mui/material';
import React from 'react';

const CustomSearch = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const theme = useTheme();
    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          ...props.sx,
          color: 'gray.600',

          '& .MuiOutlinedInput-root': {
            color: 'gray.600',
            padding: '0 4px 0 16px',
            borderRadius: '99px',
            backgroundColor: 'gray.100',
            transition: 'transform 0.3s ease',
            height: '100%',

            '& fieldset': {
              borderColor: 'gray.200',
            },
            '&:hover fieldset, &:hover': {
              borderColor: 'gray.400',
              color: 'gray.900',
            },
            '&.Mui-focused, &.Mui-focused fieldset': {
              color: 'gray.900',

              borderColor: 'gray.400',
            },

            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, :autofill':
              {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.gray[100]} inset`,
                border: 'none',
                height: 'min-height',
                width: 'min-width',
                borderRadius: 0,
                WebkitTextFillColor: theme.palette.gray[900],
              },
          },
        }}
      />
    );
  },
);

CustomSearch.displayName = 'CustomSearch';

export default React.memo(CustomSearch);
