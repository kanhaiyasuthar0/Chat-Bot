import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppContext } from "@/context/ChatBotContext";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ResponseFormatter from "./ResponseFormatter";
import ComponentLoader from "../loaders/ComponentLoader";
import BotSelection from "./BotSelection";
import Selector from "./Selector";
import CropSelector from "./CropSelector";

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

  const [inputText, setInputText] = useState("");
  const { callLoader, loader, user, crop, language, bot } = useAppContext();

  const bottomRef = useRef<null | HTMLDivElement>(null);
  // const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!inputText.trim()) return;

  //   const newMessage: IMessage = {
  //     id: messages.length + 1,
  //     text: inputText,
  //     sender: "user",
  //   };
  //   const newSystemMessage: IMessage = {
  //     id: messages.length + 2,
  //     text: `Sure ${inputText}`,
  //     sender: "system",
  //     loading: true,
  //   };
  //   setMessages([...messages, newMessage, newSystemMessage]);
  //   setInputText(""); // Clear input after sending
  // };

  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       // Possibly show some feedback that the text has been copied.
  //       console.log("Text copied to clipboard");
  //     })
  //     .catch((err) => {
  //       console.error("Failed to copy text: ", err);
  //     });
  // };

  async function getResponse(inputText: string) {
    console.log(crop, language, bot, " crop, language, bot");
    const newExchange: IChatExchange = {
      id: chatExchanges.length + 1,
      query: inputText,
      loading: true, // Initially set to loading
    };

    setChatExchanges([...chatExchanges, newExchange]);

    try {
      const response = await axios.post("https://your-backend-api.com/query", {
        query: inputText, // Send query
        chain: true,
        filters: {},
      });
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
            response: {
              youtube_url: "https://www.youtube.com/watch?v=oLc2P7Zrpqc",
              query_response:
                "Wheat blast is a serious fungal disease caused by Magnaporthe oryzae sub.sp. triticum that affects wheat crops. It can lead to significant yield losses ranging from 10 to 100% depending on various factors like genotype, planting time, rainfall, and disease severity. The disease is characterized by completely bleached wheat spikes with gray blast sporulation, lesions with white centers and reddish brown margins on leaves, and can infect all above-ground parts of the plant.",
              condensed_question: "What can you tell me about wheat blast?",
              follow_up_questions: [
                "What are the major states affected by wheat blast?",
                "What are the symptoms of wheat blast on wheat plants?",
                "Can you provide information on the IPM Package of Practice for managing Wheat Blast Like Disease on wheat?",
              ],
              query: "Tell me about wheat blast",
            },
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
                youtube_url: "https://www.youtube.com/watch?v=oLc2P7Zrpqc",
                query_response:
                  "Wheat blast is a serious fungal disease caused by Magnaporthe oryzae sub.sp. triticum that affects wheat crops. It can lead to significant yield losses ranging from 10 to 100% depending on various factors like genotype, planting time, rainfall, and disease severity. The disease is characterized by completely bleached wheat spikes with gray blast sporulation, lesions with white centers and reddish brown margins on leaves, and can infect all above-ground parts of the plant.",
                condensed_question: "What can you tell me about wheat blast?",
                follow_up_questions: [
                  "What are the major states affected by wheat blast?",
                  "What are the symptoms of wheat blast on wheat plants?",
                  "Can you provide information on the IPM Package of Practice for managing Wheat Blast Like Disease on wheat?",
                ],
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

    setInputText(""); // Clear input field
  }

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    getResponse(inputText);
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
    }, 4000);
  }, []);

  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar for select options */}
      <div className="flex flex-col p-5 bg-[#212121] dark:bg-[#212121] w-[200px] min-w-[200px] space-y-4">
        {/* Assuming you have state and handlers for these select elements */}
        <BotSelection />
        <Selector />
        <CropSelector />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Existing content from your snippet */}
        <main className="flex-1 pl-5 overflow-y-auto space-y-1 w-full max-w-3xl mr-auto hide-scrollbar bg-[#212121] dark:bg-gray-900">
          {loader.component ? (
            <ComponentLoader />
          ) : (
            chatExchanges.map((exchange) => (
              <div key={exchange.id} className="w-full py-2 my-2 text-white">
                {/* User query */}
                <div className="text-left">
                  <div className="inline-block w-full flex gap-5 align-middle dark:bg-gray-800  dark:text-gray-300 rounded-lg px-4 py-2 shadow">
                    <Avatar>
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {exchange.query}
                  </div>
                </div>
                {/* Bot response */}
                {exchange.loading ? (
                  <div className="text-left mt-2">
                    <div className="inline-block w-full flex gap-5 align-middle  dark:bg-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 shadow animate-pulse">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>FC</AvatarFallback>
                      </Avatar>{" "}
                      Replying...
                    </div>
                  </div>
                ) : (
                  // <div className="text-left mt-2">
                  //   <div className="inline-block w-full flex gap-5 align-middle dark:bg-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 shadow">
                  //     <Avatar>
                  //       <AvatarImage src="https://github.com/shadcn.png" />
                  //       <AvatarFallback>FC</AvatarFallback>
                  //     </Avatar>
                  //   </div>
                  // </div>
                  <>
                    <ResponseFormatter
                      exchange={exchange.response}
                      getResponse={getResponse}
                    />
                  </>
                )}
              </div>
            ))
          )}{" "}
          <div ref={bottomRef} />
        </main>
        <div className="p-5 bg-[#212121] dark:bg-[#212121] flex justify-start">
          <form
            onSubmit={handleSendMessage}
            className="flex justify-center space-x-2 w-full max-w-3xl" // Reduced width and centering
          >
            <Input
              className="flex-1 p-2 rounded-xl border text-white bg-[#212121] border-white focus:border-white focus:outline-[#212121] transition-colors"
              id="message"
              placeholder="Type a message..."
              value={inputText}
              onChange={handleChange}
            />

            <Button
              type="submit"
              className="px-4 py-2 bg-[#212121] hover:bg-[#1a1a1a] border border-white outline-none text-white rounded-full disabled:bg-[#171717] focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              disabled={!inputText.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
