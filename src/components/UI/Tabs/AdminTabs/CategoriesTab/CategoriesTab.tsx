'use client';

import { AddPlusIcon } from '@/assets/icons';
import { CustomInput } from '@/components/UI/Inputs';
import { getCategories, updateCategory } from '@/lib';
import removeCategory from '@/lib/categories/removeCategory';
import addCategoryToCollection from '@/lib/database/addCategoryToCollection';
import checkIfCategoryExists from '@/lib/database/checkIfCategoryExists';
import { VideoCategory } from '@/types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SettingsTab } from '../../SettingsTab';
import { TabPanel, a11yProps } from '../../TabPanel';

interface FormDataAddCategory {
  title: string;
  name: string;
  unit: string;
  description: string;
}

const CategoriesTab = () => {
  const { register, handleSubmit, reset, formState } =
    useForm<FormDataAddCategory>();

  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRemoveCategory = (categoryName: string) => {
    setCategories((prevState) =>
      prevState.filter((category) => category.name !== categoryName),
    );
  };

  const onSubmit = async (data: FormDataAddCategory) => {
    console.log('Функція onSubmit викликається з даними:', data);

    try {
      const categoryExists = await checkIfCategoryExists(data.name);

      if (categoryExists) {
        alert('Така категорія вже існує');
        return;
      }

      const docRef = await addCategoryToCollection(data);
      console.log('Категорію успішно додано з ID: ', docRef.id);

      reset();
    } catch (e) {
      console.error('Відбулись помилки при доданні категорії', e);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    };

    if (value === 1) {
      fetchCategories();
    }
  }, [value]);

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
          customLabel="Додати категорію"
          {...a11yProps(0)}
        />

        <SettingsTab
          customIcon={<EditNoteRoundedIcon fontSize="medium" />}
          customLabel="Видалити/редагувати категорію"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <CustomInput
              fullWidth
              label="name(cartoon)"
              variant="outlined"
              {...register('name', {
                required: 'Name обов’язкове',
              })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />

            <CustomInput
              fullWidth
              label="title(Мультики)"
              variant="outlined"
              {...register('title', {
                required: 'title обов’язкове',
              })}
              error={!!formState.errors.title}
              helperText={formState.errors.title?.message}
            />

            <CustomInput
              fullWidth
              label="Опис категорії(Цей шось кудись)"
              variant="outlined"
              {...register('description', {
                required: 'description обов’язкове',
              })}
              error={!!formState.errors.description}
              helperText={formState.errors.description?.message}
            />

            <CustomInput
              fullWidth
              label="одиниця(Мультик)"
              variant="outlined"
              {...register('unit', {
                required: 'unit обов’язкове',
              })}
              error={!!formState.errors.unit}
              helperText={formState.errors.unit?.message}
            />
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
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {!!categories.length &&
            categories.map((category) => (
              <CategoryItem
                key={category.name}
                category={category}
                deleteCategory={handleRemoveCategory}
              />
            ))}
        </List>
      </TabPanel>
    </Box>
  );
};

export default CategoriesTab;

interface RowsProps {
  category: VideoCategory;
  deleteCategory: (name: string) => void;
}

const CategoryItem = ({ category, deleteCategory }: RowsProps) => {
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: formStateEdit,
  } = useForm<FormDataAddCategory>();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleDelete = async (name: string) => {
    await removeCategory(name).then(() => {
      deleteCategory(name);
      setVisible(false);
    });
  };

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onSubmit = async (data: FormDataAddCategory) => {
    try {
      await updateCategory(data.name, data);
      setIsEdit(false);
    } catch (e) {
      console.error('Відбулись помилки при оновленні категорії', e);
    }
  };

  return (
    <Collapse in={visible} timeout={300} unmountOnExit>
      <ListItem>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <ListItemText primary={category.title} />
        <IconButton onClick={() => handleDelete(category.name)}>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 4, bgcolor: 'gray.100', padding: 1 }}>
          <Typography variant="caption">Вся інформація</Typography>
          <List disablePadding>
            {isEdit && (
              <Box component={'form'} onSubmit={handleSubmitEdit(onSubmit)}>
                <ListItem>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    defaultValue={category.title}
                    variant="standard"
                    {...registerEdit('title', {
                      validate: (value) =>
                        value.trim() !== '' || 'Поле не може бути пустим',
                    })}
                    error={!!formStateEdit.errors.title}
                    helperText={formStateEdit.errors.title?.message}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    defaultValue={category.name}
                    variant="standard"
                    {...registerEdit('name', {
                      validate: (value) =>
                        value.trim() !== '' || 'Поле не може бути пустим',
                    })}
                    error={!!formStateEdit.errors.name}
                    helperText={formStateEdit.errors.name?.message}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="standard-basic"
                    label="Опис"
                    defaultValue={category.description}
                    variant="standard"
                    {...registerEdit('description', {
                      validate: (value) =>
                        value.trim() !== '' || 'Поле не може бути пустим',
                    })}
                    error={!!formStateEdit.errors.description}
                    helperText={formStateEdit.errors.description?.message}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="standard-basic"
                    label="Одиниця"
                    defaultValue={category.unit}
                    variant="standard"
                    {...registerEdit('unit', {
                      validate: (value) =>
                        value.trim() !== '' || 'Поле не може бути пустим',
                    })}
                    error={!!formStateEdit.errors.unit}
                    helperText={formStateEdit.errors.unit?.message}
                  />
                </ListItem>

                <Button variant="contained" type="submit">
                  Зберегти
                </Button>
              </Box>
            )}
            {!isEdit && (
              <>
                <ListItem>
                  <ListItemText primary="Title" secondary={category.title} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Name" secondary={category.name} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Опис"
                    secondary={category.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Одиниця" secondary={category.unit} />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Collapse>
      <Divider />
    </Collapse>
  );
};
