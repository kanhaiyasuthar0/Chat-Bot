import "./App.css";

import ChatMainPage from "./pages/chat";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { useAppContext } from "./context/ChatBotContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "./components/loaders/PageLoader";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { user, loader } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {/* loading loader for page */}
      {loader.page ? <PageLoader /> : null}

      {/* all the available routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatMainPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
