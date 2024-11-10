import UpdateUserData from '@/types/UpdateUserData';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../database/firebase';

const updateUserData = async (
  userId: string,
  updatedData: Partial<UpdateUserData>,
) => {
  const userRef = doc(db, 'users', userId);

  try {
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.log(error);
  }
};

export default updateUserData;
