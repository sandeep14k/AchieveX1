import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign up with email and password
  async function signup(email, password, profileData) {
    try {
      setError('');
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        ...profileData,
        email: user.email,
        role: 'student',
        enrolled: false,
        created_at: serverTimestamp()
      });
      
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Sign in with email and password
  async function login(email, password) {
    try {
      setError('');
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, create if not
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          profilePhotoUrl: user.photoURL,
          role: 'student',
          enrolled: false,
          created_at: serverTimestamp()
        });
      }
      
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Sign in with phone number
  async function signInWithPhone(phoneNumber, appVerifier) {
    try {
      setError('');
      return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Setup reCAPTCHA for phone auth
  function setupRecaptcha(elementId) {
    return new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  }

  // Sign out
  async function logout() {
    try {
      setError('');
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Reset password
  async function resetPassword(email) {
    try {
      setError('');
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Fetch user profile from Firestore
  async function fetchUserProfile(uid) {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  async function updateProfile(uid, updates) {
    try {
      setError('');
      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, updates, { merge: true });
      
      // Refresh user profile
      const updatedProfile = await fetchUserProfile(uid);
      setUserProfile(updatedProfile);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Check if user has specific role
  function hasRole(role) {
    return userProfile?.role === role;
  }

  // Check if user is enrolled
  function isEnrolled() {
    return userProfile?.enrolled === true;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithPhone,
    setupRecaptcha,
    updateProfile,
    hasRole,
    isEnrolled,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}