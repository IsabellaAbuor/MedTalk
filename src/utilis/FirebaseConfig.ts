// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOgHxtBpd9lvJoK3oNfgvNbqwhpa9Ok0g",
  authDomain: "client-d0c1e.firebaseapp.com",
  projectId: "client-d0c1e",
  storageBucket: "client-d0c1e.appspot.com",
  messagingSenderId: "771161689187",
  appId: "1:771161689187:web:1cec5a30f740375b65bc56",
  measurementId: "G-793K0C41SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");