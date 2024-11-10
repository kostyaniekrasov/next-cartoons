import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from './firebase';

const checkIfVideosUrlExists = async (
  link: string,
  dataType: 'videos' | 'playlists',
) => {
  const collectionName = dataType === 'videos' ? 'videos' : 'playlists';
  const queryRef = query(
    collection(db, collectionName),
    where('url', '==', link),
  );

  const querySnapshot = await getDocs(queryRef);

  return !querySnapshot.empty;
};

export default checkIfVideosUrlExists;
