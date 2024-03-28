import BotSelection from "../chat-components/BotSelection";
import MainDialog from "../chat-components/MainDialog";

// import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="bg-[#212121] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
          <BotSelection />
          <MainDialog />
        </div>
        {/* <MainCard /> */}
        {/* <div className="space-x-4">
          <Button className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            About
          </Button> */}
        {/* <button className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Contact
          </button> */}
        {/* </div> */}
      </div>
    </nav>
  );
}
