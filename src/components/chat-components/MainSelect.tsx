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
  state,
  setter,
  options,
  placeholder,
}: {
  state: string;
  placeholder: string;
  setter: (string: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <Select value={state} onValueChange={(newState) => setter(newState)}>
      <SelectTrigger className="w-[180px] text-white bg-[#212121] border-bg-[#212121] outline-[#212121]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => {
            return <SelectItem value={option.value}>{option.label}</SelectItem>;
          })}
          {/* <SelectItem value="en">English</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
