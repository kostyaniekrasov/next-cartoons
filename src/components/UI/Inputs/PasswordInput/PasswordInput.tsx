'use client';

import { ClearIcon, WarningIcon } from '@/assets/icons';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CustomInput } from '../CustomInput';

interface PasswordInputProps {
  label: string;
  error?: boolean;
  errorMessage?: string;
  watchPassword?: boolean;
  register?: UseFormRegisterReturn<
    | 'password'
    | 'confirmPassword'
    | 'currentPassword'
    | 'newPassword'
    | 'confirmNewPassword'
  >;
  clearPassword?: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  errorMessage,
  watchPassword = false,
  register,
  clearPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <CustomInput
      enterKeyHint="next"
      fullWidth
      label={label}
      type={showPassword ? 'text' : 'password'}
      error={error}
      helperText={
        errorMessage ? (
          <Collapse in={error} timeout={200} unmountOnExit>
            <Box
              sx={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                color: 'warning.main',
                paddingTop: '8px',
              }}
            >
              <WarningIcon width={14} height={14} />
              <Typography
                variant="caption"
                sx={{
                  color: 'warning.main',
                }}
              >
                {errorMessage}
              </Typography>
            </Box>
          </Collapse>
        ) : null
      }
      {...register}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Collapse
                in={!!watchPassword}
                orientation="horizontal"
                timeout={200}
                sx={{
                  height: '24px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '55px',
                  }}
                >
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                    sx={{
                      backgroundColor: 'gray.100',
                      color: 'gray.900',
                      padding: '4px',
                    }}
                  >
                    {showPassword ? (
                      <Visibility fontSize="small" />
                    ) : (
                      <VisibilityOff fontSize="small" />
                    )}
                  </IconButton>

                  {clearPassword && (
                    <IconButton
                      sx={{
                        backgroundColor: 'gray.100',
                        color: 'gray.900',
                        padding: '4px',
                      }}
                      onClick={clearPassword}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </Box>
              </Collapse>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordInput;
