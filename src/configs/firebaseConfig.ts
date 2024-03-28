// src/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5akIJj-3104FQUvYQErqpQsY43SpiZKw",
  authDomain: "digital-green-chat-bot.firebaseapp.com",
  projectId: "digital-green-chat-bot",
  storageBucket: "digital-green-chat-bot.appspot.com",
  messagingSenderId: "676928946744",
  appId: "1:676928946744:web:f2910b626042dde82a1ccd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // Google token
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
