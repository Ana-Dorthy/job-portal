// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN8vhfXxIzHFU6Pi7cam3y3xKm60wY3s0",
  authDomain: "mern-proj-46333.firebaseapp.com",
  projectId: "mern-proj-46333",
  storageBucket: "mern-proj-46333.appspot.com",
  messagingSenderId: "132304514812",
  appId: "1:132304514812:web:55c2a06fe90a3253de3179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;