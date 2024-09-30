import { Button, styled } from '@mui/material';
import colors from '@/utils/customColors';

export const SignInButton = styled(Button)(() => ({
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '17px',
  fontWeight: '500',
  lineHeight: '140%',
  color: `${colors.accentPink}`,
  textTransform: 'none',
  padding: '0 32px',
  border: `1px solid ${colors.gray[200]}`,
  height: '56px',
  borderRadius: '99px',

  '&.Mui-selected, &.Mui-selected:hover, &:hover': {
    backgroundColor: `${colors.accentPink}`,
    color: ` ${colors.white}`,
  },
  '&.MuiButton-root': {
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: '99px',
    margin: 0,
  },
}));
