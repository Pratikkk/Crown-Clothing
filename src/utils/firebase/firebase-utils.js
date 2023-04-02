// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCn97doq5_BHI4OE9UcpiDbhFgvINA9YMs',
  authDomain: 'crwn-clothing-db-73f91.firebaseapp.com',
  projectId: 'crwn-clothing-db-73f91',
  storageBucket: 'crwn-clothing-db-73f91.appspot.com',
  messagingSenderId: '1023956494784',
  appId: '1:1023956494784:web:eb86ec02b63ba15d940025',
  measurementId: 'G-JZC8NQCLPK',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, userData = {}) => {
  if (!userAuth) {
    throw new Error('"User authentication object is missing');
  }

  const { uid, displayName, email } = userAuth;
  const userDocRef = doc(db, 'users', uid);

  try {
    await setDoc(
      userDocRef,
      {
        displayName,
        email,
        createdAt: new Date(),
        ...userData,
      },
      { merge: true }
    );
  } catch (error) {
    console.log('error creating the user', error.message);
    throw new Error('Error creating user document');
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
