'use client';

import { db } from '@/lib/database/firebase';
import useAuthStore from '@/store/useAuthStore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useEffect } from 'react';

const AuthInitializer = () => {
  const { setUser, setLoading } = useAuthStore();
  // const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const cookieUser = nookies.get(null).user_info;

    if (cookieUser) {
      const parsedUser = JSON.parse(cookieUser);
      return setUser(parsedUser);
    }

    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);

        nookies.destroy(null, 'user_info');
        setLoading(false);
        return;
      }

      if (!firebaseUser.emailVerified) {
        await signOut(auth);
        setUser(null);
        nookies.destroy(null, 'user_info');
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const user = {
          id: firebaseUser.uid,
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

        const cookieUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          biggerKid: user.biggerKid,
          littleChild: user.littleChild,
          avatar: userData.avatar || '',
          role: user.role,
          showSearch: userData.showSearch,
        };

        setUser(user);
        nookies.set(null, 'user_info', JSON.stringify(cookieUser), {
          maxAge: 2 * 24 * 60 * 60,
          path: '/',
          sameSite: 'None',
          secure: true,
        });
      } else {
        setUser(null);
        nookies.destroy(null, 'user_info');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setLoading, setUser]);

  return null;
};

export default AuthInitializer;
