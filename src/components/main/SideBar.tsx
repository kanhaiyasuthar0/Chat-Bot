import { handleSignOut } from "@/configs/firebaseService";
import { Button } from "../ui/button";
import { useAppContext } from "@/context/ChatBotContext";
import BotSelection from "../chat-components/BotSelection";
import Selector from "../chat-components/Selector";
import CropSelector from "../chat-components/CropSelector";
import { Link } from "react-router-dom";
import GptBotSelector from "../chat-components/GptBotSelector";

export default function Sidebar() {
  const { resetter } = useAppContext();

  return (
    <aside className="w-64 bg-[#171717] border-r border-[#171717]">
      <nav className="p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col align-middle justify-start gap-5 p-2 w-full min-w-[200px]">
          {/* Assuming you have state and handlers for these select elements */}
          {/* <BotSelection /> */}
          <GptBotSelector />
          {/* <Selector />
          <CropSelector /> */}
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              className="flex items-center py-2 px-4 border-[#171717] rounded-md text-white hover:bg-gray-600 transition duration-150 ease-in-out"
              to={"/dashboard"}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center py-2 px-4 border-[#171717]rounded-md text-white hover:bg-gray-600 transition duration-150 ease-in-out"
              to={"/chat"}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-6 0V6m0 4v4m4-4v4m-4 0h4"
                ></path>
              </svg>
              Chat
            </Link>
          </li>
          <Button
            onClick={() => {
              resetter();
              handleSignOut();
            }}
            className="p-2 w-full mt-5 text-left border-[#171717] rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign Out
          </Button>
        </ul>
      </nav>
    </aside>
  );
}
