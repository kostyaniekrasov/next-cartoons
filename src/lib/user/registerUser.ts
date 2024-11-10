import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../database/firebase';

const registerUser = async (
  email: string,
  password: string,
  name: string,
  age: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, { displayName: name });

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    name,
    age,
    email,
    uid: userCredential.user.uid,
    watchLater: [],
    continueWatching: [],
    role: 'User',
  });

  await sendEmailVerification(userCredential.user);

  return userCredential.user;
};

export default registerUser;
