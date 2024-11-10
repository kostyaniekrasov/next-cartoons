import { VideoCategory } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const getCategories = async () => {
  try {
    const categoriesCollectionRef = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollectionRef);

    const categoriesList: VideoCategory[] = categoriesSnapshot.docs.map(
      (doc) => ({
        ...(doc.data() as VideoCategory),
      }),
    );

    return categoriesList;
  } catch (e) {
    console.error('Помилка при отриманні категорій', e);
  }
};

export default getCategories;
