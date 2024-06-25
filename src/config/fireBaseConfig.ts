import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK4IIfuOkwNTMYgA0Z-gHKUfLxejRlpek",
  authDomain: "blog-dc3a5.firebaseapp.com",
  projectId: "blog-dc3a5",
  storageBucket: "blog-dc3a5.appspot.com",
  messagingSenderId: "284326991844",
  appId: "1:284326991844:web:37271108516ea80f5019f1",
  measurementId: "G-XR4H702M9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
