// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "book-review-mern.firebaseapp.com",
  projectId: "book-review-mern",
  storageBucket: "book-review-mern.appspot.com",
  messagingSenderId: "50335327183",
  appId: "1:50335327183:web:4c4e97dd58fbe9c64f28ba",
  //measurementId: "G-7J1P4TJV7W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);