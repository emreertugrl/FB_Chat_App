// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_OwMv6w7OO3Ks0SWUp_b9b0pM2tu8a7Y",
  authDomain: "fbchatapp-ed235.firebaseapp.com",
  projectId: "fbchatapp-ed235",
  storageBucket: "fbchatapp-ed235.appspot.com",
  messagingSenderId: "1036680134506",
  appId: "1:1036680134506:web:f8885e2caacafb9007ef13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth hizmetlerine erişebilmek için kurulum
export const auth = getAuth(app);

// Google Auth hizmetlerine kullanabilmek için kurulum
export const provider = new GoogleAuthProvider();

// firestore veritabanını kurulumunu yap
export const db = getFirestore(app);
