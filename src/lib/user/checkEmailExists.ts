import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../database/firebase';

const checkEmailExists = async (email: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
};

export default checkEmailExists;
