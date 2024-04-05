import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log("🚀 ~ signInWithGoogle ~ token:", token);
    // The signed-in user info.
    const user = result.user;

    // Check if user exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    // If user does not exist, add to Firestore
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
    console.log("User document written with ID: ", user.uid);
    return user;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

export const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
      // Optionally, redirect the user or reset app state here
    })
    .catch((error) => {
      // An error happened.
      console.error("Sign-out error:", error);
    });
};
