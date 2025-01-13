'use client';

import { ArrowUpRightSMIcon, ClearIcon, WarningIcon } from '@/assets/icons';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import useAuthStore from '@/store/useAuthStore';
import {
  Box,
  CircularProgress,
  Collapse,
  Icon,
  IconButton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomInput, PasswordInput, WarningAlert } from '../../..';

interface AuthFormData {
  email: string;
  password: string;
}

type Props = {
  onClose: () => void;
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
};

function SignInForm({ onClose, openModal }: Readonly<Props>) {
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

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    setAlert('');
    try {
      await loginWithEmailAndPassword(data.email, data.password);
      onClose();
      router.refresh();
    } catch (error) {
      if (error === 'Email not verified') {
        setAlert('emailNotVerified');
      } else {
        setAlert('wrongPasswordOrEmail');
      }
    }
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
      }}
    >
      <Box
        sx={{
          marginBottom: {
            xs: '8px',
            xl: '16px',
          },
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
                    width: {
                      xs: '18px',
                      sm: '24px',
                    },
                    height: {
                      xs: '18px',
                      sm: '24px',
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: 'gray.100',
                      color: 'gray.900',
                      padding: {
                        xs: 0,
                        sm: '4px',
                      },
                    }}
                    onClick={() => setValue('email', '')}
                  >
                    <Icon
                      sx={{
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ClearIcon />
                    </Icon>
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
        <PasswordInput
          label="Пароль"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          watchPassword={!!watch('password')}
          register={register('password', {
            required: 'Пароль обов’язковий',
            minLength: {
              value: 8,
              message: 'Пароль має містити мінімум 8 символів',
            },
          })}
          clearPassword={() => setValue('password', '')}
        />
      </Box>

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

      <Collapse
        in={alert === 'emailNotVerified'}
        unmountOnExit
        sx={{
          mb: 2,
        }}
      >
        <WarningAlert onClose={() => setAlert('')}>
          Будь ласка, підтвердіть вашу електронну пошту і повторно виконайте
          вхід.
        </WarningAlert>
      </Collapse>

      <Collapse
        in={alert === 'wrongPasswordOrEmail'}
        unmountOnExit
        sx={{
          mb: 2,
        }}
      >
        <WarningAlert onClose={() => setAlert('')}>
          Невірний email або пароль. Будь ласка, спробуйте ще раз.
        </WarningAlert>
      </Collapse>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: {
            xs: 'absolute',
            sm: 'static',
          },

          bottom: '32px',
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Typography
            variant="footnote"
            color="accentPink"
            onClick={() => openModal('reset-password')}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Забули свій пароль?
          </Typography>

          <ArrowUpRightSMIcon />
        </Box>

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

          <Typography
            onClick={() => openModal('sign-up')}
            variant="secondaryText"
            color="accentPink"
            sx={{
              cursor: 'pointer',
            }}
          >
            Зареєструватися
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignInForm;
