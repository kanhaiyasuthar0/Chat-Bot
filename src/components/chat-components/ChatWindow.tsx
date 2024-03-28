import React, { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import Navbar from "../main/Navbar";
import { Input } from "../ui/input";

interface IMessage {
  id: number;
  text: string;
  sender: "system" | "user";
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: "Hi there! I'm ChatGPT. How can I assist you today?",
      sender: "system",
    },
    {
      id: 2,
      text: "Feel free to ask me anything, and I'll do my best to help.",
      sender: "system",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: IMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
    };
    const newSystemMessage: IMessage = {
      id: messages.length + 2,
      text: `Sure ${inputText}`,
      sender: "system",
    };
    setMessages([...messages, newMessage, newSystemMessage]);
    setInputText(""); // Clear input after sending
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className="flex w-screen flex-col h-screen">
      {/* <header className="text-white bg-indigo-600 p-4 text-lg font-bold">
        ChatGPT Conversation
      </header> */}
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xl mx-4 my-2 ${
              message.sender === "system"
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg"
                : "bg-gray-700 dark:bg-blue-700 text-white rounded-lg ml-auto"
            } shadow p-4 flex items-center`}
          >
            {message.sender === "system" && (
              <svg
                className="w-6 h-6 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a8 8 0 100 15.292M12 4.354a8 8 0 01.588 15.286M12 4.354a8 8 0 01-.588 15.286M12 12v.01M12 12V12z"
                />
              </svg>
            )}
            <p>{message.text}</p>
          </div>
        ))}
      </main>

      <div className="p-10 bg-gray-100 dark:bg-gray-800">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          {/* <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
    </div> */}
          <Input
            className="flex-1 p-2 rounded-full border-1 text-black border-gray-300 focus:border-none focus:outline-none transition-colors"
            id="message"
            placeholder="Type a message..."
            value={inputText}
            onChange={handleChange}
          />
          <Button
            type="submit"
            // className="p-2 bg-blue-500 text-white rounded-full"
            disabled={!inputText.trim()}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
