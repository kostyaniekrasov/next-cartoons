import { db } from '@/lib/database/firebase';
import updateUserData from '@/lib/user/updateUserData';
import { AvatarData, UpdateUserData, User } from '@/types';
import { handleAuthError } from '@/utils';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import nookies from 'nookies';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  updateUserProfile: (
    data: Partial<UpdateUserData>,
    selectedAvatar?: AvatarData,
  ) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  setLoading: (loading) => set(() => ({ loading })),
  setUser: (user) => {
    set(() => ({ user }));
    get().setLoading(false);
  },

  loginWithEmailAndPassword: (email, password) => {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      get().setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          if (!user.emailVerified) {
            throw new Error('Email not verified');
          }

          const loggedInUser = await getUserDataFromFirebase(user.uid);
          if (loggedInUser) {
            get().setUser(loggedInUser);
            saveUserCookie(loggedInUser);
          }
          resolve();
        })
        .catch((err) => {
          handleLoginError(err, reject, set);
        })
        .finally(() => get().setLoading(false));
    });
  },

  logout: async () => {
    const auth = getAuth();
    try {
      get().setLoading(true);
      await signOut(auth);
      get().setUser(null);
      nookies.destroy(null, 'user_info');
    } catch (err) {
      set(() => ({
        error: err instanceof Error ? err.message : 'Something went wrong',
      }));
    } finally {
      get().setLoading(false);
    }
  },

  updateUserProfile: async (data, selectedAvatar) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedData: UpdateUserData = { ...data };
    if (selectedAvatar) {
      updatedData.avatar = selectedAvatar;
    }

    try {
      get().setLoading(true);
      const updatedUser = { ...currentUser, ...updatedData };
      console.log('Updating user:', updatedUser);

      await updateUserData(currentUser.id, updatedData);
      get().setUser(updatedUser);
      saveUserCookie(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error, set);
    } finally {
      get().setLoading(false);
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser || !currentPassword || !newPassword) {
      setError(new Error('Invalid data provided'), set);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email ?? '',
        currentPassword,
      );
      get().setLoading(true);

      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      set(() => ({ error: null }));
    } catch (err) {
      setError(err, set);
      console.error('Failed to change password:', err);
    } finally {
      get().setLoading(false);
    }
  },
}));

const getUserDataFromFirebase = async (uid: string): Promise<User | null> => {
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

const saveUserCookie = (user: User) => {
  const cookieUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age,
    biggerKid: user.biggerKid,
    littleChild: user.littleChild,
    role: user.role,
    avatar: user.avatar || '',
    showSearch: user.showSearch,
  };

  nookies.set(null, 'user_info', JSON.stringify(cookieUser), {
    maxAge: 2 * 24 * 60 * 60,
    path: '/',
    sameSite: 'None',
    secure: true,
  });
};

const handleLoginError = (
  error: unknown,
  reject: (reason?: unknown) => void,
  set: typeof useAuthStore.setState,
) => {
  const errorMessage = handleAuthError(error);
  set(() => ({ error: errorMessage }));
  reject(new Error(errorMessage));
};

const setError = (error: unknown, set: typeof useAuthStore.setState) => {
  set(() => ({
    error: error instanceof Error ? error.message : 'Something went wrong',
  }));
};

export default useAuthStore;
