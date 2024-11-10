'use client';

import { ThemeProvider } from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { darkTheme, lightTheme } from './theme';

interface ThemeContextProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeModeContext = createContext<ThemeContextProps>({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme =
      typeof window !== 'undefined' ? localStorage.getItem('themeMode') : null;
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', newMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const value = useMemo(
    () => ({ toggleTheme, isDarkMode }),
    [isDarkMode, toggleTheme],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
