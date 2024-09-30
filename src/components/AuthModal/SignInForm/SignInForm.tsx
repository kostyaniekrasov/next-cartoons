import { Box, IconButton, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import ClearIcon from '../../../../public/icons/Interface/Close.svg';
import WarningIcon from '../../../../public/icons/Warning/Warning.svg';
import { CustomInput } from '../../CustomInput/CustomInput';
import { SignInModalButton } from '../SignInModalButton/SignInModalButton';

interface AuthFormData {
  email: string;
  password: string;
}

type Props = {
  toggleForm: () => void;
};

export default function SignInForm({ toggleForm }: Readonly<Props>) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AuthFormData>();

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    console.log(data);
  };

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const inputsIsEmpty = !watchEmail || !watchPassword;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
      display: 'flex',
      flexDirection: 'column',
      mx: 'auto',
      gap: '24px',
    }}>
      <CustomInput
        className="main-text"
        fullWidth
        label="Електронна пошта"
        type="text"
        margin="normal"
        error={!!errors.email}
        helperText={
          errors.email ? (
            <div className="flex gap-1 items-center ">
              <WarningIcon
                className={
                  errors.email.type === 'required'
                    ? 'text-red-500 w-3 h-3'
                    : 'text-yellow-500 w-3 h-3'
                }
              />
              <p
                className={
                  errors.email.type === 'required'
                    ? 'inter-regular text-red-500'
                    : 'inter-regular text-yellow-500'
                }
              >
                {errors.email.message}
              </p>
            </div>
          ) : (
            ''
          )
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
              <CSSTransition
                in={!!watchEmail}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <IconButton
                  className="bg-gray-100"
                  onClick={() => setValue('email', '')}
                >
                  <ClearIcon className="text-gray-900" width={14} height={14} />
                </IconButton>
              </CSSTransition>
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
          errors.password ? (
            <div className="flex gap-1 items-center ">
              <WarningIcon
                className={
                  errors.password.type === 'required'
                    ? 'text-red-500 w-3 h-3'
                    : 'text-yellow-500 w-3 h-3'
                }
              />
              <p
                className={
                  errors.password.type === 'required'
                    ? 'inter-regular text-red-500'
                    : 'inter-regular text-yellow-500'
                }
              >
                {errors.password.message}
              </p>
            </div>
          ) : (
            ''
          )
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
              <CSSTransition
                in={!!watchPassword}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <IconButton
                  className="bg-gray-100"
                  onClick={() => setValue('password', '')}
                >
                  <ClearIcon className="text-gray-900" width={14} height={14} />
                </IconButton>
              </CSSTransition>
            ),
          },
        }}
      />

      <SignInModalButton
        type="submit"
        fullWidth
        className="main-text"
        disabled={isSubmitting || inputsIsEmpty}
        sx={{
          borderRadius: '12px',
        }}
      >
        {isSubmitting ? 'Завантаження...' : 'Увійти'}
      </SignInModalButton>

      <div className="flex justify-center items-center">
        <p className="inter-regular text-gray-500">
          {`Не маєте облікового запису? `}
          <Link
            component="button"
            onClick={toggleForm}
            className="inter-regular text-accentPink"
            underline="none"
            sx={{ cursor: 'pointer' }}
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </Box>
  );
}
