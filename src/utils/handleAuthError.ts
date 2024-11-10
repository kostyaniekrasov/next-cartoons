import { FirebaseError } from 'firebase/app';

const handleAuthError = (err: unknown) => {
  let errorMessage = 'Something went wrong';

  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        errorMessage =
          'Invalid credentials. Please check your email and password.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format.';
        break;
      case 'auth/too-many-requests':
        errorMessage =
          'Too many failed login attempts. Please try again later.';
        break;
      default:
        console.error('Firebase error:', err);
    }
  } else if (err instanceof Error && err.message === 'Email not verified') {
    errorMessage = 'Email not verified';
  } else {
    console.error('Unexpected error:', err);
  }

  return errorMessage;
};

export default handleAuthError;
