'use client';

import { AddPlusIcon, RemoveMinusIcon } from '@/assets/icons';
import { CustomInput } from '@/components/UI/Inputs';
import { fetchAvatars, removeAvatar } from '@/lib';
import addAvatarToCollection from '@/lib/database/addAvatarToCollection';
import checkIfAvatarsUrlExists from '@/lib/database/checkIfAvatarsUrlExists';
import { AvatarData } from '@/types';
import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SettingsTab } from '../../SettingsTab';
import { TabPanel, a11yProps } from '../../TabPanel';

interface FormDataAddAvatar {
  imgLink: string;
}

const AvatarsTab = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState,

    watch,
  } = useForm<FormDataAddAvatar>();

  const [value, setValue] = useState(0);
  const [avatars, setAvatars] = useState<AvatarData[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const imageLink = watch('imgLink');

  const onSubmitAvatar = async (data: FormDataAddAvatar) => {
    try {
      const urlExists = await checkIfAvatarsUrlExists(data.imgLink);

      if (urlExists) {
        alert('Таке посилання вже є в базі даних');
        return;
      }

      const docRef = await addAvatarToCollection(data.imgLink);
      console.log(`Документ успішно додано з ID: ${docRef.id}`);

      reset();
    } catch (error) {
      console.error('Помилка при доданні документа: ', error);
    }
  };

  useEffect(() => {
    const getAvatars = async () => {
      const avatars = await fetchAvatars();

      if (avatars) {
        setAvatars(avatars);
      }
    };

    if (value === 1) {
      getAvatars();
    }
  }, [value]);

  const handleRemoveAvatar = (avatarUrl: string) => {
    setAvatars((prevState) =>
      prevState.filter((avatar) => avatar.url !== avatarUrl),
    );
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
          customLabel="Додати аватар"
          {...a11yProps(0)}
        />

        <SettingsTab
          customIcon={<RemoveMinusIcon />}
          customLabel="Видалити аватар"
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmitAvatar)}
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 40,
            }}
          >
            <CustomInput
              fullWidth
              label="Посилання на картинку"
              variant="outlined"
              {...register('imgLink', {
                required: 'Посилання обов’язкове',
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: 'Неправильний формат посилання',
                },
              })}
              error={!!formState.errors.imgLink}
              helperText={formState.errors.imgLink?.message}
            />

            <Collapse in={!!imageLink} unmountOnExit>
              {imageLink && (
                <Image
                  alt="loadImage"
                  src={imageLink}
                  width={250}
                  height={250}
                />
              )}
            </Collapse>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="avatars"
            fullWidth
          >
            Надіслати
          </Button>

          <Box display={'flex'} flexDirection={'column'}>
            <Typography>
              Зображення можна додати тільки з таких доменів:
            </Typography>

            <Link href={'https://cdn1.iconfinder.com'} target="_blank">
              cdn1.iconfinder.com
            </Link>

            <Link href={'https://i.pinimg.com'} target="_blank">
              i.pinimg.com
            </Link>

            <Link href={'https://images.ctfassets.net'} target="_blank">
              images.ctfassets.net
            </Link>

            <Link href={'https://cdn.icon-icons.com'} target="_blank">
              cdn.icon-icons.com
            </Link>

            <Link href={'https://img.icons8.com'} target="_blank">
              img.icons8.com
            </Link>

            <Link href={'https://cdn.worldvectorlogo.com'} target="_blank">
              cdn.worldvectorlogo.com
            </Link>

            <Link href={'https://i.imgur.com'} target="_blank">
              i.imgur.com
            </Link>

            <Link href={'https://brovary.net.ua'} target="_blank">
              brovary.net.ua
            </Link>

            <Link href={'https://media.istockphoto.com'} target="_blank">
              media.istockphoto.com
            </Link>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <List>
          {!!avatars.length &&
            avatars.map((avatar) => (
              <AvatarItem
                avatar={avatar}
                key={avatar.url}
                deleteAvatar={handleRemoveAvatar}
              />
            ))}
        </List>
      </TabPanel>
    </Box>
  );
};

export default AvatarsTab;

interface AvatarItemProps {
  avatar: AvatarData;
  deleteAvatar: (url: string) => void;
}

const AvatarItem = ({ avatar, deleteAvatar }: AvatarItemProps) => {
  const [visible, setVisible] = useState(true);

  const handleDelete = async (url: string) => {
    await removeAvatar(url).then(() => {
      deleteAvatar(url);
      setVisible(false);
    });
  };

  return (
    <Collapse in={visible} timeout={300} unmountOnExit>
      <ListItem
        sx={{
          gap: 2,
        }}
      >
        <Image src={avatar.url} alt={avatar.url} width={200} height={200} />
        <Button onClick={() => handleDelete(avatar.url)} variant="contained">
          DElete
        </Button>
      </ListItem>
    </Collapse>
  );
};
