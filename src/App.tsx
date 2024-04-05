import "./App.css";

import ChatMainPage from "./pages/chat";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { useAppContext } from "./context/ChatBotContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "./components/loaders/PageLoader";
import { useEffect } from "react";
// import DashboardMainPage from "./pages/dashboard";
import LayoutWithSidebar from "./components/Layout/LayoutWithSidebar";
import Navbar from "./components/main/Navbar";
import ChatComponent from "./components/chat-components/ChatWindow";
// import PersistentDrawer from "./components/main/CollapsibleSidebar";

function App() {
  const navigate = useNavigate();
  const { user, loader } = useAppContext();
  console.log("🚀 ~ App ~ loader:", loader);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      {/* loading loader for page */}
      {loader.page ? <PageLoader /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <LayoutWithSidebar>
              <ChatMainPage />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/dashboard"
          element={
            // <LayoutWithSidebar>
            //   <DashboardMainPage />
            // </LayoutWithSidebar>

            <ChatComponent />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* all the available routes */}
    </>
  );
}

export default App;
