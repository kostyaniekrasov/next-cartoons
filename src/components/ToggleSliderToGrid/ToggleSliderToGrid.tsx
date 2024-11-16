'use client';

import { ChevronRightIcon } from '@/assets/icons';
import { CartoonSlider, GridForList, SelectFilterArrow } from '@/components';
import { ContinueWatching, PlaylistsType, VideoCategory } from '@/types';
import { Playlist } from '@/types/VideoData';
import {
  Box,
  Divider,
  Fade,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  outlinedInputClasses,
  selectClasses,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [filterOrder, setFilterOrder] = useState('updatedTime');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleChangeFilrerOrder = (e: SelectChangeEvent<string>) => {
    setFilterOrder(e.target.value);
  };

  const handleToggleSelect = (state: boolean) => {
    setIsOpen(state);
  };

  const iconComponent = () => <SelectFilterArrow open={isOpen} />;

  const sortedPlaylists = [...playlists].sort((playlistA, playlistB) => {
    if (filterOrder === 'updatedTime') {
      const dateA = new Date(playlistA.createdAt);
      const dateB = new Date(playlistB.createdAt);
      return dateB.getTime() - dateA.getTime();
    }

    if (filterOrder === 'viewCount') {
      const averageViewsA =
        playlistA.videos.reduce(
          (sum, video) => sum + (Number(video.statistics.viewCount) || 0),
          0,
        ) / playlistA.videos.length || 0;
      const averageViewsB =
        playlistB.videos.reduce(
          (sum, video) => sum + (Number(video.statistics.viewCount) || 0),
          0,
        ) / playlistB.videos.length || 0;

      if (averageViewsB !== averageViewsA) {
        return averageViewsB - averageViewsA;
      }

      const totalViewsA = playlistA.videos.reduce(
        (sum, video) => sum + (Number(video.statistics.viewCount) || 0),
        0,
      );
      const totalViewsB = playlistB.videos.reduce(
        (sum, video) => sum + (Number(video.statistics.viewCount) || 0),
        0,
      );

      return totalViewsB - totalViewsA;
    }
    return 0;
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          marginBottom: '16px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
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
          {playlistsType === PlaylistsType.ByCategory && (
            <Fade in={isGrid}>
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },
                  }}
                >
                  <Typography
                    variant="footnote"
                    color="gray.600"
                    component={'p'}
                  >
                    Показано
                  </Typography>
                  <Typography
                    variant="secondaryText"
                    color="gray.900"
                    component={'p'}
                  >{`${playlists.length}`}</Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  sx={{
                    height: 'auto',
                    width: '1px',
                    backgroundColor: 'gray.200',
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },
                  }}
                />

                <Select
                  value={filterOrder}
                  onChange={handleChangeFilrerOrder}
                  IconComponent={iconComponent}
                  onOpen={() => handleToggleSelect(true)}
                  onClose={() => handleToggleSelect(false)}
                  sx={{
                    width: '235px',
                    borderRadius: '12px',
                    [`& .${selectClasses.select}`]: {
                      fontFamily: 'var(--font-inter), sans-serif',

                      color: 'gray.900',
                      padding: '8px 4px 8px 16px',
                      paddingRight: '4px !important',
                    },
                    [`& .${outlinedInputClasses.notchedOutline}`]: {
                      borderColor: 'gray.200',
                      borderWidth: '2px',
                    },
                    '&:hover': {
                      [`& .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: 'gray.400',
                      },
                    },
                    [`& .${outlinedInputClasses.root}`]: {
                      fontFamily: 'var(--font-inter), sans-serif',

                      padding: '0px',
                      fontSize: '17px',
                      fontWeight: '400',
                      lineHeight: '140%',
                      color: 'gray.600',
                    },
                    '& .MuiInputBase-input': {
                      paddingRight: 0,
                    },
                  }}
                  MenuProps={{
                    sx: {
                      '& .MuiPaper-root': {
                        mt: 1,
                        borderRadius: '12px',
                      },
                      '& .MuiList-root': {
                        padding: 1,
                      },
                      '& .MuiMenuItem-root': {
                        borderRadius: '12px',
                        '&:not(:last-child)': {
                          marginBottom: 1,
                        },

                        color: 'gray.800',
                        '&:hover': {
                          bgcolor: 'accentPink.main',
                          color: 'white',
                        },
                        '&.Mui-selected': {
                          bgcolor: 'accentPink.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'accentPink.main',
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={'updatedTime'}>Останні оновлення</MenuItem>
                  <MenuItem value={'viewCount'}>Найбільше переглядів</MenuItem>
                </Select>
              </Box>
            </Fade>
          )}
        </Box>
        {category && (
          <Typography variant="secondaryText" color="gray.600">
            {category.description}
          </Typography>
        )}
      </Box>

      {!!playlists.length && (
        <AnimatePresence mode="wait">
          {!isGrid ? (
            <motion.div
              key="slider"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CartoonSlider
                playlistsType={playlistsType}
                categories={categories}
                playlists={playlists}
                continueWatchingList={CWlinks ?? []}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GridForList
                categories={categories}
                playlists={
                  playlistsType === PlaylistsType.ByCategory
                    ? sortedPlaylists
                    : playlists
                }
                continueWatchingList={CWlinks ?? []}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
