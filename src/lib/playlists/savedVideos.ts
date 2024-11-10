import { Playlist } from '@/types/VideoData';
import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../database/firebase';

const addToWatchLater = async (userId: string, playlist: Playlist) => {
  const userRef = doc(db, 'users', userId);

  const userDocSnap = await getDoc(userRef);

  if (userDocSnap.exists()) {
    await updateDoc(userRef, {
      watchLater: arrayUnion(playlist),
    });
  } else {
    await setDoc(userRef, {
      watchLater: [playlist],
      continueWatching: [],
    });
  }
};

const removeFromWatchLater = async (userId: string, playlistId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.error('Документ користувача не знайдено');
    return;
  }

  const watchLater = userSnap.data()?.watchLater || [];

  if (!Array.isArray(watchLater)) {
    console.error('continueWatching не є масивом');
    return;
  }

  const updatedWL = watchLater.filter(
    (cwItem: Playlist) => cwItem.id !== playlistId,
  );

  await updateDoc(userRef, {
    watchLater: updatedWL,
  });
};

const getUserLists = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();

    const watchLater = Array.isArray(data.watchLater) ? data.watchLater : [];

    return {
      watchLater,
    };
  } else {
    console.log('User does not exist');
    return {
      watchLater: [],
    };
  }
};

const removeAllVideosFromWatchLater = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      watchLater: deleteField(),
    });
  } catch (error) {
    console.error("Помилка при видаленні списку 'Продовжити перегляд':", error);
  }
};

export {
  addToWatchLater,
  getUserLists,
  removeFromWatchLater,
  removeAllVideosFromWatchLater,
};
