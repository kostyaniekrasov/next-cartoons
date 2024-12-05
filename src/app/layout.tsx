import { AuthInitializer, SignInModal, SignUpModal } from '@/components';
import { ResetPasswordModal } from '@/components/Auth/ResetPasswordModal';
import Header from '@/components/Header/Header';
import ProfileSettings from '@/components/ProfileSettings/ProfileSettings';
import { getCategories } from '@/lib';
import { ThemeModeProvider } from '@/theme/ThemeContext';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Toon Joy',
  description:
    'Велика бібліотека мультиків, пісень та навчальних відео рідною мовою',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Toon Joy" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`antialiased`}>
        <Analytics />
        <AppRouterCacheProvider options={{ key: 'css', prepend: true }}>
          <ThemeModeProvider>
            <CssBaseline />
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <AuthInitializer />
              {categories && <Header categories={categories} />}
              <SignInModal />
              <SignUpModal />
              <ResetPasswordModal />
              <ProfileSettings />
              {children}
            </Suspense>
          </ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
