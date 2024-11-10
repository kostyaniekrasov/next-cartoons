import { VideoUrlFromDB } from '@/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';

const updateVideosArray = async (id: string, newData: VideoUrlFromDB) => {
  const videosRef = collection(db, 'videos');
  const q = query(videosRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    alert('Відео не знайдено');
    console.error('Відео не знайдено');
    return;
  }

  const videoDoc = querySnapshot.docs[0];
  const videoRef = doc(db, 'videos', videoDoc.id);

  try {
    const currentDataSnap = await getDoc(videoRef);

    const currentData = currentDataSnap.data() as VideoUrlFromDB;
    const updates: Partial<VideoUrlFromDB> = {};

    if (newData.name && newData.name !== currentData.name) {
      updates.name = newData.name;
    }
    if (newData.url && newData.url !== currentData.url) {
      updates.url = newData.url;
    }
    if (
      newData.recommendedAge &&
      newData.recommendedAge !== currentData.recommendedAge
    ) {
      updates.recommendedAge = newData.recommendedAge;
    }
    if (newData.category && newData.category !== currentData.category) {
      updates.category = newData.category;
    }

    if (Object.keys(updates).length > 0) {
      await updateDoc(videoRef, updates);
      alert('Відео успішно оновлено');
    } else {
      alert('Немає змін для оновлення');
    }
  } catch (error) {
    alert(`Помилка при оновленні Відео: ${error}`);
  }
};

export default updateVideosArray;
