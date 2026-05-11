// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoshpOJDwcbUB0IYROePu60LPamo8NdQ8",
  authDomain: "assignment-11-85789.firebaseapp.com",
  projectId: "assignment-11-85789",
  storageBucket: "assignment-11-85789.firebasestorage.app",
  messagingSenderId: "366314292312",
  appId: "1:366314292312:web:05bfdb27fa6e6c477eb62d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
