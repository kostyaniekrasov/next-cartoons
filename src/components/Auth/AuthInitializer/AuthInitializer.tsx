'use client';

import { db } from '@/lib/database/firebase';
import useAuthStore from '@/store/useAuthStore';
import { User } from '@/types';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import nookies from 'nookies';
import { useEffect } from 'react';

const saveUserCookie = (user: Partial<User>) => {
  nookies.set(null, 'user_info', JSON.stringify(user), {
    maxAge: 2 * 24 * 60 * 60,
    path: '/',
    sameSite: 'None',
    secure: true,
  });
};

const destroyUserCookie = () => {
  nookies.destroy(null, 'user_info');
};

const fetchUserData = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) return null;

  const userData = userDocSnap.data();
  return {
    id: uid,
    name: userData.name || 'No Name',
    email: userData.email || 'No Email',
    age: userData.age,
    biggerKid: userData.age >= 5,
    littleChild: userData.age < 4,
    watchLater: userData.watchLater || [],
    continueWatching: userData.continueWatching || [],
    role: userData.role || 'User',
    avatar: userData.avatar || '',
    showSearch: userData.showSearch,
  };
};

const AuthInitializer = () => {
  const { setUser, setInitialized, startLoading, stopLoading, user } =
    useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (user) {
        setInitialized(true);
        return;
      }

      const auth = getAuth();
      const cookieUser = nookies.get(null).user_info;

      if (cookieUser) {
        setUser(JSON.parse(cookieUser));
        setInitialized(true);

        return;
      }

      startLoading();

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser?.emailVerified) {
          await signOut(auth);
          setUser(null);
          destroyUserCookie();
        } else {
          const fetchedUser = await fetchUserData(firebaseUser.uid);
          if (fetchedUser) {
            setUser(fetchedUser);
            saveUserCookie({
              id: fetchedUser.id,
              name: fetchedUser.name,
              email: fetchedUser.email,
              age: fetchedUser.age,
              biggerKid: fetchedUser.biggerKid,
              littleChild: fetchedUser.littleChild,
              avatar: fetchedUser.avatar,
              role: fetchedUser.role,
              showSearch: fetchedUser.showSearch,
            });
          } else {
            setUser(null);
            destroyUserCookie();
          }
        }
        stopLoading();
      });

      return () => unsubscribe();
    };

    initializeAuth();
    stopLoading();
  }, [user, setUser, setInitialized, startLoading, stopLoading]);

  return null;
};

export default AuthInitializer;
