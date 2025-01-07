'use client';

import { useTheme } from '@mui/material';
import { useEffect } from 'react';

function Head() {
  const theme = useTheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.background.default);
    }
  }, [theme.palette.background.default]);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  );
}

export default Head;
