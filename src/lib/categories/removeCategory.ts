import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../database/firebase';

const removeCategory = async (categoryName: string) => {
  const categoriesRef = collection(db, 'categories');

  const q = query(categoriesRef, where('name', '==', categoryName));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    alert(`Категорію з name="${categoryName}" видалено.`);
  });
};

export default removeCategory;
