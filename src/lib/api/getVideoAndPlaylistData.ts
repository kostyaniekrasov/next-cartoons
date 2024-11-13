import { VideoUrlFromDB } from '@/types/VideoData';
import { DocumentData, collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const fetchDataFromCollection = async (
  collectionName: string,
): Promise<VideoUrlFromDB[]> => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc: DocumentData) => {
    const data = doc.data();
    return {
      url: data.url,
      category: data.category,
      name: data.name,
      recommendedAge: data.recommendedAge,
      createdAt: data.createdAt ?? new Date().toISOString(),
    } as VideoUrlFromDB;
  });
};

const getVideoAndPlaylistData = async (): Promise<{
  videosUrls: VideoUrlFromDB[];
  playlistsUrls: VideoUrlFromDB[];
}> => {
  try {
    const [videosUrls, playlistsUrls] = await Promise.all([
      fetchDataFromCollection('videos'),
      fetchDataFromCollection('playlists'),
    ]);

    return { videosUrls, playlistsUrls };
  } catch (error) {
    console.error('Помилка отримання даних з бази даних:', error);
    throw new Error('Не вдалося отримати відео та плейлисти з бази даних');
  }
};

export default getVideoAndPlaylistData;
