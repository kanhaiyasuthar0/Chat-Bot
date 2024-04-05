import { Link } from "react-router-dom";

import CropSelector from "../chat-components/CropSelector";

import Selector from "../chat-components/Selector";

// import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="bg-[#212121] w-full fixed overflow-hidden z-10 p-2">
      <div className="container  mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Selector />
          <CropSelector />
          <button>
            <Link to={"/dashboard"}>Dashboard</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
