'use client';

import AvatarData from '@/types/AvatarData';
import { Avatar, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  selectAvatar: (avatar: AvatarData) => void;
  avatarUrl?: string;
}

const AvatarsList = ({ selectAvatar, avatarUrl: avatarId }: Props) => {
  const [avatars, setAvatars] = useState<AvatarData[]>([]);

  const handleSelectAvatar = (avatar: AvatarData) => {
    selectAvatar(avatar);
  };

  useEffect(() => {
    const getAvatars = async () => {
      try {
        const response = await fetch('/api/avatars');
        if (response.ok) {
          const avatarList: AvatarData[] = await response.json();
          setAvatars(avatarList);
        } else {
          console.error('Failed to fetch avatars');
        }
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    getAvatars();
  }, []);

  return (
    <ImageList
      sx={{
        width: '100%',
        height: '150px',
      }}
      cols={3}
    >
      {avatars.map((avatar) => (
        <ImageListItem key={avatar.url} style={{ textAlign: 'center' }}>
          <Avatar
            src={`${avatar.url}`}
            onClick={() => handleSelectAvatar(avatar)}
            alt={avatar.url}
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'gray.100',
              border: '3px solid',
              cursor: 'pointer',
              borderColor:
                avatarId === avatar.url ? 'accentPink.main' : 'transparent',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default AvatarsList;
