// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKmLk8jpHxUkSOvD9FKkaKlM_1qhl98KM",
  authDomain: "headache-tracker-app.firebaseapp.com",
  projectId: "headache-tracker-app",
  storageBucket: "headache-tracker-app.firebasestorage.app",
  messagingSenderId: "94690825397",
  appId: "1:94690825397:web:65c6eec147b023a24b5afc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);