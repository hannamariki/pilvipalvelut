// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMwHeSWcXfqj0F6DQf-qUiAj3AMy19Fao",
  authDomain: "pilvi-vite-ab61a.firebaseapp.com",
  projectId: "pilvi-vite-ab61a",
  storageBucket: "pilvi-vite-ab61a.firebasestorage.app",
  messagingSenderId: "1043318426710",
  appId: "1:1043318426710:web:3ad5596a49b8c2e531fff7",
  measurementId: "G-2DTQQQ687K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);