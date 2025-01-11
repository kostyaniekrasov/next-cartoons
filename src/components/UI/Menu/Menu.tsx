'use client';

import { LogOutIcon, SettingsIcon } from '@/assets/icons';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types';
import { Box, Icon, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ThemeSwitcher } from '..';

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  user: User;
  openModal: (
    modal: 'sign-in' | 'sign-up' | 'reset-password' | 'settings',
  ) => void;
}

const MenuBlock = ({ anchorEl, open, handleClose, user, openModal }: Props) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const handleOpenSettings = () => {
    openModal('settings');
    handleClose();
  };

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            marginTop: '10px',
            padding: '0px',
            boxSizing: 'border-box',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: '12px',
            boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.2)',

            '& .MuiList-root': {
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              gap: '4px',
            },

            '& .MuiMenuItem-root': {
              color: 'gray.900',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: 'gray.200',
              },
            },
          },
        },
      }}
      MenuListProps={{
        'aria-labelledby': 'menu-button',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          borderBottom: '1px solid',
          borderColor: 'gray.300',
          backgroundColor: 'gray.100',
          padding: '8px',
        }}
      >
        <Typography variant="mainTextSemibold" color="gray.900">
          {user.name}
        </Typography>

        <Typography variant="secondaryText" color="gray.800">
          {user.email}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <MenuItem
          onClick={() => handleOpenSettings()}
          sx={{
            gap: '4px',
            color: 'gray.900',
            padding: '8px',
          }}
        >
          <SettingsIcon height={17} width={17} />
          <Typography
            variant="secondaryText"
            sx={{
              fontSize: {
                xl: '13px',
                '3xl': '15px',
              },
              lineHeight: {
                xl: '13px',
                '3xl': '15px',
              },
            }}
          >
            Налаштування
          </Typography>
        </MenuItem>

        <ThemeSwitcher title />

        {user.role === 'admin' && (
          <Link
            href={'admin/add-content'}
            passHref
            prefetch={true}
            style={{ textDecoration: 'none' }}
          >
            <MenuItem
              sx={{
                padding: '8px',
              }}
            >
              <Typography
                variant="secondaryText"
                sx={{
                  fontSize: {
                    xl: '13px',
                    '3xl': '15px',
                  },
                  lineHeight: {
                    xl: '13px',
                    '3xl': '15px',
                  },
                }}
              >
                Адмін-панель(костиль)
              </Typography>
            </MenuItem>
          </Link>
        )}

        <Box
          sx={{
            height: '1px',
            width: '100%',
            backgroundColor: 'gray.100',
          }}
        />

        <MenuItem
          onClick={handleLogout}
          sx={{
            gap: '4px',
            padding: '8px',
          }}
        >
          <Icon
            sx={{
              display: 'flex',
              color: 'error.main',
              alignItems: 'center',
              justifyContent: 'center',
              width: '17px',
              height: '17px',
            }}
          >
            <LogOutIcon width={17} height={17} />
          </Icon>

          <Typography
            variant="secondaryText"
            color="error"
            sx={{
              fontSize: {
                xl: '13px',
                '3xl': '15px',
              },
              lineHeight: {
                xl: '13px',
                '3xl': '15px',
              },
            }}
          >
            Вихід
          </Typography>
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default React.memo(MenuBlock);
