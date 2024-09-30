import { Button, styled } from '@mui/material';
import colors from '@/utils/customColors';

export const SignInModalButton = styled(Button)(() => ({
  fontFamily: 'var(--font-inter), sans-serif',

  color: `${colors.accentPink}`,
  textTransform: 'none',
  padding: '0 32px',
  height: '56px',

  '&.MuiButton-root': {
    border: `1px solid ${colors.gray[200]}`,
    backgroundColor: `${colors.accentPink}`,
    color: ` ${colors.white}`,

    borderRadius: '12px',
    margin: 0,
  },

  '&.Mui-selected, &.Mui-selected:hover, &:hover': {
    backgroundColor: `${colors.white}`,
    color: ` ${colors.accentPink}`,
  },

  '&.Mui-disabled': {
    backgroundColor: `${colors.gray[100]}`,
    color: ` ${colors.gray[400]}`,
  },
}));
