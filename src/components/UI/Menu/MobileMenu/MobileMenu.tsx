'use client';

import {
  BookmarkIcon,
  LogOutIcon,
  LogoMobileIcon,
  SettingsIcon,
  XmarkIcon,
} from '@/assets/icons';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Icon,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SignInButton } from '../../Buttons';
import { ThemeSwitcher } from '../../Theme';

interface Props {
  onClose: () => void;
  user: User | null;
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
}

const MobileMenu = ({ onClose, user, openModal }: Props) => {
  const { logout } = useAuthStore();

  const router = useRouter();

  const handleOpenSettings = () => {
    openModal('settings');
    onClose();
  };

  const goToAddVideo = () => {
    router.push(`/admin/add-content`);
    onClose();
  };
  const goToSaved = () => {
    router.push(`/saved`);
    onClose();
  };

  const goToSignIn = () => {
    openModal('sign-in');
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          boxShadow: 'none',
          marginBottom: '16px',
        }}
      >
        <Container
          maxWidth="2xl"
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            padding: '16px',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => router.push('/')}
              sx={{
                padding: 0,
              }}
            >
              <Icon
                sx={{
                  width: '100%',
                  height: '100%',
                  display: {
                    xs: 'block',
                    lg: 'none',
                  },
                }}
              >
                <LogoMobileIcon />
              </Icon>
            </IconButton>

            <Box
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'none',
                },
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'gray.900',
                  boxSizing: 'border-box',
                  border: '1px solid',
                  borderColor: 'gray.200',
                  borderRadius: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  width: '32px',
                  height: '32px',
                }}
              >
                <Icon
                  sx={{
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    color: 'gray.900',
                  }}
                >
                  <XmarkIcon />
                </Icon>
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AppBar>

      <Container disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {user && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '8px',
                  border: '1px solid',
                  borderColor: 'gray.200',
                  borderRadius: '12px',
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

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <MenuItem
                    onClick={goToSaved}
                    sx={{
                      gap: '4px',
                      color: 'gray.900',
                      minHeight: '37px',
                      backgroundColor: 'white',
                      padding: '8px',
                      border: '1px solid',
                      borderColor: 'gray.200',
                      borderRadius: '12px',
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <BookmarkIcon height={17} width={17} />
                    <Typography variant="secondaryText">Збережені</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleOpenSettings()}
                    sx={{
                      backgroundColor: 'white',
                      padding: '8px',
                      border: '1px solid',
                      borderColor: 'gray.200',
                      borderRadius: '12px',
                      gap: '4px',
                      justifyContent: 'center',
                      color: 'gray.900',
                      minHeight: '37px',
                      flex: 1,
                    }}
                  >
                    <SettingsIcon height={17} width={17} />

                    <Typography variant="secondaryText">
                      Налаштування
                    </Typography>
                  </MenuItem>
                </Box>

                <Box
                  sx={{
                    backgroundColor: 'white',
                    padding: '8px',
                    border: '1px solid',
                    borderColor: 'gray.200',
                    borderRadius: '12px',
                    justifyContent: 'space-between',
                  }}
                >
                  <ThemeSwitcher title />
                </Box>

                {user.role === 'admin' && (
                  <MenuItem
                    onClick={goToAddVideo}
                    sx={{
                      minHeight: '37px',
                      backgroundColor: 'white',
                      padding: '8px',
                      border: '1px solid',
                      borderColor: 'gray.200',
                      borderRadius: '12px',
                      justifyContent: 'center',
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
                    minHeight: '37px',
                    backgroundColor: 'white',
                    padding: '8px',
                    border: '1px solid',
                    borderColor: 'gray.200',
                    borderRadius: '12px',
                    justifyContent: 'center',
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
          <Link
            href={'?sign-in=true'}
            passHref
            prefetch={true}
            style={{ textDecoration: 'none' }}
          >
            <SignInButton onClick={goToSignIn} fullWidth>
              <Typography variant="mainTextMedium" color="accentPink">
                Увійти
              </Typography>
            </SignInButton>
          </Link>
        )}
      </Container>
    </Box>
  );
};

export default MobileMenu;
