'use client';

import { ChevronRightIcon } from '@/assets/icons';
import { CartoonSlider, GridForList, SelectFilterArrow } from '@/components';
import { removeFromWatchLater, removePlaylistFromCW } from '@/lib';
import { ContinueWatching, PlaylistsType, User, VideoCategory } from '@/types';
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
import { useCallback, useEffect, useState } from 'react';

interface Props {
  title?: string;
  categories?: VideoCategory[];
  category?: VideoCategory;
  playlists: Playlist[];
  CWlinks?: ContinueWatching[];
  playlistsType: PlaylistsType;
  user: User | null;
}

const ToggleSliderToGrid = ({
  category,
  playlists,
  CWlinks,
  title,
  categories,
  playlistsType,
  user,
}: Props) => {
  const [isGrid, setIsGrid] = useState(false);
  const [filterOrder, setFilterOrder] = useState('updatedTime');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [removingPlaylistId, setRemovingPlaylistId] = useState('');
  const [filteredPlaylists, setFilteredPlaylists] =
    useState<Playlist[]>(playlists);

  const handleToggle = useCallback(() => {
    setIsGrid((prev) => !prev);
  }, []);

  const handleChangeFilrerOrder = (e: SelectChangeEvent<string>) => {
    setFilterOrder(e.target.value);
  };

  const handleToggleSelect = (state: boolean) => {
    setIsOpen(state);
  };

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const iconComponent = () => (
    <SelectFilterArrow openSelect={toggleSelect} open={isOpen} />
  );

  const sortedPlaylists = [...filteredPlaylists].sort(
    (playlistA, playlistB) => {
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
    },
  );

  useEffect(() => {
    setFilteredPlaylists(playlists);
  }, [playlists]);

  const newPlaylists = (playlistId: string) => {
    setFilteredPlaylists((prevState) =>
      prevState.filter((p) => p.id !== playlistId),
    );
  };

  const handleRemove = async (playlistId: string) => {
    setIsLoading(true);
    setRemovingPlaylistId(playlistId);

    if (!user) {
      return;
    }

    if (playlistsType === PlaylistsType.Saved) {
      await removeFromWatchLater(user.id, playlistId)
        .then(() => newPlaylists(playlistId))
        .finally(() => setIsLoading(false));
    } else if (playlistsType === PlaylistsType.ContinueWatching) {
      await removePlaylistFromCW(user.id, playlistId)
        .then(() => newPlaylists(playlistId))
        .finally(() => setIsLoading(false));
    }
  };

  if (filteredPlaylists.length === 0) {
    return (
      <Typography variant="h3">
        {`На разі категорія "${category?.title}" не містить відео`}
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            sm: 'center',
          },
          gap: '8px',
          justifyContent: 'space-between',
          marginBottom: '16px',
          width: '100%',
        }}
      >
        <Box>
          <IconButton
            onClick={handleToggle}
            sx={{
              color: 'gray.600',
              gap: '4px',
              borderRadius: '12px',
              width: 'max-content',
              transform: 'translateX(-5px)',
              padding: '5px',
            }}
          >
            {title && (
              <Typography
                variant="categoryTitle"
                color="gray.900"
                sx={{
                  fontSize: {
                    xs: '17px',
                    sm: '21px',
                  },
                }}
              >
                {title}
              </Typography>
            )}
            {category && (
              <Typography
                variant="categoryTitle"
                color="gray.900"
                sx={{
                  fontSize: {
                    xs: '17px',
                    sm: '21px',
                  },
                }}
              >
                {category.title}
              </Typography>
            )}
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.3s ease',
                transform: isGrid ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              <ChevronRightIcon />
            </Box>
          </IconButton>

          {category && (
            <Typography
              variant="secondaryText"
              color="gray.600"
              component={'p'}
            >
              {category.description}
            </Typography>
          )}
        </Box>
        {playlistsType === PlaylistsType.ByCategory && (
          <Fade in={isGrid} unmountOnExit>
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
                <Typography variant="footnote" color="gray.600" component={'p'}>
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
                open={isOpen}
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
                      minHeight: '38px',
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

      {!!playlists.length && (
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            paddingBottom: {
              xs: '16px',
              sm: '30px',
            },
          }}
        >
          <AnimatePresence mode="wait">
            {!isGrid ? (
              <Box
                sx={{
                  mr: {
                    xs: '-16px',
                    lg: 0,
                  },
                }}
              >
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
                    playlists={filteredPlaylists}
                    removeFunction={handleRemove}
                    isLoading={isLoading}
                    removingPlaylistId={removingPlaylistId}
                    continueWatchingList={CWlinks ?? []}
                  />
                </motion.div>
              </Box>
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
                  playlistsType={playlistsType}
                  removeFunction={handleRemove}
                  isLoading={isLoading}
                  removingPlaylistId={removingPlaylistId}
                  playlists={
                    playlistsType === PlaylistsType.ByCategory
                      ? sortedPlaylists
                      : filteredPlaylists
                  }
                  continueWatchingList={CWlinks ?? []}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
};

export default ToggleSliderToGrid;
