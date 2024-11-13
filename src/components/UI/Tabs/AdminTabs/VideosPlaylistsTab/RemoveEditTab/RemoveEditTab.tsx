'use client';

import { ImageIcon } from '@/assets/icons';
import { SettingsTab, TabPanel, a11yProps } from '@/components';
import getPlaylistsArray from '@/lib/playlists/getPlaylistsArray';
import getVideosArray from '@/lib/playlists/getVideosUrl';
import { VideoCategory, VideoUrlFromDB } from '@/types';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import { Box, List, ListItem, ListItemText, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';

import { ListVideosItem } from './ListVideosItem';

interface Props {
  categories: VideoCategory[];
}

const RemoveEditTab = ({ categories }: Props) => {
  const [value, setValue] = useState(0);
  const [videos, setVideos] = useState<VideoUrlFromDB[]>([]);
  const [playlists, setPlaylists] = useState<VideoUrlFromDB[]>([]);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleVideoRemove = (id: string) => {
    setVideos((prevState) => prevState.filter((v) => v.id !== id));
  };

  const handlePlaylistRemove = (id: string) => {
    setPlaylists((prevState) => prevState.filter((v) => v.id !== id));
  };

  const handleVideoUpdate = (
    updatedVideo: VideoUrlFromDB,
    playlistId: string,
  ) => {
    setVideos((prevState) =>
      prevState.map((video) =>
        video.id === playlistId ? updatedVideo : video,
      ),
    );
    console.log(updatedVideo);
  };

  const handlePlaylistUpdate = (
    updatedPlaylist: VideoUrlFromDB,
    playlistId: string,
  ) => {
    setPlaylists((prevState) =>
      prevState.map((playlist) =>
        playlist.id === playlistId ? updatedPlaylist : playlist,
      ),
    );
    console.log(updatedPlaylist);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [fetchedVideos, fetchedPlaylists] = await Promise.all([
          getVideosArray(),
          getPlaylistsArray(),
        ]);

        setVideos(fetchedVideos);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching videos and playlists:', error);
      }
    };

    fetchAll();
  }, []);

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          width: '100%',
          '& .MuiTabs-flexContainer': {
            gap: 1,
            padding: 1,
            borderBottom: '1px solid',
            borderColor: 'gray.200',
          },

          '& .MuiTabs-indicator': {
            height: '1px',
            backgroundColor: 'gray.600',
          },
        }}
      >
        <SettingsTab
          customIcon={<VideoSettingsRoundedIcon />}
          customLabel="Плейлисти"
          {...a11yProps(0)}
        />

        <SettingsTab
          customIcon={<ImageIcon fontSize="medium" />}
          customLabel="Відео"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ListItem
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <ListItemText primary="Name" />
          </Box>
          <Box sx={{ width: '15%' }}>
            <ListItemText primary="Category" />
          </Box>
          <Box sx={{ width: '10%' }}>
            <ListItemText primary="Age" />
          </Box>
          <Box sx={{ width: '10%' }}>
            <ListItemText primary="CreatedAt" />
          </Box>
          <Box
            sx={{ width: '40%', textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            <ListItemText primary="Link" />
          </Box>
          <Box sx={{ width: '10%', textAlign: 'center' }}>
            <ListItemText primary="Remove" />
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <ListItemText primary="Edit" />
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <ListItemText primary="Save" />
          </Box>
        </ListItem>
        <List>
          {!!playlists.length &&
            playlists.map((playlist) => (
              <ListVideosItem
                categories={categories}
                key={playlist.url}
                video={playlist}
                removeFunction={handlePlaylistRemove}
                videoUpdate={handlePlaylistUpdate}
              />
            ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListItem
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <ListItemText primary="Name" />
          </Box>
          <Box sx={{ width: '15%' }}>
            <ListItemText primary="Category" />
          </Box>
          <Box sx={{ width: '10%' }}>
            <ListItemText primary="Age" />
          </Box>
          <Box sx={{ width: '10%' }}>
            <ListItemText primary="CreatedAt" />
          </Box>
          <Box
            sx={{ width: '40%', textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            <ListItemText primary="Link" />
          </Box>
          <Box sx={{ width: '10%', textAlign: 'center' }}>
            <ListItemText primary="Remove" />
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <ListItemText primary="Edit" />
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <ListItemText primary="Save" />
          </Box>
        </ListItem>

        <List
          sx={{
            maxHeight: '50vh',
            overflow: 'auto',
          }}
        >
          {!!videos.length &&
            videos.map((video) => (
              <ListVideosItem
                categories={categories}
                key={video.url}
                video={video}
                removeFunction={handleVideoRemove}
                videoUpdate={handleVideoUpdate}
                isVideo
              />
            ))}
        </List>
      </TabPanel>
    </Box>
  );
};

export default RemoveEditTab;
