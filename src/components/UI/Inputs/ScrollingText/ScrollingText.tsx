'use client';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';

interface Props {
  playlistTitle: string;
}

const ScrollingText = ({ playlistTitle }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setShouldScroll(textWidth > containerWidth);
    }
  }, [playlistTitle]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: {
          xs: '255px',
          sm: '318px',
          '3xl': '416px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      }}
    >
      {shouldScroll ? (
        <Marquee gradient={false} speed={20} delay={0} loop={0}>
          <Typography
            textTransform={'capitalize'}
            sx={{
              px: 2,
              display: 'block',
              fontSize: {
                xs: '15px',
                sm: '17px',
              },
            }}
            ref={textRef}
          >
            {playlistTitle.toLowerCase()}
          </Typography>
        </Marquee>
      ) : (
        <Typography
          textTransform={'capitalize'}
          sx={{
            display: 'block',
            width: {
              xs: '255px',
              sm: '318px',
              '3xl': '416px',
            },
            fontSize: {
              xs: '15px',
              sm: '17px',
            },
          }}
          ref={textRef}
        >
          {playlistTitle.toLowerCase()}
        </Typography>
      )}
    </Box>
  );
};

export default ScrollingText;
