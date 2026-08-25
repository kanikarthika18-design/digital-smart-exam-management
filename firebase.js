// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYcXNsGdLfzDIKMa0Df06wh0_S8LG4d5s",
    authDomain: "digitalsmartexam.firebaseapp.com",
    projectId: "digitalsmartexam",
    storageBucket: "digitalsmartexam.firebasestorage.app",
    messagingSenderId: "786167693319",
    appId: "1:786167693319:web:ae1b7591f4e0976fd0eaa2",
    measurementId: "G-07FHPW66ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);