import colors from '@/utils/customColors';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomSearch = styled(TextField)(() => ({
  color: `${colors.gray[600]}`,
  width: '432px',

  '& .MuiOutlinedInput-root': {
    color: `${colors.gray[600]}`,
    padding: '0 4px 0 16px',
    borderRadius: '99px',
    backgroundColor: `${colors.gray[100]}`,
    transition: 'transform 0.3s ease',
    height: '100%',

    '& fieldset': {
      borderColor: `${colors.gray[200]}`,

    },
    '&:hover fieldset, &:hover': {
      borderColor: `${colors.gray[400]}`,
      color: `${colors.gray[900]}`,
    },
    '&.Mui-focused, &.Mui-focused fieldset': {
      color: `${colors.gray[900]}`,
      borderColor: `${colors.gray[400]}`,
    },

    '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus':
      {
        WebkitBoxShadow: `0 0 0 1000px ${colors.gray[100]} inset`,
        WebkitTextFillColor: `${colors.gray[900]}`,
      },
  },
}));
