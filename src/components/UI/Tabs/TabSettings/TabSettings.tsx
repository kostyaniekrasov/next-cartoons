'use client';

import { CloseIcon } from '@/assets/icons';
import { ChangePasswordModal, SuccessAlert } from '@/components/UI';
import { removeAllVideosFromCW } from '@/lib/playlists/continueWatching';
import { removeAllVideosFromWatchLater } from '@/lib/playlists/savedVideos';
import useAuthStore from '@/store/useAuthStore';
import { UpdateUserData } from '@/types';
import {
  Box,
  Divider,
  IconButton,
  Snackbar,
  Switch,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TabModal } from '../TabModal';
import TabPanel from '../TabPanel/TabPanel';

interface Props {
  value: number;
  handleClose: () => void;
  index: number;
}

const TabSettings = ({ value, handleClose, index }: Props) => {
  const { user, updateUserProfile } = useAuthStore();
  const [isOpenModal, setIsOpenModal] = useState('');
  const [successChangeAlert, setSuccessChangeAlert] = useState(false);
  const router = useRouter();

  const handleChangeSearchInput = async () => {
    if (!user) return;

    try {
      const updatedData: UpdateUserData = { showSearch: !user.showSearch };
      await updateUserProfile(updatedData);
    } catch (error) {
      console.error('Failed to update search visibility:', error);
    }
  };

  const handleRemoveCW = async () => {
    if (user) {
      await removeAllVideosFromCW(user.id);
      router.refresh();
    }
    setIsOpenModal('');
  };

  const handleRemoveWatchLater = async () => {
    if (user) {
      await removeAllVideosFromWatchLater(user.id);
      router.refresh();
    }
    setIsOpenModal('');
  };

  const handleShowAlert = () => {
    setSuccessChangeAlert(true);
  };

  return (
    <TabPanel value={value} index={index}>
      <Box
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
            Налаштування
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="mainTextMedium">Відображення пошуку</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography variant="secondaryTextSemibold" color="accentPink">
                Пошук
              </Typography>
              <Typography variant="caption" color="gray.700">
                Вимкнення пошуку сховає поле пошуку на сторінці
              </Typography>
            </Box>
            <Switch
              checked={user?.showSearch}
              onChange={handleChangeSearchInput}
              sx={{
                width: 56,
                height: 32,
                padding: 0,
                '& .MuiSwitch-switchBase': {
                  padding: 1,
                  top: '50%',
                  transform: 'translate(-5px,-50%)',

                  '&.Mui-checked': {
                    transform: 'translate(18px, -50%)',
                    color: 'white',
                    '& + .MuiSwitch-track': {
                      backgroundColor: 'accentPink.main',
                      opacity: 1,
                      border: 0,
                    },
                  },

                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
                '& .MuiSwitch-thumb': {
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                },
                '& .MuiSwitch-track': {
                  borderRadius: 16,
                  backgroundColor: 'gray.200',
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>

        <Divider
          sx={{
            backgroundColor: 'gray.100',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="mainTextMedium">Управління списками</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <Typography
              variant="secondaryTextSemibold"
              color="accentPink"
              onClick={() => setIsOpenModal('WL')}
              sx={{
                cursor: 'pointer',
              }}
            >
              {`Очистити збережені відео`}
            </Typography>
            <Typography variant="caption" color="gray.700">
              {`Видалить всі відео зі "Збережені"`}
            </Typography>
            <TabModal
              title="Видалити список?"
              open={isOpenModal === 'WL'}
              closeModal={() => setIsOpenModal('')}
              someFunction={handleRemoveWatchLater}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <Typography
              variant="secondaryTextSemibold"
              color="accentPink"
              onClick={() => setIsOpenModal('CW')}
              sx={{
                cursor: 'pointer',
              }}
            >
              {`Очистити "Продовжити перегляд"`}
            </Typography>
            <Typography variant="caption" color="gray.700">
              {`Видалить всі відео з "Продовжити перегляд"`}
            </Typography>
            <TabModal
              title="Видалити список?"
              open={isOpenModal === 'CW'}
              closeModal={() => setIsOpenModal('')}
              someFunction={handleRemoveCW}
            />
          </Box>
        </Box>

        {/* 
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="mainTextMedium">
            Зовнішній вигляд (Інтерфейс)
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography variant="secondaryTextSemibold" color="accentPink">
                Темний/Світлий режим
              </Typography>
              <Typography variant="caption" color="gray.700">
                Перемикач між темним і світлим дизайном.
              </Typography>
            </Box>
            <ThemeSwitcher />
          </Box>
        </Box> */}

        <Divider
          sx={{
            backgroundColor: 'gray.100',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="mainTextMedium">Безпека</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography
                variant="secondaryTextSemibold"
                color="accentPink"
                onClick={() => setIsOpenModal('changePassword')}
                sx={{
                  cursor: 'pointer',
                }}
              >
                Змінити пароль
              </Typography>
              <Typography variant="caption" color="gray.700">
                Змінити поточний пароль на новий
              </Typography>

              <ChangePasswordModal
                open={isOpenModal === 'changePassword'}
                closeModal={() => setIsOpenModal('')}
                showAlert={handleShowAlert}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={successChangeAlert}
        onClose={() => setSuccessChangeAlert(false)}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SuccessAlert>Пароль успішно змінено.</SuccessAlert>
      </Snackbar>
    </TabPanel>
  );
};

export default TabSettings;
