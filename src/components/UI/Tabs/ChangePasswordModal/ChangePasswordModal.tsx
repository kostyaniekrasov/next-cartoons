'use client';

import { ClearIcon, CloseIcon, WarningIcon } from '@/assets/icons';
import useAuthStore from '@/store/useAuthStore';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { WarningAlert } from '../../Alerts';
import { ModalButton } from '../../Buttons';
import { CustomInput } from '../../Inputs';

interface ModalData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface Props {
  open: boolean;
  closeModal: () => void;
  showAlert: () => void;
}

const ChangePasswordModal = ({ open, closeModal, showAlert }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm<ModalData>();

  const { changePassword, loading, error } = useAuthStore();
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
      if (error) {
        setIsErrorAlert(true);
      }
      if (!loading && !error) {
        showAlert();
        closeModal();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      slotProps={{
        backdrop: {
          sx: {
            background: 'rgba(255, 255, 255, 0.20)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          component="div"
          sx={{
            width: {
              sm: '500px',
            },
            mx: 'auto',
            padding: '32px',
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h3Semibold"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                marginRight: '-24px',
              }}
            >
              Зміна паролю
            </Typography>
            <IconButton
              onClick={closeModal}
              sx={{
                color: 'gray.900',
              }}
            >
              <CloseIcon width={24} height={24} />
            </IconButton>
          </Box>

          <CustomInput
            {...register('currentPassword', {
              required: 'Поточний пароль обов’язковий',
            })}
            fullWidth
            label="Поточний пароль"
            type="password"
            error={!!errors.currentPassword}
            helperText={
              <Collapse
                in={!!errors.currentPassword}
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
                    {errors.currentPassword?.message}
                  </Typography>
                </Box>
              </Collapse>
            }
            slotProps={{
              input: {
                endAdornment: (
                  <Collapse
                    in={!!watchCurrentPassword}
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
                      onClick={() => setValue('currentPassword', '')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Collapse>
                ),
              },
            }}
          />

          <CustomInput
            {...register('newPassword', {
              required: 'Новий пароль обов’язковий',
              minLength: {
                value: 8,
                message: 'Пароль має містити мінімум 8 символів',
              },
            })}
            fullWidth
            label="Новий пароль"
            type="password"
            error={!!errors.newPassword}
            helperText={
              <Collapse in={!!errors.newPassword} timeout={200} unmountOnExit>
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
                    {errors.newPassword?.message}
                  </Typography>
                </Box>
              </Collapse>
            }
            slotProps={{
              input: {
                endAdornment: (
                  <Collapse
                    in={!!watchNewPassword}
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
                      onClick={() => setValue('newPassword', '')}
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
            error={!!errors.confirmNewPassword || !passwordsMatch}
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
            {...register('confirmNewPassword', {
              required: 'Підтвердження пароля обов’язкове',
              validate: (value) =>
                value === getValues('newPassword') || 'Паролі не збігаються',
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
                      onClick={() => setValue('confirmNewPassword', '')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Collapse>
                ),
              },
            }}
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
              <Typography variant="mainTextMedium">
                {'Змінити пароль'}
              </Typography>
            )}
          </ModalButton>

          <Collapse in={isErrorAlert} unmountOnExit>
            <WarningAlert onClose={() => setIsErrorAlert(false)}>
              Відбулись помилки при змінні паролю, можливо Ви ввели невірний
              поточний пароль
            </WarningAlert>
          </Collapse>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
