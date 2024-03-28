import MainSelect from "./MainSelect";
import { useAppContext } from "@/context/ChatBotContext";

const Selector = () => {
  const { language, setLanguage } = useAppContext();

  return (
    <div>
      {" "}
      <MainSelect setLanguage={setLanguage} language={language} />
    </div>
  );
};

export default Selector;
