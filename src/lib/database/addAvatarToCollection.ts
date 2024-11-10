import { addDoc, collection } from 'firebase/firestore';

import { db } from './firebase';

const addAvatarToCollection = async (link: string) => {
  const document = {
    url: link,
  };

  const docRef = await addDoc(collection(db, 'avatars'), document);
  return docRef;
};

export default addAvatarToCollection;
