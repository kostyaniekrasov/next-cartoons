import { Box, Tab, TabProps, Typography } from '@mui/material';
import React from 'react';

interface Props extends TabProps {
  customLabel: string;
  customIcon: React.ReactNode;
}

const SettingsTab = React.forwardRef<HTMLDivElement, Props>(
  ({ customLabel, customIcon, ...props }, ref) => {
    return (
      <Tab
        ref={ref}
        label={
          <Typography variant="mainText" color="gray.900">
            {customLabel}
          </Typography>
        }
        iconPosition="start"
        icon={
          <Box
            sx={{
              width: '32px',
              height: '32px',
              border: '1px solid',
              borderRadius: '8px',
              borderColor: 'gray.400',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {customIcon}
          </Box>
        }
        sx={{
          textTransform: 'none',
          borderRadius: '12px',
          padding: '8px',
          minHeight: 0,
          justifyContent: 'flex-start',
          transition: 'background-color 0.3s',

          '&.Mui-selected': {
            color: 'gray.900',
            backgroundColor: 'gray.100',
          },

          '&:hover': {
            backgroundColor: 'gray.100',
          },
        }}
        {...props}
      />
    );
  },
);

SettingsTab.displayName = 'SettingsTab';
export default SettingsTab;
