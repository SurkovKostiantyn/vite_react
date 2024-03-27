import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
//import { initializeAppCheck, ReCaptchaV3Provider  } from "firebase/app-check"; // reCaptcha v3

const firebaseConfig = {
    apiKey: "AIzaSyDej53L4lf07uexpgL7HGpPk8F6PRNVqbM",
    authDomain: "kn20-b22a3.firebaseapp.com",
    projectId: "kn20-b22a3",
    storageBucket: "kn20-b22a3.appspot.com",
    messagingSenderId: "108815732004",
    appId: "1:108815732004:web:13ba307cb46192e651f7b1",
    measurementId: "G-2HR10JPW9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider ('6LcjFaYpAAAAAF-L0JstQTJ4vaKwoyXu29qbi9ul'),
//     isTokenAutoRefreshEnabled: true
// });

export const database = getDatabase(app); // Realtime Database
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore

