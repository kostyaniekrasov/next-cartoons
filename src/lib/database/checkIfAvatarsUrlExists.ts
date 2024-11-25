import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from './firebase';

const checkIfAvatarsUrlExists = async (link: string) => {
  const queryRef = query(collection(db, 'avatars'), where('url', '==', link));
  const querySnapshot = await getDocs(queryRef);

  return !querySnapshot.empty;
};

export default checkIfAvatarsUrlExists;
