// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// htmlFor Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Po5pufX5t3lREZ52oPuC0Tle2Acxjww",
  authDomain: "usersmangementreact.firebaseapp.com",
  projectId: "usersmangementreact",
  storageBucket: "usersmangementreact.appspot.com",
  messagingSenderId: "948310553292",
  appId: "1:948310553292:web:1c129524adf2ea8e5b4869",
  measurementId: "G-0H45XEL6RL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
