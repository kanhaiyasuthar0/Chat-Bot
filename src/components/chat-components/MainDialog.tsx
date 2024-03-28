import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MainSelect from "./MainSelect";

import { useAppContext } from "@/context/ChatBotContext";

export default function MainDialog() {
  //   const [language, setLanguage] = useState("en");
  const { language, setLanguage } = useAppContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          variant="outline"
        >
          Language - {language}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select language</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}

        <MainSelect setLanguage={setLanguage} language={language} />
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
