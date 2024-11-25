'use client';

import { CaretDownIcon } from '@/assets/icons';
import { IconButton, keyframes } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  openSelect: () => void;
}

const rotateOpen = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateClose = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const SelectFilterArrow = ({ open, openSelect }: Props) => {
  return (
    <IconButton
      onClick={openSelect}
      sx={{
        color: 'gray.900',
        padding: 0,
        width: '24px',
        display: 'flex',
        alignItems: 'center',
        height: '24px',
        marginRight: '16px',
        borderRadius: '999px',
        animation: open
          ? `${rotateOpen} 0.3s ease-in-out forwards`
          : `${rotateClose} 0.3s ease-in-out forwards`,
      }}
    >
      <CaretDownIcon />
    </IconButton>
  );
};

SelectFilterArrow.displayName = 'SelectFilterArrow';

export default React.memo(SelectFilterArrow);
