import colors from '@/utils/customColors';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomInput = styled(TextField)(() => ({
  color: `${colors.gray[600]}`,
  height: '56px',
  fontFamily: 'var(--font-inter), sans-serif',

  '& .MuiOutlinedInput-root': {
    color: `${colors.gray[600]}`,
    padding: '0 16px 0 16px',
    borderRadius: '12px',
    transition: 'transform 0.3s ease',

    '& fieldset': {
      borderColor: `${colors.gray[200]}`,
    },
    '&:hover fieldset, &:hover': {
      borderColor: `${colors.gray[400]}`,
      color: `${colors.gray[900]}`,
    },
    '&.Mui-focused': {
      color: `${colors.gray[900]}`,
    },

    '&.Mui-focused fieldset': {
      borderColor: `${colors.gray[400]}`,
    },

    '&.Mui-disabled': {
      color: `${colors.gray[400]}`,
      borderColor: `${colors.gray[200]}`,
    },

    '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus':
      {
        WebkitBoxShadow: `0 0 0 1000px ${colors.white} inset`,
        WebkitTextFillColor: `${colors.gray[900]}`,
      },
  },
  '& .MuiInputLabel-root': {
    color: `${colors.gray[600]}`,
    fontFamily: 'var(--font-inter), sans-serif',

    fontSize: '17px',
    fontWeight: '400',
    lineHeight: '140%',
    '&.Mui-focused': {
      color: `${colors.gray[900]}`,
      fontFamily: 'var(--font-inter), sans-serif',
      backgroundColor: colors.white,
      paddingRight: '5px',
    },
  },
}));
