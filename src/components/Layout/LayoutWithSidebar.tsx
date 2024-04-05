import { ReactNode } from "react";

import PersistentDrawer from "../main/CollapsibleSidebar";

const LayoutWithSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <PersistentDrawer>{children}</PersistentDrawer>
    </div>
  );
};

export default LayoutWithSidebar;
