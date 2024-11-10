import { fetchPlaylists, fetchVideoDetails } from '@/lib';
import { PlaylistItem, VideoUrlFromDB } from '@/types/VideoData';
import extractIds from '@/utils/extractIds';

import getExistingVideoIds from '../playlists/getExistingVideoIds';

const getYouTubeData = async (
  videosUrls: VideoUrlFromDB[],
  playlistsUrls: VideoUrlFromDB[],
) => {
  const existingVideoIds = await getExistingVideoIds();
  const videoFetchData = videosUrls
    .filter(
      (video) =>
        !existingVideoIds.includes(extractIds.extractVideoId(video.url)),
    )
    .map((video) =>
      fetchVideoDetails(
        video.url,
        video.category,
        video.name,
        video.recommendedAge,
      ),
    );

  const playlistFetchData = playlistsUrls.map(async (playlist) => {
    const playlistVideos = await fetchPlaylists(
      playlist.url,
      playlist.category,
      playlist.name,
      playlist.recommendedAge,
    );

    return playlistVideos
      .filter((video: PlaylistItem) => !existingVideoIds.includes(video.id))
      .map((video: PlaylistItem) => ({
        id: video.snippet.resourceId.videoId,
        category: video.category,
        name: video.name,
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
