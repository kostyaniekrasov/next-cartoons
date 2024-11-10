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
        padding: '8px',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      }}
    >
      {title && <Typography variant="secondaryText">Тема</Typography>}

      <ThemeSwitch checked={isDarkMode} />
    </MenuItem>
  );
};

export default ThemeSwitcher;
