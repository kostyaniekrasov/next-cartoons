'use client';

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const isCookieConsentGiven = () => {
  if (typeof window !== 'undefined') {
    const consent = localStorage.getItem('cookieConsent');
    return consent ? JSON.parse(consent) : false;
  }
  return false;
};

const CookieConsent = () => {
  const [isCookieConsentGiven, setIsCookieConsentGiven] = useState<
    boolean | null
  >(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (consent !== null) {
        setIsCookieConsentGiven(JSON.parse(consent));
      }
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (isCookieConsentGiven !== null) {
    return null;
  }

  const handleConsent = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(true));
    setIsCookieConsentGiven(true);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        right: 0,
        width: '320px',
        backgroundColor: 'accentPink.main',
        padding: '20px',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        gap: 2,
        zIndex: 22,
      }}
    >
      <Typography variant="mainText" color="white">
        Використовуючи наш сайт, ви погоджуєтесь зі зберіганням cookie для
        покращення вашого досвіду.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" color="success" onClick={handleConsent}>
          OK
        </Button>
      </Box>
    </Box>
  );
};

export { CookieConsent, isCookieConsentGiven };
