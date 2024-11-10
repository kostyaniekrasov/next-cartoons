'use client';

import { CustomInput } from '@/components';
import removePlaylistFromArray from '@/lib/playlists/removePlaylistFromArray';
import removeVideoFromArray from '@/lib/playlists/removeVideoFromArray';
import updatePlaylistsArray from '@/lib/playlists/updatePlaylistsArray';
import updateVideosArray from '@/lib/playlists/updateVideosArray';
import { VideoCategory, VideoUrlFromDB } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Collapse,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  video: VideoUrlFromDB;
  isVideo?: boolean;
  removeFunction: (url: string) => void;
  categories: VideoCategory[];
  videoUpdate: (video: VideoUrlFromDB) => void;
}

const ListVideosItem = ({
  video,
  removeFunction,
  isVideo,
  categories,
  videoUpdate,
}: Props) => {
  const { register, handleSubmit, formState } = useForm<VideoUrlFromDB>();

  const [visible, setVisible] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (isVideo) {
      await removeVideoFromArray(id, name).then(() => {
        setVisible(false);
        removeFunction(id);
      });
    } else {
      await removePlaylistFromArray(id, name).then(() => {
        setVisible(false);
        removeFunction(id);
      });
    }
  };

  const onSubmit = async (data: VideoUrlFromDB) => {
    console.log('Функція onSubmit викликається з даними:', data);

    try {
      if (isVideo) {
        await updateVideosArray(video.id, data);
      } else {
        await updatePlaylistsArray(video.id, data);
      }
      videoUpdate(data);
      setIsEdit(false);
      router.refresh();
    } catch (e) {
      console.error('Відбулись помилки при оновленні масиву', e);
    }
  };

  return (
    <Collapse in={visible} timeout={300} unmountOnExit>
      {!isEdit && (
        <ListItem sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ width: '20%' }}>
            <ListItemText primary={video.name} />
          </Box>
          <Box sx={{ width: '15%' }}>
            <ListItemText primary={video.category} />
          </Box>
          <Box sx={{ width: '10%' }}>
            <ListItemText primary={video.recommendedAge} />
          </Box>
          <Box
            sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'auto',
              }}
            >
              {video.url}
            </Typography>
          </Box>
          <Box sx={{ width: '10%', textAlign: 'center' }}>
            <IconButton onClick={() => handleDelete(video.id, video.name)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <IconButton>
              <SaveIcon />
            </IconButton>
          </Box>
        </ListItem>
      )}
      {isEdit && (
        <ListItem
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
        >
          <Box sx={{ width: '20%' }}>
            <CustomInput
              fullWidth
              defaultValue={video.name}
              {...register('name', {
                required: 'name обов’язкове',
              })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          </Box>
          <Box sx={{ width: '15%' }}>
            <CustomInput
              fullWidth
              title="category"
              select
              label="Категорія відео"
              defaultValue={video.category}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: 'white',
                        borderRadius: 2,
                        padding: 1,
                        '& .MuiMenuItem-root': {
                          borderRadius: 2,
                          marginBottom: 1,

                          padding: '8px 16px',
                          color: 'gray.800',
                          '&:hover': {
                            color: 'white',

                            bgcolor: 'accentPink.main',
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
                    },
                  },
                },
              }}
              {...register('category', {
                required: 'category обов’язкове',
              })}
              error={!!formState.errors.category}
              helperText={formState.errors.category?.message}
            >
              {categories
                .filter((c) => c.name !== 'all')
                .map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.title}
                  </MenuItem>
                ))}
            </CustomInput>
          </Box>
          <Box sx={{ width: '10%' }}>
            <CustomInput
              fullWidth
              title="ageCategory"
              select
              label="Вікова категорія"
              defaultValue={video.recommendedAge}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: 'white',
                        borderRadius: 2,
                        padding: 1,
                        '& .MuiMenuItem-root': {
                          borderRadius: 2,
                          marginBottom: 1,

                          padding: '8px 16px',
                          color: 'gray.800',
                          '&:hover': {
                            bgcolor: 'accentPink.main',
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
                    },
                  },
                },
              }}
              {...register('recommendedAge', {
                required: 'recommendedAge обов’язкове',
              })}
              error={!!formState.errors.recommendedAge}
              helperText={formState.errors.recommendedAge?.message}
            >
              <MenuItem value={3}>0-3</MenuItem>
              <MenuItem value={5}>3-5</MenuItem>
              <MenuItem value={8}>6-8</MenuItem>
            </CustomInput>
          </Box>
          <Box
            sx={{ width: '40%', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <CustomInput
              fullWidth
              defaultValue={video.url}
              {...register('url', {
                required: 'url обов’язкове',
              })}
              error={!!formState.errors.url}
              helperText={formState.errors.url?.message}
            />
          </Box>
          <Box sx={{ width: '10%', textAlign: 'center' }}>
            <IconButton onClick={() => handleDelete(video.id, video.name)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: '5%', textAlign: 'center' }}>
            <IconButton type="submit">
              <SaveIcon />
            </IconButton>
          </Box>
        </ListItem>
      )}
    </Collapse>
  );
};

export default ListVideosItem;
