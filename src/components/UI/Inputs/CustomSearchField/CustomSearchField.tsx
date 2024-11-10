import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

const CustomSearch = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          color: 'gray.600',
          width: {
            xl: '432px',
            '3xl': '592px',
          },

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

            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus':
              {
                WebkitBoxShadow: '0 0 0 1000px gray.100 inset',
                WebkitTextFillColor: 'gray.900',
              },
          },
        }}
      />
    );
  },
);

CustomSearch.displayName = 'CustomSearch';

export default CustomSearch;
