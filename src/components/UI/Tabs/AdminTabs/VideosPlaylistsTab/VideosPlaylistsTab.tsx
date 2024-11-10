'use client';

import { AddPlusIcon } from '@/assets/icons';
import {
  ProgressWithStatus,
  SettingsTab,
  TabPanel,
  a11yProps,
} from '@/components';
import { getCategories } from '@/lib';
import processPlaylists from '@/lib/playlists/processPlaylists';
import { VideoCategory } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, List, ListItem, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { AddVideoForm } from './AddVideoForm';
import { RemoveEditTab } from './RemoveEditTab';

const VideosPlaylistsTab = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const defaultCategory =
    categories.find((c) => c.name === 'cartoon')?.name ?? '';

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const updateStatus = (message: string) => {
    setStatusMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateProgress = (percentage: number) => {
    setProgress(percentage);
  };

  const handleUpdateDatabase = async () => {
    setStatusMessages([]);
    setProgress(0);
    await processPlaylists(updateStatus, updateProgress);
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'gray.200',
        borderRadius: '12px',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
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
          customIcon={<AddPlusIcon />}
          customLabel="Додати відео/плейлист"
          {...a11yProps(0)}
        />

        <SettingsTab
          customIcon={<EditIcon />}
          customLabel="Видалити/редагувати плейлист"
          {...a11yProps(1)}
        />
        <SettingsTab
          customIcon={<SaveIcon />}
          customLabel="Cинхронізувати базу даних"
          onClick={handleUpdateDatabase}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddVideoForm
          categories={categories}
          defaultCategory={defaultCategory}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RemoveEditTab categories={categories} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box
          sx={{
            padding: 2,
          }}
        >
          <ProgressWithStatus progress={progress} />
          <Box
            sx={{
              maxHeight: '500px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <List>
              {statusMessages.map((message) => (
                <ListItem
                  key={message}
                  sx={{
                    padding: '8px 16px',
                    borderBottom: '1px solid #e0e0e0',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {message}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default VideosPlaylistsTab;
