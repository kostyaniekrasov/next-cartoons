import { VideoData } from '@/types/VideoData';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VideoFetchData {
  videoId: string;
  category: string;
}

interface Store {
  videos: VideoData[];
  fetchVideos: (videos: VideoFetchData[]) => Promise<void>;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      videos: [],
      fetchVideos: async (videoFetchData: VideoFetchData[]) => {
        const { videos } = get();

        const missingVideoData = videoFetchData.filter(
          ({ videoId }) => !videos.some((video) => video.id === videoId)
        );

        if (missingVideoData.length === 0) return;

        const responses = await Promise.all(
          missingVideoData.map(async ({ videoId, category }) => {
            const response = await fetch(
              `/api/getVideoInfo?videoId=${videoId}&category=${category}`
            );
            if (response.ok) {
              const data = await response.json();
              return { ...data, category };
            }
            return null;
          })
        );

        const validResponses = responses.filter(
          (data): data is VideoData & { category: string } => data !== null
        );

        const uniqueVideos = [...videos, ...validResponses].filter(
          (video, index, self) =>
            index === self.findIndex((v) => v.id === video.id)
        );

        set(() => ({
          videos: uniqueVideos,
        }));
      },
    }),
    {
      name: 'video-storage',
    }
  )
);
