import { getCategories } from '@/lib';
import fetchPlaylistsByCategory from '@/lib/playlists/getSortedPlaylists';
import { VideoCategory } from '@/types';
import { Playlist, VideoData } from '@/types/VideoData';
import { create } from 'zustand';

interface Store {
  playlists: Playlist[];
  savedPlaylists: Playlist[];
  categories: VideoCategory[];
  filteredPlaylists: Playlist[];
  selectedFilter: string;
  setSelectedFilter: (category: string) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  setSavedPlaylists: (playlists: Playlist[]) => void;
  setCategories: (categories: VideoCategory[]) => void;
  getPlaylistByTitle: (title: string) => Playlist | undefined;
  fetchPlaylistsIfEmpty: () => Promise<void>;
  fetchCategoriesIfEmpty: () => Promise<void>;
  setPlaylistsByCategory: (category: string) => void;
  clearSavedPlaylists: () => void;
}

const useVideoStore = create<Store>()((set, get) => ({
  playlists: [],
  savedPlaylists: [],
  categories: [],
  filteredPlaylists: [],
  selectedFilter: 'all',
  setPlaylists: (playlists: Playlist[]) => {
    set({ playlists });
  },
  setSavedPlaylists: (savedPlaylists: Playlist[]) => {
    set({ savedPlaylists });
  },
  setCategories: (categories: VideoCategory[]) => {
    set({ categories });
  },
  getPlaylistByTitle: (title: string) => {
    return get().playlists.find(
      (playlist) => playlist.title.replace(/\s+/g, '-').toLowerCase() === title,
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
  fetchCategoriesIfEmpty: async () => {
    const categories = get().categories;
    if (categories.length === 0) {
      const data = await getCategories();

      if (data) {
        set({ categories: data });
      }
    }
  },
  setPlaylistsByCategory: (category: string) => {
    const playlists = get().playlists;

    if (category.toLowerCase() === 'all') {
      set({ filteredPlaylists: playlists });
      return;
    }

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
  },
  setSelectedFilter: (category: string) => {
    set({ selectedFilter: category });
  },
  clearSavedPlaylists: () => {
    set({ savedPlaylists: [] });
  },
}));

export default useVideoStore;
