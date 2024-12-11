import { db } from '@/lib/database/firebase';
import { Playlist } from '@/types/VideoData';
import { doc, getDoc } from 'firebase/firestore';

const isPlaylistSaved = async (
  userId: string,
  playlistId: string,
): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const watchLater: Playlist[] = userData.watchLater || [];

      return watchLater.some(
        (playlist: Playlist) => playlist.id === playlistId,
      );
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking if playlist is saved:', error);
    return false;
  }
};

export default isPlaylistSaved;
