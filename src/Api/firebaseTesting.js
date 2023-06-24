import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import authorized from '../../Authorize'

const firebaseConfigProduction = {
  apiKey: authorized.FIREBASE_API_KEY,
  authDomain: authorized.FIREBASE_AUTH_DOMAIN,
  projectId: authorized.FIREBASE_PROJECT_ID,
  storageBucket: authorized.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: authorized.FIREBASE_MESSAGING_SENDER_ID,
  appId: authorized.FIREBASE_APP_ID,
  measurementId: authorized.FIREBASE_MEASUREMENT_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfigProduction);
}
firebaseApp = getApp();

const db = getFirestore()

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {db, auth}