import colors from '@/utils/customColors';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: '500',
    backgroundColor: colors.gray[100],
    color: colors.gray[900],
    fontSize: '12px',
    borderRadius: '8px',
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: '4px',
    },
});
