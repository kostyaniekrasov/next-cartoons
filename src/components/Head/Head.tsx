'use client';

import { useTheme } from '@mui/material';

function Head() {
  const theme = useTheme();

  return (
    <>
      <meta name="theme-color" content={theme.palette.background.default} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={theme.palette.background.default}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
      />
    </>
  );
}

export default Head;
