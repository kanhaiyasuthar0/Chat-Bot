// src/SignIn.js
import { signInWithGoogle } from "@/configs/firebaseService";
// import React from "react";

const GoogleSignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
