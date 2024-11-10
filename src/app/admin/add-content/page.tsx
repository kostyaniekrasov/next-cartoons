'use client';

import {
  AvatarsTab,
  CategoriesTab,
  SettingsTab,
  TabPanel,
  VideosPlaylistsTab,
  a11yProps,
} from '@/components';
import useAuthStore from '@/store/useAuthStore';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import { Alert, Box, CircularProgress, Container, Tabs } from '@mui/material';
import { useState } from 'react';

const AdminPanel = () => {
  const { user, loading } = useAuthStore();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (user?.role !== 'admin') {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Alert variant="filled" severity="warning">
            Ця сторінка тільки для адміністраторів.
          </Alert>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Container disableGutters>
        <Box
          sx={{
            bgcolor: 'background.paper',
            display: 'flex',
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{
              width: '300px',
              '& .MuiTabs-flexContainer': {
                width: 'max-content',
                gap: 1,
              },

              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <SettingsTab
              customIcon={<VideoSettingsRoundedIcon />}
              customLabel="відео/плейлисти"
              {...a11yProps(0)}
            />
            <SettingsTab
              customIcon={<AccountCircleRoundedIcon />}
              customLabel="Аватари"
              {...a11yProps(1)}
            />
            <SettingsTab
              customIcon={<TableRowsRoundedIcon />}
              customLabel="Категорії"
              {...a11yProps(2)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <VideosPlaylistsTab />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <AvatarsTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CategoriesTab />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPanel;
