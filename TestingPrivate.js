// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwre-a9D9tE1hJAivnxlcM2gAzeX1ErZk",
  authDomain: "rippe-production.firebaseapp.com",
  projectId: "rippe-production",
  storageBucket: "rippe-production.appspot.com",
  messagingSenderId: "774139530269",
  appId: "1:774139530269:web:15777bc66b975933a0caf4",
  measurementId: "G-WYP5W4Z8RL"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}
firebaseApp = getApp();

const db = getFirestore()
const analytics = getAnalytics(app);

export {db}