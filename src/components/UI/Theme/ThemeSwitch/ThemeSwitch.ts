'use client';

import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const ThemeSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
  width: 64,
  height: 34,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 4,
    transitionDuration: '300ms',
    '&:hover': {
      backgroundColor: 'rgba(255, 149, 0, 0.2)',
    },

    '& .MuiSvgIcon-root': {
      '&:hover .MuiSvgIcon-root': {
        color: 'rgba(255, 149, 0, 0.2)',
      },
    },

    '&.Mui-checked': {
      transform: 'translateX(30px)',

      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 3.5C5.75 7.22792 8.77208 10.25 12.5 10.25C13.1819 10.25 13.8403 10.1491 14.4608 9.96106C13.6207 12.7327 11.046 14.7499 8 14.7499C4.27208 14.7499 1.25 11.728 1.25 8.0001C1.25 4.95412 3.26756 2.37937 6.0392 1.53931C5.85113 2.15983 5.75 2.81806 5.75 3.5Z" stroke="${encodeURIComponent(
          '#5856D6',
        )}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>')`,
        // Moon icon
      },
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.gray[100],

        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 26,
    height: 26,
    backgroundColor: 'transparent',

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3V1.5M9 15V16.5M4.81066 4.81066L3.75 3.75M13.296 13.296L14.3567 14.3567M3 9H1.5M15 9H16.5M13.2964 4.81066L14.357 3.75M4.81103 13.296L3.75037 14.3567M9 12.75C6.92893 12.75 5.25 11.0711 5.25 9C5.25 6.92893 6.92893 5.25 9 5.25C11.0711 5.25 12.75 6.92893 12.75 9C12.75 11.0711 11.0711 12.75 9 12.75Z" stroke="${encodeURIComponent(
        '#FF9500',
      )}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>')`, // Sun icon
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 999,
    backgroundColor: theme.palette.gray[100],
    opacity: 1,
  },
}));

export default ThemeSwitch;
