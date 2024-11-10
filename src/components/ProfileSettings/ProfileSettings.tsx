'use client';

import { LogOutIcon, SettingsIcon, UserIcon } from '@/assets/icons';
import { TabProfile, TabSettings, a11yProps } from '@/components';
import useAuthStore from '@/store/useAuthStore';
import { Box, Modal, Tabs } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SettingsTab, TabModal } from '../UI';

interface Props {
  open: boolean;
}

const ProfileSettings = ({ open }: Readonly<Props>) => {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logout } = useAuthStore();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    router.replace(pathname);
  };

  useEffect(() => {
    const currentSection = searchParams.get('settings');
    if (currentSection === 'profile') {
      setValue(0);
    } else if (currentSection === 'settings') {
      setValue(1);
    }
  }, [searchParams]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            background: 'rgba(255, 255, 255, 0.20)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            width: '660px',
            padding: '24px',
            border: `1px solid `,
            borderColor: 'gray.200',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: 'gray.100',

              minWidth: {
                '2xl': '228px',
              },
              minHeight: {
                '2xl': '513px',
              },
              paddingRight: '16px',
              '& .MuiTabs-indicator': {
                display: 'none',
              },

              '& .MuiTab-root': {
                marginBottom: '8px',
              },
              '& .MuiTabs-root': {
                marginBottom: '8px',
              },
            }}
          >
            <SettingsTab
              customIcon={<UserIcon width={24} height={24} />}
              customLabel="Профіль"
              {...a11yProps(0)}
            />
            <SettingsTab
              customIcon={<SettingsIcon width={24} height={24} />}
              customLabel="Налаштування"
              {...a11yProps(1)}
            />
            <SettingsTab
              customIcon={<LogOutIcon width={24} height={24} />}
              customLabel="Вихід"
              onClick={() => setShowModal(true)}
            />
          </Tabs>
          <TabProfile value={value} handleClose={handleClose} index={0} />
          <TabSettings value={value} index={1} handleClose={handleClose} />
          <TabModal
            title="Вийти з системи?"
            open={showModal}
            closeModal={() => setShowModal(false)}
            someFunction={logout}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileSettings;
