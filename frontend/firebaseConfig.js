// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdbnhb-M3tp7At2nP62_5UAO1JFUFxrio",
  authDomain: "loginfetin.firebaseapp.com",
  projectId: "loginfetin",
  storageBucket: "loginfetin.firebasestorage.app",
  messagingSenderId: "608924512048",
  appId: "1:608924512048:web:7ef3e29a712ab4bc5c22f5",
  measurementId: "G-1V5C4YHBXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);