'use client';

import { ChevronLeftIcon } from '@/assets/icons';
import { GridForList } from '@/components';
import { useVideoStore } from '@/store/useVideoStore';
import { PlaylistsType } from '@/types';
import { Playlist } from '@/types/VideoData';
import { Box, Container, IconButton, Typography } from '@mui/material';
import Fuse from 'fuse.js';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { playlists, fetchPlaylistsIfEmpty } = useVideoStore();
  const [searchResults, setSearchResults] = useState<Playlist[]>([]);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

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
      } else {
        setSearchResults([]);
      }
    },
    [playlists],
  );

  useEffect(() => {
    const runSearch = async () => {
      if (query && query !== lastQuery) {
        await fetchPlaylistsIfEmpty();
        performSearch(query);
        setLastQuery(query);
      }
    };

    runSearch();
  }, [query, lastQuery, fetchPlaylistsIfEmpty, performSearch]);

  return (
    <Box>
      <Container disableGutters>
        <IconButton
          href={`/all`}
          sx={{
            alignItems: 'center',
            marginBottom: '16px',
            padding: '0 10px 0 0',
            borderRadius: '12px',
          }}
        >
          <ChevronLeftIcon width={17} height={17} />
          <Typography variant="mainTextSemibold" color="gray.700">
            Повернутися
          </Typography>
        </IconButton>
        {searchResults.length > 0 ? (
          <GridForList
            playlists={searchResults}
            playlistsType={PlaylistsType.ByCategory}
          />
        ) : (
          <Typography variant="h5" align="center">
            Нічого не знайдено за запитом {query}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;
