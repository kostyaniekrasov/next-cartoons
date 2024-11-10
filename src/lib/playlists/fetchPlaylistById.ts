import { Playlist } from '@/types/VideoData';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../database/firebase';

export const fetchPlaylistById = async (
  playlistId: string,
): Promise<Playlist | null> => {
  try {
    const collectionRef = collection(db, 'sortedPlaylists');
    const q = query(collectionRef, where('id', '==', playlistId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const playlistDoc = querySnapshot.docs[0];
      const playlistData = playlistDoc.data() as Playlist;
      return playlistData;
    } else {
      console.log('Плейлист не знайдено');
      return null;
    }
  } catch (error) {
    console.error('Помилка отримання плейлиста:', error);
    return null;
  }
};
