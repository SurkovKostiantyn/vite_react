// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
