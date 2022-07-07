import firebase from "firebase/compat/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQuX1_XsPlK0qdNmj61qaWCmt8lf2jXxw",
  authDomain: "chatapp-4e17d.firebaseapp.com",
  projectId: "chatapp-4e17d",
  storageBucket: "chatapp-4e17d.appspot.com",
  messagingSenderId: "359593426705",
  appId: "1:359593426705:web:a4e5e51a3369cca7ba16b0",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = getAuth(app);

export {
  firebase,
  firebaseConfig,
  db,
  auth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
};
