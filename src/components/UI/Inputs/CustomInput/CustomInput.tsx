import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

const CustomInput = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          ...props.sx,
          color: 'gray.600',
          fontFamily: 'var(--font-inter), sans-serif',
          '& .MuiOutlinedInput-root': {
            color: 'gray.600',
            padding: '16px',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            '& .MuiOutlinedInput-input': {
              padding: 0,
            },
            '&.Mui-error': {
              borderColor: 'warning.main',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: 'warning.main',
            },
            '&.Mui-error .MuiInputLabel-root': {
              color: 'warning.main',
            },
            '& fieldset': {
              borderColor: 'gray.200',
            },
            '&:hover fieldset, &:hover': {
              borderColor: 'gray.400',
              color: 'gray.900',
            },
            '&.Mui-focused': {
              color: 'gray.900',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'gray.400',
            },
            '&.Mui-disabled': {
              color: 'gray.400',
              borderColor: 'gray.200',
            },
            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus':
              {
                WebkitBoxShadow: `0 0 0 1000px inset`,
                border: 'none',
                borderRadius: 0,
              },
          },
          '& .MuiInputLabel-root': {
            color: 'gray.600',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '17px',
            fontWeight: '400',
            lineHeight: '140%',
            '&.Mui-focused': {
              color: 'gray.900',
              fontFamily: 'var(--font-inter), sans-serif',
              backgroundColor: 'white',
              paddingRight: '5px',
            },
            '&.Mui-error': {
              color: 'warning.main',
            },
          },
        }}
      />
    );
  },
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
