'use client';

import { ClearIcon, WarningIcon } from '@/assets/icons';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import useAuthStore from '@/store/useAuthStore';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomInput, WarningAlert } from '../../..';

interface AuthFormData {
  email: string;
  password: string;
}

type Props = {
  onClose: () => void;
  showSignUp: () => void;
};

function SignInForm({ onClose, showSignUp }: Readonly<Props>) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AuthFormData>();

  const { loginWithEmailAndPassword, loading } = useAuthStore();
  const [alert, setAlert] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const openResetPasswordModal = () => {
    router.push(`${pathname}?reset-password=true`);
  };

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    setAlert('');
    await loginWithEmailAndPassword(data.email, data.password)
      .then(() => {
        onClose();
        router.refresh();
      })
      .catch((error) => {
        if (error === 'Email not verified') {
          setAlert('emailNotVerified');
        } else if (error && error !== 'Email not verified') {
          setAlert('wrongPasswordOrEmail');
        }
      });
  };

  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const inputsIsEmpty = !watchEmail || !watchPassword;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          marginBottom: '16px',
        }}
      >
        <CustomInput
          fullWidth
          label="Електронна пошта"
          type="email"
          error={!!errors.email}
          enterKeyHint="next"
          helperText={
            <Collapse in={!!errors.email} timeout={200} unmountOnExit>
              <Box
                sx={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                  paddingTop: '8px',
                  color: 'warning.main',
                }}
              >
                <WarningIcon width={14} height={14} />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'warning.main',
                  }}
                >
                  {errors.email?.message}
                </Typography>
              </Box>
            </Collapse>
          }
          {...register('email', {
            required: 'Електронна пошта обов’язкова',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Невірний формат електронної пошти',
            },
          })}
          slotProps={{
            input: {
              endAdornment: (
                <Collapse
                  in={!!watchEmail}
                  orientation="horizontal"
                  timeout={200}
                  sx={{
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: 'gray.100',
                      color: 'gray.900',
                      padding: '4px',
                    }}
                    onClick={() => setValue('email', '')}
                  >
                    <ClearIcon />
                  </IconButton>
                </Collapse>
              ),
            },
          }}
        />
      </Box>

      <Box
        sx={{
          marginBottom: '12px',
        }}
      >
        <CustomInput
          fullWidth
          label="Пароль"
          type="password"
          error={!!errors.password}
          helperText={
            <Collapse in={!!errors.password} timeout={200} unmountOnExit>
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
                  {errors.password?.message}
                </Typography>
              </Box>
            </Collapse>
          }
          {...register('password', {
            required: 'Пароль обов’язковий',
            minLength: {
              value: 8,
              message: 'Пароль має містити мінімум 8 символів',
            },
          })}
          slotProps={{
            input: {
              endAdornment: (
                <Collapse
                  in={!!watchPassword}
                  orientation="horizontal"
                  timeout={200}
                  sx={{
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: 'gray.100',
                      color: 'gray.900',
                      padding: '4px',
                    }}
                    onClick={() => setValue('password', '')}
                  >
                    <ClearIcon />
                  </IconButton>
                </Collapse>
              ),
            },
          }}
        />
      </Box>

      <Typography
        variant="footnote"
        color="accentPink"
        mb={'16px'}
        onClick={openResetPasswordModal}
        sx={{
          cursor: 'pointer',
        }}
      >
        Забули свій пароль?
      </Typography>

      <Box
        sx={{
          marginBottom: '16px',
        }}
      >
        <ModalButton
          type="submit"
          fullWidth
          disabled={isSubmitting || inputsIsEmpty}
          sx={{
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="mainTextMedium">{'Увійти'}</Typography>
          )}
        </ModalButton>
      </Box>

      <Collapse in={alert === 'emailNotVerified'} unmountOnExit>
        <WarningAlert onClose={() => setAlert('')}>
          Будь ласка, підтвердіть вашу електронну пошту і повторно виконайте
          вхід.
        </WarningAlert>
      </Collapse>

      <Collapse in={alert === 'wrongPasswordOrEmail'} unmountOnExit>
        <WarningAlert onClose={() => setAlert('')}>
          Невірний email або пароль. Будь ласка, спробуйте ще раз.
        </WarningAlert>
      </Collapse>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Typography variant="secondaryText" color="gray.600">
          {`Не маєте облікового запису? `}
        </Typography>
        <Link
          component="button"
          onClick={(event) => {
            event.preventDefault();
            showSignUp();
          }}
          variant="secondaryText"
          color="accentPink"
          underline="none"
          sx={{ cursor: 'pointer' }}
        >
          Зареєструватися
        </Link>
      </Box>
    </Box>
  );
}

export default SignInForm;
