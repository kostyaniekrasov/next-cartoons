import { PlaylistItem, VideoSnippet } from '@/types/VideoData';

import extractIds from '../../utils/extractIds';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export interface VideoContentDetails {
  duration: string;
}

async function fetchPlaylist(
  VideoUrlFromDB: string,
  category: string,
  name: string,
  recommendedAge: number,
): Promise<PlaylistItem[]> {
  const playlistId = extractIds.extractPlaylistId(VideoUrlFromDB);
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${YOUTUBE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    console.warn(
      `Video not found or is unavailable for playlist ID: ${playlistId}`,
    );
    return [];
  }

  const videoIds = data.items.map(
    (item: { snippet: VideoSnippet }) => item.snippet.resourceId.videoId,
  );

  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(
    ',',
  )}&part=contentDetails,statistics&key=${YOUTUBE_API_KEY}`;
  const videosResponse = await fetch(videosUrl);
  const videosData = await videosResponse.json();

  return data.items.map(
    (
      item: {
        snippet: VideoSnippet;
      },
      index: number,
    ) => ({
      snippet: item.snippet,
      category,
      name,
      recommendedAge,
      contentDetails: {
        duration: videosData.items[index]?.contentDetails?.duration || 'N/A',
      },
      statistics: {
        viewCount: videosData.items[index]?.statistics?.viewCount || 'N/A',
        likeCount: videosData.items[index]?.likeCount?.viewCount || 'N/A',
      },
    }),
  );
}

export default fetchPlaylist;
