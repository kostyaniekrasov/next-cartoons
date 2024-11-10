'use client';

import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

// import React from 'react';

// const CustomTooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
//   (props, ref) => {
//     return (
//       <Tooltip
//         ref={ref}
//         {...props}
//         // classes={{ popper: props.className }}
//         sx={{
//           [`& .${tooltipClasses.tooltip}`]: {
//             fontFamily: 'var(--font-inter), sans-serif',
//             fontWeight: '500',
//             backgroundColor: 'gray.100',
//             color: 'gray.900',
//             fontSize: '12px',
//             borderRadius: '8px',
//           },
//           [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
//             {
//               marginTop: '4px',
//             },
//         }}
//       />
//     );
//   },
// );

// CustomTooltip.displayName = 'CustomTooltip';

// export default CustomTooltip;

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

export default CustomTooltip;
