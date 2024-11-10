import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';
import removeDocumentFromSortedPlaylists from './removeDocumentFromSortedPlaylists';

const removeVideoFromArray = async (id: string, name: string) => {
  const avatarsRef = collection(db, 'videos');

  const q = query(avatarsRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    await removeDocumentFromSortedPlaylists(name);

    alert(`Відео з посиланням ${id} успішно видалено`);
  });
};

export default removeVideoFromArray;
