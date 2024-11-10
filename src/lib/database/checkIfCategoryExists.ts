import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from './firebase';

const checkIfCategoryExists = async (name: string) => {
  const queryRef = query(
    collection(db, 'categories'),
    where('name', '==', name),
  );

  const querySnapshot = await getDocs(queryRef);

  console.log(!querySnapshot.empty);

  return !querySnapshot.empty;
};

export default checkIfCategoryExists;
