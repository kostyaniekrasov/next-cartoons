'use client';

import { CustomInput } from '@/components/UI/Inputs';
import addDocumentToCollection from '@/lib/database/addDocumentToCollection';
import checkIfVideosUrlExists from '@/lib/database/checkIfVideosUrlExists';
import { VideoCategory } from '@/types';
import { extractIds } from '@/utils';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface FormDataAddVideo {
  type: 'videos' | 'playlists';
  title: string;
  link: string;
  category: string;
  ageCategory: string;
}

interface Props {
  categories: VideoCategory[];
  defaultCategory: string;
}

const AddVideoForm = ({ categories, defaultCategory }: Props) => {
  const { register, handleSubmit, reset, formState } =
    useForm<FormDataAddVideo>();

  const onSubmitVideos: SubmitHandler<FormDataAddVideo> = async (data) => {
    try {
      const urlExists = await checkIfVideosUrlExists(data.link, data.type);

      if (urlExists) {
        alert('Таке посилання вже є в базі даних');
        return;
      }

      if (data.type === 'videos') {
        extractIds.extractVideoId(data.link);
      } else if (data.type === 'playlists') {
        extractIds.extractPlaylistId(data.link);
      }

      const newDocument = {
        ...data,
        id: uuidv4(),
      };
      const docRef = await addDocumentToCollection(newDocument);

      alert(`Документ успішно додано : ${docRef}`);

      reset();
    } catch (error) {
      alert(`Помилка при доданні документа: ${error} `);
    }
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmitVideos)}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Тип</FormLabel>
        <RadioGroup row defaultValue="playlists">
          <FormControlLabel
            value="playlists"
            control={<Radio />}
            label="Плейлист"
            {...register('type', {
              required: 'Це поле обов’язкове',
            })}
          />
          <FormControlLabel
            value="videos"
            control={<Radio />}
            label="Відео"
            {...register('type', {
              required: 'Це поле обов’язкове',
            })}
          />
        </RadioGroup>
        {formState.errors.type && (
          <span style={{ color: 'red' }}>{formState.errors.type.message}</span>
        )}
      </FormControl>

      <CustomInput
        fullWidth
        label="Назва"
        variant="outlined"
        {...register('title', {
          required: 'Назва обов’язкова',
          minLength: { value: 3, message: 'Мінімум 3 символи' },
        })}
        error={!!formState.errors.title}
        helperText={formState.errors.title?.message}
      />

      <CustomInput
        fullWidth
        label="Посилання"
        variant="outlined"
        {...register('link', {
          required: 'Посилання обов’язкове',
          pattern: {
            value: /^https?:\/\/.+$/,
            message: 'Неправильний формат посилання',
          },
        })}
        error={!!formState.errors.link}
        helperText={formState.errors.link?.message}
      />

      {defaultCategory && (
        <CustomInput
          fullWidth
          title="category"
          select
          label="Категорія відео"
          defaultValue={defaultCategory}
          error={!!formState.errors.category}
          helperText={formState.errors.category?.message}
          {...register('category', {
            required: 'Оберіть категорію',
          })}
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
        >
          {categories
            .filter((c) => c.name !== 'all')
            .map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.title}
              </MenuItem>
            ))}
        </CustomInput>
      )}

      <CustomInput
        fullWidth
        title="ageCategory"
        select
        label="Вікова категорія"
        defaultValue={3}
        error={!!formState.errors.ageCategory}
        helperText={formState.errors.ageCategory?.message}
        {...register('ageCategory', {
          valueAsNumber: true,
          required: 'Вкажіть вікову категорію',
        })}
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
      >
        <MenuItem value={3}>0-3</MenuItem>
        <MenuItem value={5}>3-5</MenuItem>
        <MenuItem value={8}>6-8</MenuItem>
      </CustomInput>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Надіслати
      </Button>
    </Box>
  );
};

export default AddVideoForm;
