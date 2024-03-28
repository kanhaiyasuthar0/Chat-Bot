import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/ChatBotContext";
// import { useState } from "react";

export default function BotSelection() {
  const { bot, setBot } = useAppContext();

  return (
    <Select value={bot} onValueChange={(newBot) => setBot(newBot)}>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Select a bot" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel></SelectLabel> */}
          <SelectItem value="vistar_bot">Vistar Bot</SelectItem>
          <SelectItem value="bihar_bot">Bihar Bot</SelectItem>
          <SelectItem value="kenya_bot">Kenya Bot</SelectItem>
          {/* <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
