// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLu9vjas-n_p57btg5FGPZnmlwLuqCYt4",
  authDomain: "todolist-9f32c.firebaseapp.com",
  databaseURL: "https://todolist-9f32c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-9f32c",
  storageBucket: "todolist-9f32c.appspot.com",
  messagingSenderId: "74415335143",
  appId: "1:74415335143:web:fe89d364bcd9fe20c56442",
  measurementId: "G-LYJLYVQE8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

export { db };