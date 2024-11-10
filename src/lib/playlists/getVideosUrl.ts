import { VideoUrlFromDB } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../database/firebase';

const getVideosArray = async () => {
  try {
    const videosCollectionRef = collection(db, 'videos');
    const videoSnapshot = await getDocs(videosCollectionRef);

    const videosList: VideoUrlFromDB[] = videoSnapshot.docs.map((doc) => ({
      ...(doc.data() as VideoUrlFromDB),
    }));

    return videosList;
  } catch (e) {
    alert(`Помилка при отримані масиву плейлистів: ${e}`);
    return [];
  }
};

export default getVideosArray;
