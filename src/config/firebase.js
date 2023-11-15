// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRG0jJVV-FzGaWhc5zfia5ALDqDL71wnU",
  authDomain: "taller2gimnasio.firebaseapp.com",
  projectId: "taller2gimnasio",
  storageBucket: "taller2gimnasio.appspot.com",
  messagingSenderId: "975581180486",
  appId: "1:975581180486:web:c141b2731da204d5ec1047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)