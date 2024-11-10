interface VideoData {
  id: string;
  category: string;
  name: string;
  recommendedAge: number;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
      standard: {
        url: string;
      };
      maxres: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

interface VideoSnippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
    standard?: { url: string };
    maxres?: { url: string };
  };
  resourceId: { videoId: string };
}

interface PlaylistItem {
  id: string;
  snippet: VideoSnippet;
  category: string;
  name: string;
  recommendedAge: number;
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

interface Playlist {
  id: string;
  category: string;
  title: string;
  videos: VideoData[];
}

interface VideoUrlFromDB {
  id: string;
  url: string;
  category: string;
  name: string;
  recommendedAge: number;
}

export type { VideoData, VideoSnippet, PlaylistItem, Playlist, VideoUrlFromDB };
