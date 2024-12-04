'use client';

import { ClearIcon, WarningIcon } from '@/assets/icons';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import { auth } from '@/lib';
import checkEmailExists from '@/lib/user/checkEmailExists';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomInput, SuccessAlert, WarningAlert } from '../../..';

interface ResetPasswordData {
  email: string;
}

interface Props {
  showBackToSignIn?: boolean;
}

function ResetPasswordForm({ showBackToSignIn = true }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordData>();

  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleBackToSingIn = () => {
    router.push(`${pathname}?signin=true`);
  };

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    setAlert('');
    setLoading(true);

    try {
      const emailExists = await checkEmailExists(data.email);

      if (!emailExists) {
        setAlert('userNotFound');
        return;
      } else {
        await sendPasswordResetEmail(auth, data.email);
        setAlert('success');
      }
    } catch (error) {
      console.error(error);
      setAlert('error');
    } finally {
      setLoading(false);
    }
  };

  const watchEmail = watch('email');
  const inputsIsEmpty = !watchEmail;

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
          type="text"
          error={!!errors.email}
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
            <Typography variant="mainTextMedium">Надіслати</Typography>
          )}
        </ModalButton>
      </Box>

      {showBackToSignIn && (
        <Typography
          variant="footnote"
          color="accentPink"
          onClick={handleBackToSingIn}
          textAlign={'center'}
          sx={{
            cursor: 'pointer',
          }}
        >
          Повернутися до авторизації
        </Typography>
      )}

      <Collapse
        in={alert === 'success'}
        unmountOnExit
        sx={{ marginTop: '16px' }}
      >
        <SuccessAlert onClose={() => setAlert('')}>
          Лист для відновлення пароля надіслано. Перевірте вашу електронну
          пошту.
        </SuccessAlert>
      </Collapse>

      <Collapse
        in={alert === 'userNotFound'}
        unmountOnExit
        sx={{ marginTop: '16px' }}
      >
        <WarningAlert onClose={() => setAlert('')}>
          Користувача з такою електронною поштою не знайдено.
        </WarningAlert>
      </Collapse>

      <Collapse in={alert === 'error'} unmountOnExit sx={{ marginTop: '16px' }}>
        <WarningAlert onClose={() => setAlert('')}>
          Виникла помилка. Будь ласка, спробуйте ще раз.
        </WarningAlert>
      </Collapse>
    </Box>
  );
}

export default ResetPasswordForm;
