'use client';

import { isPlaylistSaved } from '@/lib/playlists/isSavedVideo';
import { addToWatchLater } from '@/lib/playlists/savedVideos';
import useAuthStore from '@/store/useAuthStore';
import { PlaylistsType } from '@/types';
import { Playlist } from '@/types/VideoData';
import { CircularProgress, Menu, MenuItem, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  playlist: Playlist;
  selectedVideoId: string;
  showAlert: (alertName: string) => void;
  removeFunction?: (playlistId: string) => Promise<void>;
  slideClick: (
    playlistId: string,
    videoId: string,
    playlistCategory?: string,
  ) => void;
  playlistsType: PlaylistsType;
}

const SliderMenu = ({
  anchorEl,
  open,
  handleClose,
  playlist,
  selectedVideoId,
  showAlert,
  removeFunction,
  slideClick,
  playlistsType,
}: Props) => {
  const pathname = usePathname();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const handleAddToSaved = async () => {
    if (playlist) {
      if (user) {
        setIsLoading(true);
        await addToWatchLater(user.id, playlist)
          .then(() => {
            showAlert('savedAlert');
            setIsSaved(true);
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const handleShareClick = () => {
    const share_link = `${window.location.origin}${pathname}/video-page/${playlist.id}/${selectedVideoId}`;
    navigator.clipboard.writeText(share_link).then(
      () => {
        showAlert('sharedAlert');
      },
      (err) => {
        console.error('Не вдалося скопіювати текст', err);
      },
    );
  };

  const handleRemove = async () => {
    if (removeFunction) {
      await removeFunction(playlist.id).then(() => showAlert('removedAlert'));
      handleClose();
    }
  };

  useEffect(() => {
    if (user && playlist.id) {
      isPlaylistSaved(user.id, playlist.id)
        .then(setIsSaved)
        .catch((error) => {
          console.error('Error checking if playlist is saved:', error);
        });
    }
  }, [user, playlist.id]);
  const showRemoveButton = playlistsType !== PlaylistsType.ByCategory;

  return (
    <Menu
      id="menu-slider"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            marginTop: '4px',
            padding: '4px',
            boxSizing: 'border-box',
            borderRadius: '12px',
            boxShadow: '0px 0px 32px 0 rgba(0, 0, 0, 0.20)',

            '& .MuiList-root': {
              display: 'flex',
              flexDirection: 'column',
              width: '180px',
              padding: 0,
              gap: '4px',
            },

            '& .MuiMenuItem-root': {
              padding: '4px',
              borderRadius: '8px',
              color: 'gray.900',

              '&:hover': {
                backgroundColor: 'gray.200',
              },
            },
          },
        },
      }}
    >
      <MenuItem
        onClick={() =>
          slideClick(playlist.id, selectedVideoId, playlist.category)
        }
      >
        <Typography variant="secondaryText">Перейти до перегляду</Typography>
      </MenuItem>
      <MenuItem onClick={handleShareClick}>
        <Typography variant="secondaryText">Поділитися</Typography>
      </MenuItem>
      {user && (
        <MenuItem
          onClick={handleAddToSaved}
          disabled={isSaved}
          sx={{
            position: 'relative',
          }}
        >
          <Typography variant="secondaryText">Зберегти</Typography>
          {isLoading && (
            <CircularProgress
              size={'30px'}
              sx={{
                position: 'absolute',
                inset: 0,
                mx: 'auto',
              }}
            />
          )}
        </MenuItem>
      )}
      {showRemoveButton && user && (
        <MenuItem onClick={handleRemove}>
          <Typography variant="secondaryText" color="error">
            Видалити
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default React.memo(SliderMenu, (prevProps, nextProps) => {
  return (
    prevProps.anchorEl === nextProps.anchorEl &&
    prevProps.open === nextProps.open &&
    prevProps.playlist.id === nextProps.playlist.id &&
    prevProps.selectedVideoId === nextProps.selectedVideoId
  );
});
