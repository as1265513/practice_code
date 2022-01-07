// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import "firebase/firestore"

// import { getAnalytics } from "firebase/analytics";
// import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACb72bAFGcL-f3mZA0xcvODVFx08uXZg0",
  authDomain: "electron-chat-app-4ebed.firebaseapp.com",
  projectId: "electron-chat-app-4ebed",
  storageBucket: "electron-chat-app-4ebed.appspot.com",
  messagingSenderId: "211457167787",
  appId: "1:211457167787:web:ad433fea34d81c3b4282ee",
  measurementId: "G-62RY0FM910"
};
// Initialize Firebase

export const { Timestamp } = firebase.firestore;

export const db = firebase.initializeApp(firebaseConfig).firestore()


// const analytics = getAnalytics(app);