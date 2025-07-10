// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0VrzodcWxJq062GmGmPYLXoMaFaBM9CA",
  authDomain: "auth-toksped.firebaseapp.com",
  projectId: "auth-toksped",
  storageBucket: "auth-toksped.firebasestorage.app",
  messagingSenderId: "1073030562427",
  appId: "1:1073030562427:web:6e7147f34fc780e14ed8de",
  measurementId: "G-133Y8YKZWL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
const db = getFirestore(app);

export { db };
