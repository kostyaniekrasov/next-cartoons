import { fetchPlaylists, fetchVideoDetails } from '@/lib';
import { PlaylistItem, VideoUrlFromDB } from '@/types/VideoData';
import extractIds from '@/utils/extractIds';

import getExistingVideoIds from '../playlists/getExistingVideoIds';

const getYouTubeData = async (
  videosUrls: VideoUrlFromDB[],
  playlistsUrls: VideoUrlFromDB[],
) => {
  const existingVideoData = await getExistingVideoIds();

  const videoFetchData = videosUrls
    .filter((video) => {
      const existingVideo = existingVideoData.find(
        (v) => v.id === extractIds.extractVideoId(video.url),
      );

      if (!existingVideo) {
        return true;
      }

      return (
        existingVideo.category !== video.category ||
        existingVideo.name !== video.name ||
        existingVideo.createdAt !== video.createdAt
      );
    })
    .map((video) =>
      fetchVideoDetails(
        video.url,
        video.category,
        video.name,
        video.recommendedAge,
        video.createdAt,
      ),
    );

  const playlistFetchData = playlistsUrls.map(async (playlist) => {
    const playlistVideos = await fetchPlaylists(
      playlist.url,
      playlist.category,
      playlist.name,
      playlist.recommendedAge,
      playlist.createdAt,
    );

    return playlistVideos
      .filter((video: PlaylistItem) => {
        const existingVideo = existingVideoData.find((v) => v.id === video.id);

        if (!existingVideo) {
          return true;
        }

        return (
          existingVideo.category !== video.category ||
          existingVideo.name !== video.name ||
          existingVideo.createdAt !== playlist.createdAt
        );
      })
      .map((video: PlaylistItem) => ({
        id: video.snippet.resourceId.videoId,
        category: video.category,
        name: video.name,
        createdAt: playlist.createdAt,
        snippet: {
          ...video.snippet,
          thumbnails: {
            ...video.snippet.thumbnails,
            standard: video.snippet.thumbnails.standard || { url: '' },
            maxres: video.snippet.thumbnails.maxres || { url: '' },
          },
        },
        contentDetails: { duration: video.contentDetails.duration || '' },
        recommendedAge: video.recommendedAge,
        statistics: {
          viewCount: video.statistics.viewCount || '',
          likeCount: video.statistics.likeCount || '',
        },
      }));
  });

  const videos = await Promise.all(videoFetchData);
  const playlists = await Promise.all(playlistFetchData);

  const allVideos = [...videos, ...playlists.flat()];

  return { videos: allVideos };
};

export default getYouTubeData;
