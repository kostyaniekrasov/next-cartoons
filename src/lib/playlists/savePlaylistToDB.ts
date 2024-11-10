import { VideoData } from '@/types/VideoData';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';

interface P {
  id: string;
  title: string;
  videos: VideoData[];
  category: string;
}

const savePlaylistsToDB = async (
  playlists: P[],
  callback: (message: string) => void,
  updateProgress: (percentage: number) => void,
) => {
  const totalPlaylists = playlists.length;

  for (let i = 0; i < totalPlaylists; i++) {
    const playlist = playlists[i];
    try {
      const playlistQuery = query(
        collection(db, 'sortedPlaylists'),
        where('title', '==', playlist.title),
      );
      const querySnapshot = await getDocs(playlistQuery);

      if (querySnapshot.empty) {
        await setDoc(
          doc(collection(db, 'sortedPlaylists'), playlist.title),
          playlist,
        );
        callback(`Плейлист "${playlist.title}" додано в базу даних!`);
      } else {
        const existingDoc = querySnapshot.docs[0];
        await setDoc(
          doc(collection(db, 'sortedPlaylists'), existingDoc.id),
          playlist,
          {
            merge: true,
          },
        );
        callback(`Плейлист "${playlist.title}" оновлено в базі даних!`);
      }
    } catch (error) {
      callback(`Помилка обробки плейлиста "${playlist.title}": ${error}`);
    }

    const playlistProgress = Math.floor(((i + 1) / totalPlaylists) * 100);
    updateProgress(playlistProgress);
  }
};

export default savePlaylistsToDB;
