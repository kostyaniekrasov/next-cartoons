'use client';

import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React from 'react';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: '500',
    backgroundColor: theme.palette.gray[100],
    color: theme.palette.gray[900],
    fontSize: '12px',
    borderRadius: '8px',
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: '4px',
    },
}));

export default React.memo(CustomTooltip);
