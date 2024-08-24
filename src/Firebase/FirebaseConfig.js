// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB1R0Fb5fTLv28-elErBzQVuoyFiZJPsw",
    authDomain: "job-task-again.firebaseapp.com",
    projectId: "job-task-again",
    storageBucket: "job-task-again.appspot.com",
    messagingSenderId: "920402979960",
    appId: "1:920402979960:web:4294dd1f2cd28180ec918d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app