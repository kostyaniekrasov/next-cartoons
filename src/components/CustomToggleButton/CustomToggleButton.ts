import { styled, ToggleButton } from '@mui/material';
import colors from '@/utils/customColors';

export const CustomToggleButton = styled(ToggleButton)(() => ({
  color: `${colors.gray[900]}`,
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '17px',
  fontWeight: '500',
  lineHeight: '140%',
  textTransform: 'none',
  padding: '8px 16px',
  boxSizing: 'border-box',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: `${colors.accentPink}`,
    color: ` ${colors.white}`,
  },
  '&:hover': {
    border: `1px solid ${colors.gray[100]}`,
  },

  '&.MuiToggleButton-root': {
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: '99px',
    margin: 0,
  },
}));
