import { signInWithGoogle } from "@/configs/firebaseService";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-96 bg-gray-900 dark:bg-gray-900">
      <Button
        onClick={async () => {
          try {
            await signInWithGoogle();
            navigate("/chat");
          } catch (error) {
            console.error("Error signing in with Google", error);
            // Optionally handle the error, e.g., show an error message
          }
        }}
        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        <svg
          className="mr-2 -ml-1 w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21.35 11.1h-9.25v3.4h5.3c-.2 1.15-1.3 3.4-5.3 3.4-3.2 0-5.8-2.65-5.8-5.8s2.6-5.8 5.8-5.8c1.8 0 3 0.8 3.7 1.45l2.45-2.45c-1.6-1.5-3.7-2.4-6.15-2.4-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25c5.35 0 8.9-3.8 8.9-9.25 0-.65-0.05-1.15-0.15-1.65z" />
        </svg>
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleSignIn;
