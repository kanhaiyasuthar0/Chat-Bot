import React, { useState, FormEvent, useEffect, useRef } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
import { useAppContext } from "@/context/ChatBotContext";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ResponseFormatter from "./ResponseFormatter";
import ComponentLoader from "../loaders/ComponentLoader";
// import OutlinedInput from "@mui/material/OutlinedInput";
import { IoSend } from "react-icons/io5";
import AssistComponent from "../generics/AssistComponent";
import urlConstants from "@/utils/urlConstant";
// Adjusting the IMessage interface to encapsulate a chat exchange
interface IChatExchange {
  id: number;
  query: string;
  response?: {
    youtube_url: string;
    query_response: string;
    condensed_question: string;
    follow_up_questions: string[];
    query: string;
  }; // Optional since the response will be populated later
  loading?: boolean;
}

const ChatComponent: React.FC = () => {
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatExchanges, setChatExchanges] = useState<IChatExchange[]>([]);
  const [readyForQuery, setReadyForQuery] = useState(false); // if false bot is not ready for next query
  const [inputText, setInputText] = useState("");
  const { callLoader, loader, user, crop, language, bot } = useAppContext();

  const bottomRef = useRef<null | HTMLDivElement>(null);

  async function getResponse(inputText: string) {
    console.log(crop, language, bot, " crop, language, bot");
    const newExchange: IChatExchange = {
      id: chatExchanges.length + 1,
      query: inputText,
      loading: true, // Initially set to loading
    };

    setChatExchanges([...chatExchanges, newExchange]);
    // Define the shape of filters with an index signature
    interface Filters {
      [key: string]: string | undefined; // This allows any string as a key, and string as a value
    }
    const payload: {
      query: string;
      email_id: string | null;
      chain: boolean;
      filters: Filters;
    } = {
      query: inputText,
      email_id: localStorage.getItem("userId"),
      chain: true,
      filters: {},
    };

    // Conditionally add `sub_category` if `crop` is defined and not empty
    if (crop) {
      payload.filters["sub_category"] = crop;
    }

    // Conditionally add `state` if `state` is defined and not empty
    // if (state) {
    //   payload.filters["state"] = state;
    // }

    try {
      const response = await axios.post(
        `${urlConstants.baseUrl}/ai/chat/chat_api/`,
        payload
      );
      console.log("🚀 ~ getResponse ~ response:", response);

      // Update the latest exchange with the response
      setChatExchanges((currentExchanges) => {
        // Make a shallow copy of the array to ensure immutability
        const updatedExchanges = [...currentExchanges];
        // Check if there are any exchanges and update the last one
        if (updatedExchanges.length > 0) {
          const lastExchange = updatedExchanges.at(-1)!;
          updatedExchanges[updatedExchanges.length - 1] = {
            ...lastExchange,
            response: response?.data.output,
            loading: false,
          };
        }
        return updatedExchanges;
      });
    } catch (error) {
      setTimeout(() => {
        setChatExchanges((currentExchanges) => {
          // Make a shallow copy of the array to ensure immutability
          const updatedExchanges = [...currentExchanges];
          // Check if there are any exchanges and update the last one
          if (updatedExchanges.length > 0) {
            const lastExchange = updatedExchanges.at(-1)!;
            updatedExchanges[updatedExchanges.length - 1] = {
              ...lastExchange,
              response: {
                youtube_url: "",
                query_response: "SOMETHING WENT WRONG",
                condensed_question: "What can you tell me about wheat blast?",
                follow_up_questions: [],
                query: "Tell me about wheat blast",
              },
              loading: false,
            };
          }
          // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          return updatedExchanges;
        });
      }, 3000);
      console.error("Error sending message:", error);
      // Optionally handle error state here
    }
    // Wait for the next render to complete before scrolling
    setTimeout(() => {
      if (bottomRef) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return;
    setInputText(""); // Clear input field
    setReadyForQuery(false);
    await getResponse(inputText);
    setReadyForQuery(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [chatExchanges]);

  useEffect(() => {
    callLoader("component", true);
    setTimeout(() => {
      callLoader("component", false);
      setReadyForQuery(true);
    }, 4000);
  }, []);

  return (
    <div className="flex relative flex-col font-reddit w-full">
      {/* Main content area */}
      {/* <div className="sticky top-0 z-10 bg-[#212121] dark:bg-gray-800 text-white shadow-md py-1 px-6">
        <h6 className="text-lg font-semibold">Chat</h6>
      </div> */}
      <div className="flex h-[640px] flex-col min-w-full m-auto">
        {/* Existing content from your snippet */}
        <main className="pr-[15%] pl-0 pt-10 pb-10 h-full m-auto overflow-y-auto space-y-1 w-[100%] mr-auto hide-scrollbar bg-[#212121] dark:bg-gray-900">
          {loader.component ? (
            <ComponentLoader />
          ) : chatExchanges.length > 0 ? (
            chatExchanges.map((exchange) => (
              <div key={exchange.id} className="w-full py-2 my-2 text-white">
                {/* User query */}
                <div className="text-left">
                  <div className=" w-full flex gap-5 align-middle dark:bg-gray-800  dark:text-gray-300 rounded-lg px-4 py-2 shadow">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {exchange.query}
                  </div>
                </div>
                {/* Bot response */}
                {exchange.loading ? (
                  <div className="text-left mt-2">
                    <div className="w-full flex gap-5 align-middle  dark:bg-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 shadow animate-pulse">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>FC</AvatarFallback>
                      </Avatar>{" "}
                      Replying...
                    </div>
                  </div>
                ) : (
                  <>
                    <ResponseFormatter
                      exchange={exchange.response}
                      getResponse={getResponse}
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <AssistComponent />
          )}
          <div ref={bottomRef} />

          <div className="absolute w-[83.5%] bottom-0 left-0 bg-[#212121] m-auto dark:bg-[#212121] flex justify-start">
            <form
              onSubmit={handleSendMessage}
              className="flex ml-2 justify-start space-x-2 w-full" // Reduced width and centering
            >
              <div className="flex w-full border rounded-xl border-white p-1">
                <input
                  className="main-input focus-visible:ring-0  focus-visible:--tw-ring-offset-width: 2px; flex-1 p-2 border-none text-white focus:border-none focus:ring-0 focus:outline-none bg-[#212121] transition-colors"
                  id="message"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={handleChange}
                  autoComplete="off"
                  autoFocus={false}
                />

                <button
                  type="submit"
                  className="px-5 py-1 bg-[#212121] hover:bg-[#1a1a1a]  outline-none text-white rounded-full disabled:bg-[#212121] focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  disabled={!inputText.trim() || !readyForQuery}
                >
                  <IoSend />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatComponent;
