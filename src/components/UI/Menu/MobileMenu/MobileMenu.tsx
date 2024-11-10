'use client';

import {
  BookmarkIcon,
  CloseIcon,
  LogOutIcon,
  LogoMobileIcon,
  SettingsIcon,
} from '@/assets/icons';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { SignInButton } from '../../Buttons';
import { ThemeSwitcher } from '../../Theme';

interface Props {
  onClose: () => void;
  user: User | null;
  openSignIn: () => void;
}

const MobileMenu = ({ onClose, user, openSignIn }: Props) => {
  const { logout } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  const openProfileSettings = (currentTab: 'profile' | 'settings') => {
    router.push(`${pathname}?settings=${currentTab}`);
    onClose();
  };

  const goToAddVideo = () => {
    router.push(`/admin/add-content`);
    onClose();
  };
  const goToSaved = () => {
    router.push(`${pathname}/saved`);
    onClose();
  };

  const goToSignIn = () => {
    openSignIn();
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <Box>
      <Container disableGutters>
        <Box
          component={'header'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: '8px',
            mb: '24px',
          }}
        >
          <LogoMobileIcon />

          <IconButton
            onClick={onClose}
            sx={{
              padding: 0,
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
          {user && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={user.avatar?.url}
                  sx={{
                    width: '48px',
                    height: '48px',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="mainTextSemibold" color="black">
                    {user.name}
                  </Typography>

                  <Typography variant="footnote" color="black">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <MenuItem
                onClick={() => openProfileSettings('profile')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '999px',
                  justifyContent: 'center',
                  backgroundColor: 'gray.100',
                }}
              >
                <Typography variant="secondaryTextSemibold">
                  Переглянути профіль
                </Typography>
              </MenuItem>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <ThemeSwitcher title />

                <MenuItem
                  onClick={goToSaved}
                  sx={{
                    padding: '8px',
                    gap: '4px',
                    color: 'gray.900',
                    minHeight: '37px',
                  }}
                >
                  <BookmarkIcon height={17} width={17} />
                  <Typography variant="secondaryText">Збережені</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => openProfileSettings('settings')}
                  sx={{
                    padding: '8px',
                    gap: '4px',
                    color: 'gray.900',
                    minHeight: '37px',
                  }}
                >
                  <SettingsIcon height={17} width={17} />
                  <Typography variant="secondaryText">Налаштування</Typography>
                </MenuItem>
                {user.role === 'admin' && (
                  <MenuItem
                    onClick={goToAddVideo}
                    sx={{
                      padding: '8px',
                      minHeight: '37px',
                    }}
                  >
                    <Typography variant="secondaryText">
                      Адмін-панель(костиль)
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    gap: '4px',
                    padding: '8px',
                    minHeight: '37px',
                  }}
                >
                  <IconButton
                    sx={{
                      padding: 0,
                      color: 'error.main',
                    }}
                  >
                    <LogOutIcon />
                  </IconButton>
                  <Typography variant="secondaryText" color="error">
                    Вихід
                  </Typography>
                </MenuItem>
              </Box>
            </>
          )}
        </Box>
        {!user && (
          <SignInButton onClick={goToSignIn} fullWidth>
            <Typography variant="mainTextMedium" color="accentPink">
              Увійти
            </Typography>
          </SignInButton>
        )}
      </Container>
    </Box>
  );
};

export default MobileMenu;
