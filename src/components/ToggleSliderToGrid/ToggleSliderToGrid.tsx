'use client';

import { ChevronRightIcon } from '@/assets/icons';
import { CartoonSlider, GridForList } from '@/components';
import { ContinueWatching, PlaylistsType, VideoCategory } from '@/types';
import { Playlist } from '@/types/VideoData';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  title?: string;
  categories?: VideoCategory[];
  category?: VideoCategory;
  playlists: Playlist[];
  CWlinks?: ContinueWatching[];
  playlistsType: PlaylistsType;
}

const ToggleSliderToGrid = ({
  category,
  playlists,
  CWlinks,
  title,
  categories,
  playlistsType,
}: Props) => {
  const [isGrid, setIsGrid] = useState(false);

  const handleToggle = useCallback(() => {
    setIsGrid((prev) => !prev);
  }, []);

  const iconButtonStyles = useMemo(
    () => ({
      color: 'gray.600',
      gap: '4px',
      borderRadius: '12px',
      width: 'max-content',
      transform: 'translateX(-5px)',
      padding: '5px',
    }),
    [],
  );

  const titleStyles = useMemo(
    () => ({
      fontSize: {
        xs: '17px',
        sm: '21px',
      },
    }),
    [],
  );

  const chevronStyles = useMemo(
    () => ({
      display: 'flex',
      transition: 'transform 0.3s ease',
      transform: isGrid ? 'rotate(90deg)' : 'rotate(0deg)',
    }),
    [isGrid],
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          width: 'max-content',
          marginBottom: '16px',
        }}
      >
        <IconButton onClick={handleToggle} sx={iconButtonStyles}>
          {title && (
            <Typography
              variant="categoryTitle"
              color="gray.900"
              sx={titleStyles}
            >
              {title}
            </Typography>
          )}
          {category && (
            <Typography
              variant="categoryTitle"
              color="gray.900"
              sx={titleStyles}
            >
              {category.title}
            </Typography>
          )}
          <Box sx={chevronStyles}>
            <ChevronRightIcon />
          </Box>
        </IconButton>
        {category && (
          <Typography variant="secondaryText" color="gray.600">
            {category.description}
          </Typography>
        )}
      </Box>

      {!!playlists.length && (
        <>
          <Collapse
            in={!isGrid}
            sx={{
              marginRight: {
                xs: '-16px',
                sm: 0,
              },
            }}
          >
            {!isGrid && (
              <CartoonSlider
                playlistsType={playlistsType}
                categories={categories}
                playlists={playlists}
                continueWatchingList={CWlinks ?? []}
              />
            )}
          </Collapse>

          <Collapse in={isGrid} unmountOnExit>
            {isGrid && (
              <GridForList
                categories={categories}
                playlists={playlists}
                continueWatchingList={CWlinks ?? []}
              />
            )}
          </Collapse>
        </>
      )}
      {!playlists.length && (
        <Typography variant="h3">
          За категорією {category?.title} нічого не знайдено
        </Typography>
      )}
    </>
  );
};

export default ToggleSliderToGrid;
