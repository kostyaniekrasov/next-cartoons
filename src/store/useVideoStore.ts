import { fetchPlaylistsByCategory } from '@/lib/playlists/getSortedPlaylists';
import { Playlist, VideoData } from '@/types/VideoData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  playlists: Playlist[];
  filteredPlaylists: Playlist[];
  selectedFilter: string;
  setSelectedFilter: (category: string) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  getPlaylistByTitle: (title: string) => Playlist | undefined;
  fetchPlaylistsIfEmpty: () => Promise<void>;
  setPlaylistsByCategory: (category: string) => void;
}

export const useVideoStore = create<Store>()(
  persist(
    (set, get) => ({
      playlists: [],
      filteredPlaylists: [],
      selectedFilter: 'all',
      setPlaylists: (playlists: Playlist[]) => {
        set({ playlists });
      },
      getPlaylistByTitle: (title: string) => {
        return get().playlists.find(
          (playlist) =>
            playlist.title.replace(/\s+/g, '-').toLowerCase() === title,
        );
      },

      fetchPlaylistsIfEmpty: async () => {
        const playlists = get().playlists;
        if (playlists.length === 0) {
          const data = await fetchPlaylistsByCategory('all');
          if (data) {
            set({ playlists: data });
          }
        }
      },
      setPlaylistsByCategory: (category: string) => {
        const playlists = get().playlists;

        if (category.toLowerCase() === 'all') {
          set({ filteredPlaylists: playlists });
          return;
        }

        const validCategories = ['cartoon', 'learning', 'music'];

        if (validCategories.includes(category.toLowerCase())) {
          const filtered = playlists
            .map((playlist) => ({
              ...playlist,
              videos: playlist.videos.filter(
                (video: VideoData) =>
                  video.category.toLowerCase() === category.toLowerCase(),
              ),
            }))
            .filter((playlist) => playlist.videos.length > 0);

          set({ filteredPlaylists: filtered });
        } else {
          set({ filteredPlaylists: [] });
        }
      },
      setSelectedFilter: (category: string) => {
        set({ selectedFilter: category });
      },
    }),
    {
      name: 'videos-storage',
    },
  ),
);
