// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOStpMToqXP-EeQsYsE2xPZ25nZo8a30o",
    authDomain: "financeapp-13c3b.firebaseapp.com",
    projectId: "financeapp-13c3b",
    storageBucket: "financeapp-13c3b.appspot.com",
    messagingSenderId: "822225563429",
    appId: "1:822225563429:web:dd0c9769db2a8ca7ee34cc"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
//const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const FIRESTORE_DB = getFirestore(FIREBASE_APP)


export { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB };