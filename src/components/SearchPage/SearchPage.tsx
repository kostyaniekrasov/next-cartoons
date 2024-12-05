'use client';

import { ChevronLeftIcon } from '@/assets/icons';
import { GridForList } from '@/components';
import { useVideoStore } from '@/store/useVideoStore';
import { PlaylistsType } from '@/types';
import { Playlist } from '@/types/VideoData';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from '@mui/material';
import Fuse from 'fuse.js';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const {
    playlists,
    fetchPlaylistsIfEmpty,
    categories,
    fetchCategoriesIfEmpty,
  } = useVideoStore();
  const [searchResults, setSearchResults] = useState<Playlist[]>([]);
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [initialResults, setInitialResults] = useState<Playlist[]>([]);

  useEffect(() => {
    if (categories.length > 0) {
      const initialFilters = categories.reduce(
        (acc, category) => ({
          ...acc,
          [category.name]: false,
        }),
        {},
      );
      setFilters(initialFilters);
    }
  }, [categories]);

  const performSearch = useCallback(
    (query: string) => {
      if (query) {
        const fuse = new Fuse(playlists, {
          keys: ['title'],
          threshold: 0.4,
        });

        const fuseResults = fuse.search(query);

        const startsWithQuery = fuseResults
          .filter((result) =>
            result.item.title.toLowerCase().startsWith(query.toLowerCase()),
          )
          .map((result) => result.item);

        const otherResults = fuseResults
          .filter(
            (result) =>
              !result.item.title.toLowerCase().startsWith(query.toLowerCase()),
          )
          .map((result) => result.item);

        setSearchResults([...startsWithQuery, ...otherResults]);
        setInitialResults([...startsWithQuery, ...otherResults]);
      } else {
        setSearchResults([]);
        setInitialResults([]);
      }
    },
    [playlists],
  );

  const applyFilters = useCallback(() => {
    const activeFilters = Object.entries(filters)
      .filter(([, isChecked]) => isChecked)
      .map(([category]) => category);

    if (activeFilters.length > 0) {
      const filteredResults = initialResults.filter((playlist) =>
        activeFilters.includes(playlist.category),
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(initialResults);
    }
  }, [filters, initialResults]);
  useEffect(() => {
    const runSearch = async () => {
      if (query) {
        await fetchPlaylistsIfEmpty();
        performSearch(query);
      }
    };

    runSearch();
  }, [query, fetchPlaylistsIfEmpty, performSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      await fetchCategoriesIfEmpty();
    };

    fetchCategories();
  }, [fetchCategoriesIfEmpty, playlists.length]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleCheckboxChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Box>
      <Container disableGutters>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <IconButton
            href={`/all`}
            sx={{
              alignItems: 'center',
              padding: '0 10px 0 0',
              borderRadius: '12px',
            }}
          >
            <ChevronLeftIcon width={17} height={17} />
            <Typography variant="mainTextSemibold" color="gray.700">
              Повернутися
            </Typography>
          </IconButton>

          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {categories
              .filter((category) => category.name !== 'all')
              .map((category) => (
                <FormControlLabel
                  key={category.name}
                  control={
                    <Checkbox
                      checked={filters[category.name] || false}
                      onChange={() => handleCheckboxChange(category.name)}
                    />
                  }
                  label={category.title}
                />
              ))}
          </FormGroup>
        </Box>
        {searchResults.length > 0 ? (
          <GridForList
            playlists={searchResults}
            playlistsType={PlaylistsType.ByCategory}
            categories={categories}
          />
        ) : (
          <Typography variant="h5" align="center">
            {`Нічого не знайдено за запитом "${query}"`}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;
