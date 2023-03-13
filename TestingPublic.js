// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJKALeHGc533m8ljexw5-4KgToorcfgrs",
  authDomain: "rippe-testing.firebaseapp.com",
  projectId: "rippe-testing",
  storageBucket: "rippe-testing.appspot.com",
  messagingSenderId: "681438990630",
  appId: "1:681438990630:web:6b3ca125efaad98d5031e7",
  measurementId: "G-C0SZY6YMYQ"
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