// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKkNb26xQsSwmjDHmW0kS9eHMwjixVi9o",
  authDomain: "medtalk-b3e11.firebaseapp.com",
  projectId: "medtalk-b3e11",
  storageBucket: "medtalk-b3e11.appspot.com",
  messagingSenderId: "1068625818534",
  appId: "1:1068625818534:web:f506882478b2fe3eeb5567",
  measurementId: "G-L7YVVNJ42Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
export const meetingsRef = collection (firebaseDB, "meetings")