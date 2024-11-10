// lib/getServerUser.ts
import { db } from '@/lib/database/firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import nookies from 'nookies';

export async function getUserData() {
  try {
    const cookieUser = cookies().get('user_info');
    if (cookieUser) {
      return JSON.parse(cookieUser.value);
    }

    const auth = getAuth();
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    if (!firebaseUser.emailVerified) {
      await auth.signOut();
      nookies.destroy(null, 'user_info');
      return null;
    }

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      nookies.destroy(null, 'user_info');
      return null;
    }

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

    const cookieUserData = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      biggerKid: user.biggerKid,
      littleChild: user.littleChild,
      role: user.role,
    };

    nookies.set(null, 'user_info', JSON.stringify(cookieUserData), {
      maxAge: 2 * 24 * 60 * 60,
      path: '/',
      sameSite: 'None',
      secure: true,
    });

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
