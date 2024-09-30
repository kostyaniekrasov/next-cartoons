'use client';

import { useStore } from '@/store/store';
import Image from 'next/image';
import { useEffect } from 'react';

interface VideoInfo {
  videoId: string;
  category: string;
}

interface Props {
  videoFetchData: VideoInfo[];
}

const VideoInfo = ({ videoFetchData }: Props) => {
  const { videos, fetchVideos } = useStore();

  useEffect(() => {
    fetchVideos(videoFetchData);
  }, [fetchVideos, videoFetchData]);

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id}>
            <h2>{video.snippet.title.split('@')[0]}</h2>
            <p>{video.category}</p>
            <p>{video.snippet.description.split('\n')[0]}</p>
            <Image
              src={
                video.snippet.thumbnails.high.url ||
                video.snippet.thumbnails.medium.url ||
                video.snippet.thumbnails.default.url
              }
              alt={video.snippet.title}
              width={400}
              height={500}
            />
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoInfo;
