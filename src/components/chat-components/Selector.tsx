import MainSelect from "./MainSelect";
import { useAppContext } from "@/context/ChatBotContext";

const Selector = () => {
  const { language, setLanguage } = useAppContext();
  const placeholder = "Select the Language";

  const options = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Hindi",
      value: "hi",
    },
  ];
  return (
    <div>
      {" "}
      <MainSelect
        setter={setLanguage}
        state={language}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Selector;
