'use client';

import { LogOutIcon, SettingsIcon } from '@/assets/icons';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ThemeSwitcher } from '..';

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  user: User;
}

const MenuBlock = ({ anchorEl, open, handleClose, user }: Props) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
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
            padding: '8px 8px',
            boxSizing: 'border-box',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: '12px',
            boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.2)',

            '& .MuiList-root': {
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              gap: '8px',

              '& .MuiDivider-root': {
                margin: '0 0',
                backgroundColor: 'gray.200',
              },
            },

            '& .MuiMenuItem-root': {
              padding: '8px',
              color: 'gray.900',

              '&:first-of-type': {
                borderRadius: '999px',
              },

              '&:not(:first-of-type)': {
                borderRadius: '8px',
              },

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
        }}
      >
        <Typography variant="mainTextSemibold" color="black" paddingX="8px">
          {user.name}
        </Typography>

        <Typography variant="secondaryText" color="black" paddingX="8px">
          {user.email}
        </Typography>
      </Box>
      <Link
        href={`?settings=profile`}
        passHref
        prefetch={true}
        style={{ textDecoration: 'none' }}
      >
        <MenuItem
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
      </Link>

      <Divider />

      <Link
        href={`?settings=settings`}
        passHref
        prefetch={true}
        style={{ textDecoration: 'none' }}
      >
        <MenuItem
          sx={{
            gap: '4px',
            color: 'gray.900',
          }}
        >
          <SettingsIcon height={17} width={17} />
          <Typography variant="secondaryText">Налаштування</Typography>
        </MenuItem>
      </Link>

      <Divider />

      <ThemeSwitcher title />

      {user.role === 'admin' && (
        <Link
          href={'admin/add-content'}
          passHref
          prefetch={true}
          style={{ textDecoration: 'none' }}
        >
          <MenuItem>
            <Typography variant="secondaryText">
              Адмін-панель(костиль)
            </Typography>
          </MenuItem>
        </Link>
      )}

      <MenuItem
        onClick={handleLogout}
        sx={{
          gap: '4px',
        }}
      >
        <IconButton
          sx={{
            color: 'error.main',
          }}
        >
          <LogOutIcon />
        </IconButton>
        <Typography variant="secondaryText" color="error">
          Вихід
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default React.memo(MenuBlock);
