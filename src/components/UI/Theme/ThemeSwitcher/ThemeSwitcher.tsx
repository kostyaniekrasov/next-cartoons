import { useThemeMode } from '@/theme/ThemeContext';
import { MenuItem, Typography } from '@mui/material';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

interface Props {
  title?: boolean;
}

const ThemeSwitcher = ({ title }: Props) => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <MenuItem
      onClick={toggleTheme}
      sx={{
        px: '8px',
        py: '3px',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      }}
    >
      {title && (
        <Typography
          variant="secondaryText"
          sx={{
            fontSize: {
              xl: '13px',
              '3xl': '15px',
            },
            lineHeight: {
              xl: '13px',
              '3xl': '15px',
            },
          }}
        >
          Тема
        </Typography>
      )}

      <ThemeSwitch checked={isDarkMode} />
    </MenuItem>
  );
};

export default ThemeSwitcher;
