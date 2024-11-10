import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';

const removeAvatar = async (url: string) => {
  const avatarsRef = collection(db, 'avatars');

  const q = query(avatarsRef, where('url', '==', url));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    alert(`Аватар з посиланням ${url} успішно видалено`);
  });
};

export default removeAvatar;
