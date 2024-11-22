import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const getExistingVideoIds = async (): Promise<
  { id: string; category: string; name: string; createdAt: string }[]
> => {
  const playlistsCollection = collection(db, 'sortedPlaylists');
  const snapshot = await getDocs(playlistsCollection);

  const videoData: {
    id: string;
    category: string;
    name: string;
    createdAt: string;
  }[] = [];

  snapshot.docs.forEach((doc) => {
    const playlist = doc.data();

    if (Array.isArray(playlist.videos)) {
      playlist.videos.forEach(
        (video: {
          id: string;
          category: string;
          name: string;
          createdAt: string;
        }) => {
          videoData.push({
            id: video.id,
            category: video.category,
            name: video.name,
            createdAt: video.createdAt,
          });
        },
      );
    }
  });

  return videoData;
};

export default getExistingVideoIds;
