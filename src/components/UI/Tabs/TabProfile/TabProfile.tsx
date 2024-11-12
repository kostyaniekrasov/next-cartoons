'use client';

import { ChevronRightIcon, CloseIcon } from '@/assets/icons';
import {
  CustomInput,
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
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TabPanel from '../TabPanel/TabPanel';

interface Props {
  value: number;
  handleClose: () => void;
  index: number;
}

const TabProfile = ({ value, handleClose, index }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAvatars, setIsShowAvatars] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
  const [isAlert, setIsAlert] = useState('');

  const { user, updateUserProfile } = useAuthStore();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      age: user?.age,
    },
  });

  const handleToggle = () => {
    setIsShowAvatars(!isShowAvatars);
  };

  const handleSelectAvatar = (avatar: AvatarData) => {
    setSelectedAvatar(avatar);
  };

  const onSubmit = async (data: Partial<UpdateUserData>) => {
    if (selectedAvatar) {
      await updateUserProfile(data, selectedAvatar)
        .then(() => setIsAlert('Profile'))
        .catch(() => setIsAlert('ProfileError'))
        .finally(() => setIsLoading(false));
    } else {
      await updateUserProfile(data)
        .then(() => setIsAlert('Profile'))
        .catch(() => setIsAlert('ProfileError'))
        .finally(() => setIsLoading(false));
    }
  };

  const arrowFunction = () => <SelectArrowButton open={isMenuOpen} />;

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
        <CustomInput title="name" label="Ім'я" {...register('name')} />
        <CustomInput
          title="age"
          select
          label="Вік"
          defaultValue={user?.age}
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
        <Collapse in={isAlert === 'Profile'} unmountOnExit>
          <SuccessAlert onClose={() => setIsAlert('')}>
            Дані успішно змінено.
          </SuccessAlert>
        </Collapse>
        <Collapse in={isAlert === 'ProfileError'} unmountOnExit>
          <WarningAlert onClose={() => setIsAlert('')}>
            Відбулись помилки при зміні данних. Спробуйте пізніше.
          </WarningAlert>
        </Collapse>
        <ModalButton type="submit">
          {isLoading ? (
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
