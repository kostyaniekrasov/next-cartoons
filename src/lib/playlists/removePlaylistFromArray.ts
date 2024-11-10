import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';
import removeDocumentFromSortedPlaylists from './removeDocumentFromSortedPlaylists';

const removePlaylistFromArray = async (id: string, name: string) => {
  const avatarsRef = collection(db, 'playlists');

  const q = query(avatarsRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    await removeDocumentFromSortedPlaylists(name);

    alert(`Плейлист з посиланням ${id} успішно видалено`);
  });
};

export default removePlaylistFromArray;
