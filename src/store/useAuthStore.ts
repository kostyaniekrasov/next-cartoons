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
  isInitialized: boolean;
  error: string | null;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  updateUserProfile: (
    data: Partial<UpdateUserData>,
    selectedAvatar?: AvatarData,
  ) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  startLoading: () => void;
  stopLoading: () => void;
  setInitialized: (initialized: boolean) => void;
}

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  loading: true,
  isInitialized: false,
  error: null,

  startLoading: () => set(() => ({ loading: true })),
  stopLoading: () => set(() => ({ loading: false })),
  setUser: (user) => {
    set(() => ({ user, isInitialized: true }));
  },
  setInitialized: (initialized) => set(() => ({ isInitialized: initialized })),

  loginWithEmailAndPassword: async (email, password) => {
    const auth = getAuth();
    get().startLoading();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error('Email not verified');
      }

      const loggedInUser = await getUserDataFromFirebase(user.uid);
      if (loggedInUser) {
        get().setUser(loggedInUser);
        saveUserCookie(loggedInUser);
      }
      get().setInitialized(true);
    } catch (err) {
      handleLoginError(err, set);
    } finally {
      get().stopLoading();
    }
  },

  logout: async () => {
    const auth = getAuth();
    get().startLoading();
    try {
      await signOut(auth);
      get().setUser(null);
      nookies.destroy(null, 'user_info');
      get().setInitialized(true);
    } catch (err) {
      setError(err, set);
    } finally {
      get().stopLoading();
    }
  },

  updateUserProfile: async (data, selectedAvatar) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedData: UpdateUserData = { ...data };
    if (selectedAvatar) {
      updatedData.avatar = selectedAvatar;
    }

    get().startLoading();
    try {
      const updatedUser = { ...currentUser, ...updatedData };
      await updateUserData(currentUser.id, updatedData);

      get().setUser(updatedUser);
      saveUserCookie(updatedUser);
    } catch (error) {
      setError(error, set);
    } finally {
      get().stopLoading();
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    get().startLoading();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser || !currentPassword || !newPassword) {
      setError(new Error('Invalid data provided'), set);
      get().stopLoading();

      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email ?? '',
        currentPassword,
      );

      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      set(() => ({ error: null }));
    } catch (err) {
      setError(err, set);
    } finally {
      get().stopLoading();
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
  const cookieUser = nookies.get(null).user_info;
  if (
    !cookieUser ||
    JSON.stringify(JSON.parse(cookieUser)) !== JSON.stringify(user)
  ) {
    nookies.set(null, 'user_info', JSON.stringify(user), {
      maxAge: 2 * 24 * 60 * 60,
      path: '/',
      sameSite: 'None',
      secure: true,
    });
  }
};

const handleLoginError = (
  error: unknown,
  set: typeof useAuthStore.setState,
) => {
  const errorMessage = handleAuthError(error);
  set(() => ({ error: errorMessage }));
  throw errorMessage;
};

const setError = (error: unknown, set: typeof useAuthStore.setState) => {
  const errorMessage =
    error instanceof Error ? error.message : 'Something went wrong';
  set(() => ({
    error: errorMessage,
  }));

  throw errorMessage;
};

export default useAuthStore;
