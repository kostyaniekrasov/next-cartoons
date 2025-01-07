'use client';

import useAuthStore from '@/store/useAuthStore';
import { Box, CircularProgress, Collapse, Typography } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { WarningAlert } from '../../Alerts';
import { ModalButton } from '../../Buttons';
import { PasswordInput } from '../../Inputs';

interface ModalData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface Props {
  showAlert: () => void;
  handleChangeScreen: (name: string) => void;
}

const ChangePasswordScreen = ({ showAlert, handleChangeScreen }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    getValues,
  } = useForm<ModalData>();

  const { changePassword, loading } = useAuthStore();
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const watchCurrentPassword = watch('currentPassword');
  const watchNewPassword = watch('newPassword');
  const watchConfirmPassword = watch('confirmNewPassword');
  const inputsIsEmpty =
    !watchCurrentPassword || !watchNewPassword || !watchConfirmPassword;

  const passwordsMatch = watchNewPassword === watchConfirmPassword;

  const onSubmit: SubmitHandler<ModalData> = async (data) => {
    setIsErrorAlert(false);
    try {
      await changePassword(data.currentPassword, data.newPassword);
    } catch (error) {
      console.log(error);
    } finally {
      const { error } = useAuthStore.getState();
      if (error) {
        setIsErrorAlert(true);
      }
      if (!loading && !error) {
        showAlert();
      }
    }
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
      }}
    >
      <PasswordInput
        label="Поточний пароль"
        error={!!errors.currentPassword && isSubmitted}
        errorMessage={errors.currentPassword?.message}
        watchPassword={!!watch('currentPassword')}
        register={register('currentPassword', {
          required: 'Поточний пароль обов’язковий',
        })}
        clearPassword={() => setValue('currentPassword', '')}
      />

      <PasswordInput
        label="Новий пароль"
        error={!!errors.newPassword && isSubmitted}
        errorMessage={errors.newPassword?.message}
        watchPassword={!!watch('newPassword')}
        register={register('newPassword', {
          required: 'Новий пароль обов’язковий',
          minLength: {
            value: 8,
            message: 'Пароль має містити мінімум 8 символів',
          },
          maxLength: {
            value: 30,
            message: 'Пароль має бути не більше 30 символів',
          },
          validate: {
            hasSpecialChar: (value) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
              'Пароль має містити хоча б один спец-символ',
            hasDigit: (value) =>
              /\d/.test(value) || 'Пароль має містити хоча б одну цифру',
            hasLowerCase: (value) =>
              /[a-z]/.test(value) ||
              'Пароль повинен містити принаймні одну маленьку літеру',
            hasUpperCase: (value) =>
              /[A-Z]/.test(value) ||
              'Пароль повинен містити принаймні одну велику літеру',
            noNonPrinting: (value) =>
              /^[\x20-\x7E]+$/.test(value) || 'Недруковані символи заборонені',
            noSpaces: (value) =>
              !/\s/.test(value) || 'Пробіли не дозволені у паролі',
          },
        })}
        clearPassword={() => setValue('newPassword', '')}
      />

      <PasswordInput
        label="Підтвердити пароль"
        error={(!!errors.confirmNewPassword || !passwordsMatch) && isSubmitted}
        errorMessage={'Паролі не збігаються'}
        watchPassword={!!watch('confirmNewPassword')}
        register={register('confirmNewPassword', {
          required: 'Підтвердження пароля обов’язкове',
          validate: (value) =>
            value === getValues('newPassword') || 'Паролі не збігаються',
        })}
        clearPassword={() => setValue('confirmNewPassword', '')}
      />

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
          <Typography variant="mainTextMedium">{'Змінити пароль'}</Typography>
        )}
      </ModalButton>

      <Collapse in={isErrorAlert} unmountOnExit>
        <WarningAlert onClose={() => setIsErrorAlert(false)}>
          Відбулись помилки при змінні паролю, можливо Ви ввели невірний
          поточний пароль.
          <Typography
            variant="footnote"
            color="accentPink"
            component={'p'}
            mt={'16px'}
            onClick={() => handleChangeScreen('resetPassword')}
            sx={{
              cursor: 'pointer',
            }}
          >
            Відновити пароль
          </Typography>
        </WarningAlert>
      </Collapse>
    </Box>
  );
};

export default ChangePasswordScreen;
