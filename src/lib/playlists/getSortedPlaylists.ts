import { Playlist } from '@/types/VideoData';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../database/firebase';

export const fetchPlaylistsByCategory = async (
  category: string,
): Promise<Playlist[]> => {
  const playlistsRef = collection(db, 'sortedPlaylists');

  if (category.toLowerCase() === 'all') {
    const allPlaylistsSnapshot = await getDocs(playlistsRef);
    return allPlaylistsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Playlist[];
  }

  const filteredPlaylistsQuery = query(
    playlistsRef,
    where('category', '==', category.toLowerCase()),
  );
  const filteredPlaylistsSnapshot = await getDocs(filteredPlaylistsQuery);

  return filteredPlaylistsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Playlist[];
};
