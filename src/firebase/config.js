// Firebase Configuration
// Replace these values with your actual Firebase project credentials

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC5O3RVD8yVkqXO8iNNSsPGAhz09XF7YAU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "achievex-3f959.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "achievex-3f959",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "achievex-3f959.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "627057638046",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:627057638046:web:84b76f16c18c627ef2998f",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-6TFGNZWJTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;