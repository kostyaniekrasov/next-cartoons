import { VideoUrlFromDB } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const getPlaylistsArray = async () => {
  try {
    const playlistsCollectionRef = collection(db, 'playlists');
    const playlistSnapshot = await getDocs(playlistsCollectionRef);

    const playlistsList: VideoUrlFromDB[] = playlistSnapshot.docs.map(
      (doc) => ({
        ...(doc.data() as VideoUrlFromDB),
      }),
    );

    return playlistsList;
  } catch (e) {
    alert(`Помилка при отримані масиву плейлистів: ${e}`);
    return [];
  }
};

export default getPlaylistsArray;
