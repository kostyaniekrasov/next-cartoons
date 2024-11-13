'use client';

import { ClearIcon, WarningIcon } from '@/assets/icons';
import { CustomInput, SelectArrowButton } from '@/components';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import { auth, db } from '@/lib/database/firebase';
import {
  Box,
  Collapse,
  IconButton,
  Link,
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
  openSignIn: () => void;
};

function SignUpForm({ onClose, newTitle, openSignIn }: Readonly<Props>) {
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
    formState: { isValid, errors, isSubmitting },
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

  const arrowFunction = () => <SelectArrowButton open={isMenuOpen} />;

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
            type="text"
            error={!!errors.email || !!emailErrorMessage}
            helperText={
              <Collapse
                in={!!errors.email || !!emailErrorMessage}
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

          <CustomInput
            fullWidth
            label="Підтвердити пароль"
            type="password"
            error={!!errors.confirmPassword || !passwordsMatch}
            helperText={
              <Collapse in={!passwordsMatch} timeout={200} unmountOnExit>
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
                    Паролі не збігаються
                  </Typography>
                </Box>
              </Collapse>
            }
            {...register('confirmPassword', {
              required: 'Підтвердження пароля обов’язкове',
              validate: (value) =>
                value === getValues('password') || 'Паролі не збігаються',
            })}
            slotProps={{
              input: {
                endAdornment: (
                  <Collapse
                    in={!!watchConfirmPassword}
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
                      onClick={() => setValue('confirmPassword', '')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Collapse>
                ),
              },
            }}
          />
        </>
      )}

      {step === 2 && !isVerificationMode && (
        <>
          <CustomInput
            fullWidth
            label="Ім'я"
            type="text"
            error={!!errors.name}
            helperText={
              <Collapse in={!!errors.name} timeout={200} unmountOnExit>
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
          disabled={isSubmitting || inputsIsEmpty || !isValid}
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
          <Link
            component="button"
            onClick={openSignIn}
            variant="secondaryText"
            color="accentPink"
            underline="none"
            sx={{ cursor: 'pointer' }}
          >
            Увійти
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default SignUpForm;
