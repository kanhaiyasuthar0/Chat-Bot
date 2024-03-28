import "./App.css";
import Sidebar from "./components/main/SideBar";

import ChatMainPage from "./pages/chat";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
function App() {
  return (
    <>
      {/* <ChatMainPage /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatMainPage />} />
      </Routes>
    </>
  );
}

export default App;
