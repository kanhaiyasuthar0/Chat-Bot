import "./App.css";

import ChatMainPage from "./pages/chat";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
// import { useNavigate } from "react-router-dom";
function App() {
  // const navigate = useNavigate();

  return (
    <>
      {/* <ChatMainPage /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatMainPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
