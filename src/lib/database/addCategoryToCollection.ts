import { VideoCategory } from '@/types';
import { addDoc, collection } from 'firebase/firestore';

import { db } from './firebase';

const addCategoryToCollection = async (category: VideoCategory) => {
  const document = {
    ...category,
  };

  const docRef = await addDoc(collection(db, 'categories'), document);
  return docRef;
};

export default addCategoryToCollection;
