import AvatarData from '@/types/AvatarData';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const fetchAvatars = async () => {
  try {
    const avatarsCollectionRef = collection(db, 'avatars');
    const avatarSnapshot = await getDocs(avatarsCollectionRef);

    const avatarList: AvatarData[] = avatarSnapshot.docs.map((doc) => ({
      ...(doc.data() as AvatarData),
    }));

    return avatarList;
  } catch (error) {
    console.error('Помилка при отриманні аватарів: ', error);
    return [];
  }
};

export default fetchAvatars;
