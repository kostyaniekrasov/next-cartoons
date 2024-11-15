'use client';

import { ChevronRightSliderIcon } from '@/assets/icons';
import { Box, IconButton } from '@mui/material';
import { EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState } from 'react';

interface Props {
  emblaApi: EmblaCarouselType | undefined;
  imageHeight: number;
}

const SliderNavigation = ({ emblaApi, imageHeight }: Props) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateNavigation = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', updateNavigation);
    emblaApi.on('reInit', updateNavigation);

    updateNavigation();

    return () => {
      emblaApi.off('select', updateNavigation);
      emblaApi.off('reInit', updateNavigation);
    };
  }, [emblaApi]);

  if (!emblaApi) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        height: {
          sm: '142px',
          '3xl': '215px',
        },
        top: imageHeight / 2,
        transform: 'translateY(-50%)',
        left: 0,
        right: 0,
        display: {
          xs: 'none',
          lg: 'block',
        },
      }}
    >
      <IconButton
        onClick={() => emblaApi.scrollPrev()}
        disabled={!canScrollPrev}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: {
            sm: '-44px',
            '3xl': '-56px',
          },
          width: {
            sm: '40px',
            '3xl': '52px',
          },
          borderRadius: '12px',
          color: 'gray.700',
          pointerEvents: 'auto',
          visibility: canScrollPrev ? 'visible' : 'hidden',
          '&:hover': {
            backgroundColor: 'gray.200',
          },
        }}
      >
        <ChevronRightSliderIcon style={{ transform: 'rotate(180deg)' }} />
      </IconButton>

      <IconButton
        onClick={() => emblaApi.scrollNext()}
        disabled={!canScrollNext}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: {
            sm: '-44px',
            '3xl': '-56px',
          },

          width: {
            sm: '40px',
            '3xl': '52px',
          },
          borderRadius: '12px',
          color: 'gray.700',

          pointerEvents: 'auto',
          visibility: canScrollNext ? 'visible' : 'hidden',
          '&:hover': {
            backgroundColor: 'gray.200',
          },
        }}
      >
        <ChevronRightSliderIcon />
      </IconButton>
    </Box>
  );
};

export default SliderNavigation;
