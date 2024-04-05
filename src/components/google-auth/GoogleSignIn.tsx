import axios from "axios"; // Ensure axios is imported if you're using it directly
import { signInWithGoogle } from "@/configs/firebaseService";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
// import { useAppContext } from "@/context/ChatBotContext";
import urlConstants from "@/utils/urlConstant";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  // const { setUser, user } = useAppContext(); // Assuming useAppContext provides a setUser method

  // Define createUser as a regular async function, not an arrow function inside a function.
  const createUser = async (user: { email: string; displayName: string }) => {
    if (!user) {
      console.error("User details not found");
      return false;
    }

    const { email, displayName: username } = user;

    try {
      const response = await axios.post(
        `${urlConstants.baseUrl}/ai/user/`,
        { email, username },
        {
          headers: {
            "Content-Type": "application/json",
            // Specify other necessary headers
          },
        }
      );

      console.log("User created:", response.data);
      localStorage.setItem("userId", response.data.id);
      // Handle successful user creation, if needed
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
      return false;
    }
  };

  const handleSignIn = async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      console.log("🚀 ~ handleSignIn ~ firebaseUser:", firebaseUser);
      // Ensure firebaseUser, firebaseUser.email, and firebaseUser.displayName are not null
      if (firebaseUser && firebaseUser.email && firebaseUser.displayName) {
        // Now TypeScript knows firebaseUser.email and firebaseUser.displayName are strings, not null
        const { email, displayName } = firebaseUser;
        const createUserResponse = await createUser({ email, displayName });
        if (createUserResponse) {
          navigate("/chat");
        } else {
          navigate("/");
        }
      } else {
        console.error(
          "No user details returned from Google sign-in or missing email/displayName"
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-96 bg-gray-900">
      <Button
        onClick={handleSignIn}
        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors text-shadow"
      >
        {/* SVG icon and text here, considering a light-colored icon for better visibility */}
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleSignIn;
