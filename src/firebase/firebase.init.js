// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAy2r44q3VXsZQ_WAsYGT4MXZz3J8xP0-U",
    authDomain: "common-users.firebaseapp.com",
    projectId: "common-users",
    storageBucket: "common-users.appspot.com",
    messagingSenderId: "90636055024",
    appId: "1:90636055024:web:0f36346a7f07784e1eed35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;