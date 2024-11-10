import { VideoCategory } from '@/types';
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

const updateCategory = async (categoryName: string, newData: VideoCategory) => {
  const categoriesRef = collection(db, 'categories');
  const q = query(categoriesRef, where('name', '==', categoryName));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    alert('Категорія не знайдена');
    console.error('Категорія не знайдена');
    return;
  }

  const categoryDoc = querySnapshot.docs[0];
  const categoryRef = doc(db, 'categories', categoryDoc.id);

  try {
    const currentDataSnap = await getDoc(categoryRef);

    const currentData = currentDataSnap.data() as VideoCategory;
    const updates: Partial<VideoCategory> = {};

    if (newData.title && newData.title !== currentData.title) {
      updates.title = newData.title;
    }
    if (
      newData.description &&
      newData.description !== currentData.description
    ) {
      updates.description = newData.description;
    }
    if (newData.unit && newData.unit !== currentData.unit) {
      updates.unit = newData.unit;
    }
    if (newData.name && newData.name !== currentData.name) {
      updates.name = newData.name;
    }

    if (Object.keys(updates).length > 0) {
      await updateDoc(categoryRef, updates);
      alert('Категорія успішно оновлена');
    } else {
      alert('Немає змін для оновлення');
    }
  } catch (error) {
    alert(`Помилка при оновленні категорії: ${error}`);
  }
};

export default updateCategory;
