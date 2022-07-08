import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQuX1_XsPlK0qdNmj61qaWCmt8lf2jXxw",
  authDomain: "chatapp-4e17d.firebaseapp.com",
  projectId: "chatapp-4e17d",
  storageBucket: "chatapp-4e17d.appspot.com",
  messagingSenderId: "359593426705",
  appId: "1:359593426705:web:a4e5e51a3369cca7ba16b0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  firebaseConfig,
  auth,
  db,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
};
