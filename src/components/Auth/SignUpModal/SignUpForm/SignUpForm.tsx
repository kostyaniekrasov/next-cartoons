'use client';

import { ClearIcon, WarningIcon } from '@/assets/icons';
import { CustomInput, PasswordInput, SelectArrowButton } from '@/components';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import { auth, db } from '@/lib/database/firebase';
import {
  Box,
  Collapse,
  Icon,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
}

type Props = {
  onClose: () => void;
  newTitle: (title: string) => void;
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
};

function SignUpForm({ onClose, newTitle, openModal }: Readonly<Props>) {
  const [step, setStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null,
  );

  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid, errors, isSubmitting, isSubmitted },
    watch,
    getValues,
  } = useForm<AuthFormData>({
    mode: 'onChange',
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchName = watch('name');
  const watchAge = watch('age');

  const passwordsMatch = watchPassword === watchConfirmPassword;

  const buttonText = isSubmitting ? 'Завантаження...' : 'Зареєструватися';

  const inputsIsEmpty =
    step === 1
      ? !watchEmail || !watchPassword || !watchConfirmPassword
      : !watchName || !watchAge;

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    if (step === 1) {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );

        setStep(2);
        newTitle('Вкажіть ім`я та вік');
        setUserCredential(userCred);
      } catch (error) {
        if (
          error instanceof FirebaseError &&
          error.code === 'auth/email-already-in-use'
        ) {
          setEmailErrorMessage('Ця електронна пошта вже використовується.');
        } else {
          console.error('Registration error:', error);
          setEmailErrorMessage(
            'Сталася помилка при реєстрації. Спробуйте ще раз.',
          );
        }
      }
    } else {
      try {
        if (!userCredential) {
          return;
        }

        await updateProfile(userCredential.user, { displayName: data.name });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: data.name,
          age: data.age,
          email: data.email,
          uid: userCredential.user.uid,
          watchLater: [],
          continueWatching: [],
          role: 'User',
          showSearch: true,
        });

        await sendEmailVerification(userCredential.user);
        setIsVerificationMode(true);
        newTitle('Підтвердіть пошту');
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const toggleSelect = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const arrowFunction = () => (
    <SelectArrowButton openSelect={toggleSelect} open={isMenuOpen} />
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        gap: '16px',
      }}
    >
      {step === 1 && !isVerificationMode && (
        <>
          <CustomInput
            fullWidth
            label="Електронна пошта"
            type="email"
            error={(!!errors.email || !!emailErrorMessage) && isSubmitted}
            enterKeyHint="next"
            helperText={
              <Collapse
                in={(!!errors.email || !!emailErrorMessage) && isSubmitted}
                timeout={200}
                unmountOnExit
              >
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
                    {errors.email ? errors.email.message : emailErrorMessage}
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

          <PasswordInput
            label="Пароль"
            error={!!errors.password && isSubmitted}
            errorMessage={errors.password?.message}
            watchPassword={!!watch('password')}
            register={register('password', {
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
                  /^[\x20-\x7E]+$/.test(value) ||
                  'Недруковані символи заборонені',
                noSpaces: (value) =>
                  !/\s/.test(value) || 'Пробіли не дозволені у паролі',
              },
            })}
            clearPassword={() => setValue('password', '')}
          />

          <PasswordInput
            label="Підтвердити пароль"
            error={(!!errors.confirmPassword || !passwordsMatch) && isSubmitted}
            errorMessage={'Паролі не збігаються'}
            watchPassword={!!watch('confirmPassword')}
            register={register('confirmPassword', {
              required: 'Підтвердження пароля обов’язкове',
              validate: (value) =>
                value === getValues('password') || 'Паролі не збігаються',
            })}
            clearPassword={() => setValue('confirmPassword', '')}
          />
        </>
      )}

      {step === 2 && !isVerificationMode && (
        <>
          <CustomInput
            fullWidth
            label="Ім'я"
            type="text"
            error={!!errors.name && isSubmitted}
            enterKeyHint="next"
            helperText={
              <Collapse
                in={!!errors.name && isSubmitted}
                timeout={200}
                unmountOnExit
              >
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
                    {errors.name?.message}
                  </Typography>
                </Box>
              </Collapse>
            }
            {...register('name', {
              required: 'Ім’я обов’язкове',
              maxLength: { value: 30, message: 'Максимум 30 символів' },
              validate: (value) =>
                /^[a-zA-Zа-яА-ЯіІїЇєЄ' ]*$/.test(value) ||
                'Тільки алфавітні символи',
            })}
            slotProps={{
              input: {
                endAdornment: (
                  <Collapse
                    in={!!watchName}
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
                      onClick={() => setValue('name', '')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Collapse>
                ),
              },
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄ' ]+/g,
                '',
              );
            }}
          />
          <CustomInput
            title="age"
            select
            label="Вік"
            defaultValue={3}
            {...register('age', { valueAsNumber: true })}
            sx={{
              '& .Mui-focused arrow': {
                transform: 'rotate(90deg)',
              },
            }}
            slotProps={{
              select: {
                IconComponent: arrowFunction,
                onOpen: () => setIsMenuOpen(true),
                onClose: () => setIsMenuOpen(false),
                open: isMenuOpen,
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: 'white',
                      borderRadius: 2,
                      padding: 1,
                      '& .MuiMenuItem-root': {
                        borderRadius: 2,
                        marginBottom: 1,

                        padding: '8px 16px',
                        color: 'gray.800',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          bgcolor: 'accentPink.main',
                          color: 'white',
                        },
                        '&.Mui-selected': {
                          bgcolor: 'accentPink.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'accentPink.main',
                          },
                        },
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={3}>0-3</MenuItem>
            <MenuItem value={5}>3-5</MenuItem>
            <MenuItem value={8}>6-8</MenuItem>
          </CustomInput>
        </>
      )}

      {isVerificationMode && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
          }}
        >
          <Typography>
            Ми надіслали лист для підтвердження на вашу електронну пошту. Будь
            ласка, перевірте пошту та перейдіть за посиланням для підтвердження
            реєстрації.
          </Typography>
          <Typography variant="caption" color="gray.600">
            Після підтвердження електронної пошти ви зможете виконати вхід у
            свій обліковий запис.
          </Typography>

          <ModalButton
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: '12px',
            }}
          >
            <Typography variant="mainTextMedium">Гаразд</Typography>
          </ModalButton>
        </Box>
      )}

      {!isVerificationMode && (
        <ModalButton
          type="submit"
          fullWidth
          disabled={isSubmitting || inputsIsEmpty || (!isValid && isSubmitted)}
          sx={{
            borderRadius: '12px',
          }}
        >
          <Typography variant="mainTextMedium">
            {step === 1 ? 'Далі' : buttonText}
          </Typography>
        </ModalButton>
      )}

      {!isVerificationMode && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Typography variant="secondaryText" color="gray.600">
            Вже зареєстровані?
          </Typography>

          <Typography
            onClick={() => openModal('sign-in')}
            variant="secondaryText"
            color="accentPink"
            sx={{ cursor: 'pointer' }}
          >
            Увійти
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SignUpForm;
