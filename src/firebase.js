import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD6zc72rqF2pe2WD24G04HjBMwpQaL0UeA",
  authDomain: "to-do-app-b2a8e.firebaseapp.com",
  projectId: "to-do-app-b2a8e",
  storageBucket: "to-do-app-b2a8e.appspot.com",
  messagingSenderId: "339865548156",
  appId: "1:339865548156:web:1c6742864f2dc2955a60f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
