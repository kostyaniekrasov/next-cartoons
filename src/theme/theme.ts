import { createTheme } from '@mui/material';

import { darkPalette, lightPalette } from './palette';
import typography from './typography';

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    ...lightPalette,
  },
  typography,
  breakpoints: {
    values: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1440,
      '3xl': 1900,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minWidth: '375px',
          paddingLeft: '16px',
          paddingRight: '16px',
          width: '100%',

          '@media (min-width:768px)': {
            maxWidth: '768px',
          },
          '@media (min-width:1024px)': {
            maxWidth: '1024px',
          },
          '@media (min-width:1280px)': {
            maxWidth: '1280px',
          },
          '@media (min-width:1440px)': {
            paddingLeft: '0',
            paddingRight: '0',
            maxWidth: '1344px',
          },
          '@media (min-width:1900px)': {
            maxWidth: '1792px',
          },
        },
      },
    },
  },
});

// Темна тема
export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    ...darkPalette,
  },
  typography,
  breakpoints: {
    values: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1440,
      '3xl': 1900,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minWidth: '375px',
          paddingLeft: '16px',
          paddingRight: '16px',

          '@media (min-width:640px)': {
            maxWidth: '100%',
          },
          '@media (min-width:768px)': {
            maxWidth: '768px',
          },
          '@media (min-width:1024px)': {
            maxWidth: '1024px',
          },
          '@media (min-width:1280px)': {
            maxWidth: '1280px',
          },
          '@media (min-width:1440px)': {
            paddingLeft: '0',
            paddingRight: '0',
            maxWidth: '1344px',
          },
          '@media (min-width:1900px)': {
            maxWidth: '1792px',
          },
        },
      },
    },
  },
});
