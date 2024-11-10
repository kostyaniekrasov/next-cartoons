import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const getExistingVideoIds = async (): Promise<string[]> => {
  const playlistsCollection = collection(db, 'sortedPlaylists');
  const snapshot = await getDocs(playlistsCollection);

  const videoIds: string[] = [];

  snapshot.docs.forEach((doc) => {
    const playlist = doc.data();

    if (Array.isArray(playlist.videos)) {
      playlist.videos.forEach((video: { id: string }) => {
        videoIds.push(video.id);
      });
    }
  });

  return videoIds;
};

export default getExistingVideoIds;
