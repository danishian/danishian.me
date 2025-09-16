// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFc25crzJpqoCsVljRi6uSTrroPLuCAkw",
  authDomain: "danishian-me.firebaseapp.com",
  projectId: "danishian-me",
  storageBucket: "danishian-me.firebasestorage.app",
  messagingSenderId: "28609008151",
  appId: "1:28609008151:web:d89ac3e648d56e3f288252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);