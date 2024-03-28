import Sidebar from "@/components/main/SideBar";
import ChatWindow from "../../components/chat-components/ChatWindow";

const ChatMainPage = () => {
  return (
    <div className="flex flex-row h-screen text-white">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatMainPage;
