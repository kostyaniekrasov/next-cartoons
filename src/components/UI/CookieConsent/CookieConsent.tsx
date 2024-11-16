'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { SignInButton } from '../Buttons';

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
        bottom: 10,
        right: 10,
        width: '375px',
        backgroundColor: 'white',
        padding: '16px',
        border: '1px solid',
        borderColor: 'gray.200',
        borderRadius: '12px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 22,
      }}
    >
      <Typography variant="mainTextBold" mb={'8px'}>
        Цей сайт використовує cookies
      </Typography>
      <Typography variant="mainText" color="gray.900" mb={'12px'}>
        Використовуючи наш сайт, ви погоджуєтесь зі зберіганням cookie для
        покращення вашого досвіду.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SignInButton
          onClick={handleConsent}
          sx={{
            width: '150px',
          }}
        >
          <Typography variant="button" color="accentPink">
            OK
          </Typography>
        </SignInButton>
      </Box>
    </Box>
  );
};

export { CookieConsent, isCookieConsentGiven };
