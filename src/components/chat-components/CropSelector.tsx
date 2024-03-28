import MainSelect from "./MainSelect";
import { useAppContext } from "@/context/ChatBotContext";

const CropSelector = () => {
  const { crop, setCrop } = useAppContext();
  const heading = "Select the value chain";
  const options = [
    {
      label: "Wheat",
      value: "wheat",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  return (
    <div>
      {" "}
      <MainSelect
        setter={setCrop}
        state={crop}
        options={options}
        placeholder={heading}
      />
    </div>
  );
};

export default CropSelector;
