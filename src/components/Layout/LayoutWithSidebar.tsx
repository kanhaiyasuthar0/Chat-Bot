import { ReactNode } from "react";
import Sidebar from "../main/SideBar"; // Adjust the import path according to your project structure
import CollapsibleSidebar from "../main/CollapsibleSidebar";
import PersistentDrawer from "../main/CollapsibleSidebar";

const LayoutWithSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <PersistentDrawer>{children}</PersistentDrawer>
    </div>
  );
};

export default LayoutWithSidebar;
