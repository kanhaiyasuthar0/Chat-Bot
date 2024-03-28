import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useState } from "react";

export default function MainSelect({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (string: string) => void;
}) {
  return (
    <Select value={language} onValueChange={(newLang) => setLanguage(newLang)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a langauge" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
