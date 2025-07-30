import { initializeApp } from "firebase/app";

//importaciones para gestionar usuarios
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

//importaciones para la base de datos
import { getFirestore, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    // Firebase app
    db,
    auth,
    // Firebase authentication functions
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // Firestore database functions
    doc,
    setDoc,
    getDoc,
    getDocs
};
