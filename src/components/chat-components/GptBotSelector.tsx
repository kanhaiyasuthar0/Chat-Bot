import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";
import { GrRobot } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Bot {
  id: number;
  name: string;
  icon: JSX.Element;
  states?: { value: string; label: string }[];
}

const bots: Bot[] = [
  {
    id: 1,
    name: "India",
    icon: <FaRobot color="black" />,
    states: [
      { value: "maharashtra", label: "Maharashtra" },
      { value: "karnataka", label: "Karnataka" },
    ],
  },
  {
    id: 2,
    name: "Ethiopia",
    icon: <GrRobot color="black" />,
    states: [
      { value: "addis_ababa", label: "Addis Ababa" },
      { value: "oromia", label: "Oromia" },
    ],
  },
  {
    id: 3,
    name: "Kenya",
    icon: <PiSquaresFour color="black" />,
    states: [
      { value: "nairobi", label: "Nairobi" },
      { value: "mombasa", label: "Mombasa" },
    ],
  },
];

const GptBotSelector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialBotId = searchParams.get("bot")
    ? parseInt(searchParams.get("bot"), 10)
    : bots[0].id;

  const [selectedBotId, setSelectedBotId] = useState<number>(initialBotId);
  const [selectedState, setSelectedState] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleChangeState = async (value: any) => {
    console.log("🚀 ~ handleChangeState ~ value:", value);
    return {};
  };

  useEffect(() => {
    const botParam = searchParams.get("bot");
    if (botParam) {
      const botId = parseInt(botParam, 10);
      const botExists = bots.some((bot) => bot.id === botId);
      if (botExists) {
        setSelectedBotId(botId);
      }
    }
  }, [location.search]);

  const handleBotSelection = (id: number) => {
    setSelectedBotId(id);
    navigate(`?bot=${id}`);
    setSelectedState(null); // Reset state selection when changing bots
  };

  return (
    <div className="p-2 text-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <ul className="list-none p-0">
        {bots.map((bot) => (
          <Dialog key={bot.id}>
            <DialogTrigger asChild>
              <li
                className={`flex items-center p-2 my-2 cursor-pointer rounded-lg
                ${
                  selectedBotId === bot.id
                    ? "bg-white text-black"
                    : "text-white"
                }
                hover:bg-gray-700 hover:text-white transition-colors justify-start align-middle`}
                onClick={() => handleBotSelection(bot.id)}
              >
                <span
                  className={`${
                    selectedBotId === bot.id ? "bg-white" : "bg-white "
                  } mr-2 text-lg pt-1 rounded-full h-7 w-7 flex justify-center align-middle text-center`}
                >
                  {bot.icon}
                </span>
                <span className="text-md sm:text-sm">{bot.name}</span>
              </li>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select State in {bot.name}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Select
                  options={bot.states}
                  value={selectedState}
                  onChange={handleChangeState}
                  placeholder="Select a state"
                />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </ul>
    </div>
  );
};

export default GptBotSelector;
