import extractIds from '../../utils/extractIds';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function fetchVideoDetails(
  VideoUrlFromDB: string,
  category: string,
  name: string,
  recommendedAge: number,
  createdAt: string,
) {
  const videoId = extractIds.extractVideoId(VideoUrlFromDB);
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found or is unavailable');
  }

  const video = data.items[0];
  return {
    id: videoId,
    category,
    name,
    recommendedAge,
    createdAt,
    snippet: video.snippet,
    contentDetails: {
      duration: video.contentDetails.duration,
    },
    statistics: {
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
    },
  };
}

export default fetchVideoDetails;
