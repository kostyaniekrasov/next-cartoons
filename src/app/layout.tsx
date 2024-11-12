import { AuthInitializer } from '@/components';
import Header from '@/components/Header/Header';
import { getCategories } from '@/lib';
import { ThemeModeProvider } from '@/theme/ThemeContext';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'ukrainian cartoon',
  description:
    'Велика бібліотека мультиків, пісень та навчальних відео в українській озвучці',
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
      <body className={`antialiased`}>
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
              {children}
            </Suspense>
          </ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
