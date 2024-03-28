import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/configs/firebaseConfig"; // Your Firebase configuration file
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// Define the context value's type
interface AppContextType {
  theme: string;
  toggleTheme: (str: string) => void;
  language: string;
  setLanguage: (str: string) => void;
  bot: string;
  setBot: (str: string) => void;
  user: User | null;
}

interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

// Create the context with an initial undefined value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Props type for the provider component
interface AppProviderProps {
  children: ReactNode;
}

// Custom hook for consuming context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [bot, setBot] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🚀 ~ unsubscribe ~ firebaseUser:", firebaseUser);
      if (firebaseUser) {
        // User is signed in, see docs for a list of available properties
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            photoURL: firebaseUser.photoURL || "",
          });
          navigate("/chat"); // Navigate to the chat page
        }
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [navigate]);

  const contextValue = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    bot,
    setBot,
    user,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
