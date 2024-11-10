import { ContinueWatching } from '@/types';
import { child, get, getDatabase, ref } from 'firebase/database';
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../database/firebase';

const saveProgress = async (
  userId: string,
  playlistId: string,
  videoId: string,
  progress: number,
) => {
  const userRef = doc(db, 'users', userId);
  const userDocSnap = await getDoc(userRef);

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    const continueWatching = Array.isArray(data.continueWatching)
      ? data.continueWatching
      : [];

    const videoIndex = continueWatching.findIndex(
      (item) => item.playlistId === playlistId,
    );

    if (videoIndex !== -1) {
      continueWatching[videoIndex].videoId = videoId;
      continueWatching[videoIndex].progress = progress;
    } else {
      continueWatching.push({
        playlistId,
        videoId,
        progress,
      });
    }
    await updateDoc(userRef, {
      continueWatching,
    });
  } else {
    await setDoc(userRef, {
      continueWatching: [
        {
          playlistId,
          videoId,
          progress,
        },
      ],
    });
  }
};

const getProgress = async (
  userId: string,
  playlistId: string,
  videoId: string,
) => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(
    child(dbRef, `users/${userId}/continueWatching/${playlistId}/${videoId}`),
  );
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

const removePlaylistFromCW = async (userId: string, playlistId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.error('Документ користувача не знайдено');
    return;
  }

  const continueWatching = userSnap.data()?.continueWatching || [];

  if (!Array.isArray(continueWatching)) {
    console.error('continueWatching не є масивом');
    return;
  }

  const updatedCW = continueWatching.filter(
    (cwItem: ContinueWatching) => cwItem.playlistId !== playlistId,
  );

  await updateDoc(userRef, {
    continueWatching: updatedCW,
  });
};

const removeAllVideosFromCW = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      continueWatching: deleteField(),
    });
  } catch (error) {
    console.error("Помилка при видаленні списку 'continueWatching':", error);
  }
};

const getClList = async (userId: string): Promise<ContinueWatching[]> => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();

    const continueWatching = Array.isArray(data.continueWatching)
      ? (data.continueWatching as ContinueWatching[])
      : [];

    return continueWatching;
  } else {
    console.log('User does not exist');
    return [];
  }
};

export {
  saveProgress,
  getProgress,
  removePlaylistFromCW,
  getClList,
  removeAllVideosFromCW,
};
