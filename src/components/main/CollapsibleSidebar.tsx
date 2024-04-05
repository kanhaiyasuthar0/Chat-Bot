import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import GptBotSelector from "../chat-components/GptBotSelector";
import Selector from "../chat-components/Selector";
import CropSelector from "../chat-components/CropSelector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaDharmachakra } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppContext } from "@/context/ChatBotContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import SettingsDialog from "./SettingsDialog";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { user } = useAppContext();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Failed to log out:", error);
      // Optionally handle error, e.g., show an error message
    }
  };

  return (
    <Box className="font-reddit" sx={{ display: "flex", width: "100%" }}>
      {/* <CssBaseline /> */}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#171717",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <div>
            {/* <Link to={"/chat"}> */}
            <DrawerHeader
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "start",
                gap: 10,
                padding: "20px",
                cursor: "pointer",
              }}
            >
              {/* <div> */}
              <FaDharmachakra size={"30px"} /> Farmer Chat Bot
              {/* </div> */}
            </DrawerHeader>
            {/* </Link> */}
            <Divider />
            <div className="flex flex-col justify-between h-[610px] p-2">
              <div>
                <div>
                  <GptBotSelector />
                </div>
                {/* <div>
{[""]}


                </div> */}
              </div>
              <Popover>
                <PopoverTrigger className="text-white text-left p-3 hover:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="truncate max-w-xs">{user?.name}</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-[#212121] border-none flex flex-col gap-5 w-[200px] text-white z-[10000]"
                  side="top"
                  align="center"
                >
                  <ul className="list-none p-0 w-full">
                    <li
                      className={`flex items-center my-2 p-2 cursor-pointer rounded-lg 
                        hover:bg-gray-700 hover:text-white transition-colors`}
                      //   onClick={() => handleBotSelection(bot.id)}
                    >
                      {/* <span className="mr-2 text-sm">{"Setting"}</span> */}
                      <div className="w-full">
                        <Dialog>
                          <DialogTrigger className="text-sm sm:text-sm w-full flex gap-2 align-middle items-center">
                            {" "}
                            <CiSettings /> {"Setting"}
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Settings</DialogTitle>
                              <DialogDescription className="min-h-[300px]">
                                <SettingsDialog />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </li>
                    <li
                      className={`flex items-center p-2 my-2 cursor-pointer rounded-lg 
                        hover:bg-gray-700 hover:text-white transition-colors`}
                      //   onClick={() => handleBotSelection(bot.id)}
                      onClick={handleLogout}
                    >
                      {/* <span className="mr-2 text-sm">{"Setting"}</span> */}
                      <span
                        // to={"/login"}
                        className="text-sm sm:text-sm flex gap-2 align-middle items-center"
                      >
                        <CiLogout />
                        {"Logout"}
                      </span>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </Drawer>
      <Main open={open}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1.2 }}>
            <div>
              <Popover>
                <PopoverTrigger className="text-white">Options</PopoverTrigger>
                <PopoverContent
                  className="bg-[#212121] flex flex-col gap-5 w-fit border-2"
                  side="bottom"
                  align="start"
                >
                  <Selector />
                  <CropSelector />
                </PopoverContent>
              </Popover>
            </div>
            <IconButton
              style={{
                position: "absolute",
                top: "48%",
                // left: "20%",
                zIndex: 10,
              }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon
                  onClick={handleDrawerClose}
                  style={{ color: "white" }}
                  sx={{ mr: 2, ...(!open && { display: "none" }) }}
                />
              ) : null}

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <ChevronRightIcon
                  onClick={handleDrawerClose}
                  style={{ color: "white" }}
                />
              </IconButton>
            </IconButton>
          </div>
          <div style={{ flex: "5" }}>{children}</div>
        </div>
        {/* <DrawerHeader /> */}
      </Main>
    </Box>
  );
}
