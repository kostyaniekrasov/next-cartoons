'use client';

import {
  ChevronRightIcon,
  ClearIcon,
  CloseIcon,
  WarningIcon,
} from '@/assets/icons';
import {
  CustomInput,
  ErrorAlert,
  SelectArrowButton,
  SuccessAlert,
  WarningAlert,
} from '@/components/UI';
import AvatarsList from '@/components/UI/AvatarList/AvatarList';
import { ModalButton } from '@/components/UI/Buttons/ModalButton';
import useAuthStore from '@/store/useAuthStore';
import AvatarData from '@/types/AvatarData';
import UpdateUserData from '@/types/UpdateUserData';
import {
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  Icon,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TabPanel from '../TabPanel/TabPanel';

interface Props {
  value: number;
  handleClose: () => void;
  index: number;
}

interface InputsData {
  name: string;
  age: number;
}

const TabProfile = ({ value, handleClose, index }: Props) => {
  const [isShowAvatars, setIsShowAvatars] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
  const [isAlert, setIsAlert] = useState('');

  const { user, updateUserProfile, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<InputsData>({
    defaultValues: {
      name: user?.name,
      age: user?.age,
    },
  });
  const watchName = watch('name');
  const watchAge = watch('age');

  const router = useRouter();

  const handleToggle = () => {
    setIsShowAvatars(!isShowAvatars);
  };

  const handleSelectAvatar = (avatar: AvatarData) => {
    setSelectedAvatar(avatar);
  };

  const onSubmit = async (data: Partial<UpdateUserData>) => {
    setIsAlert('');

    if (selectedAvatar) {
      await updateUserProfile(data, selectedAvatar)
        .then(() => {
          setIsAlert('Profile');
          router.refresh();
        })
        .catch((err) => {
          if (err instanceof Error && err.message === 'No changes') {
            setIsAlert('NoChanges');
          } else {
            setIsAlert('ProfileError');
            console.error(err);
          }
        });
    } else {
      await updateUserProfile(data)
        .then(() => {
          setIsAlert('Profile');
          router.refresh();
        })
        .catch((err) => {
          if (err instanceof Error && err.message === 'No changes') {
            setIsAlert('NoChanges');
          } else {
            setIsAlert('ProfileError');
            console.error(err);
          }
        });
    }
  };

  const toggleSelect = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const arrowFunction = () => (
    <SelectArrowButton openSelect={toggleSelect} open={isMenuOpen} />
  );

  return (
    <TabPanel value={value} index={index}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          paddingLeft: '16px',
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
            Профіль
          </Typography>

          <IconButton
            onClick={handleClose}
            sx={{
              color: 'gray.900',
            }}
          >
            <CloseIcon width={24} height={24} />
          </IconButton>
        </Box>

        <Avatar
          alt="Avatar"
          src={selectedAvatar ? selectedAvatar.url : user?.avatar?.url}
          sx={{
            alignSelf: 'center',
            width: '120px',
            height: '120px',
            backgroundColor: 'gray.100',
          }}
        />

        <IconButton
          onClick={handleToggle}
          sx={{
            color: 'gray.600',
            borderRadius: '12px',
            gap: '4px',
          }}
        >
          <Typography variant="button" color="accentPink">
            Доступні аватари
          </Typography>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.3s ease',
              transform: isShowAvatars ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronRightIcon />
          </Box>
        </IconButton>

        <Collapse in={isShowAvatars} unmountOnExit>
          <AvatarsList
            avatarUrl={selectedAvatar?.url}
            selectAvatar={handleSelectAvatar}
          />
        </Collapse>

        <CustomInput
          fullWidth
          label="Ім'я"
          type="text"
          error={!!errors.name}
          enterKeyHint="next"
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
                      padding: {
                        xs: 0,
                        sm: '4px',
                      },
                    }}
                    onClick={() => setValue('name', '')}
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
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ' ]+/g, '');
          }}
        />

        <CustomInput
          select
          label="Вік"
          value={watchAge}
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

        <Collapse in={isAlert === 'Profile'} unmountOnExit>
          <SuccessAlert onClose={() => setIsAlert('')}>
            Дані успішно змінено.
          </SuccessAlert>
        </Collapse>

        <Collapse in={isAlert === 'ProfileError'} unmountOnExit>
          <ErrorAlert onClose={() => setIsAlert('')}>
            Відбулись помилки при зміні данних. Спробуйте пізніше.
          </ErrorAlert>
        </Collapse>

        <Collapse in={isAlert === 'NoChanges'} unmountOnExit>
          <WarningAlert onClose={() => setIsAlert('')}>
            Немає змін для оновлення
          </WarningAlert>
        </Collapse>

        <ModalButton type="submit">
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="mainText">Зберегти</Typography>
          )}
        </ModalButton>
      </Box>
    </TabPanel>
  );
};

export default TabProfile;
