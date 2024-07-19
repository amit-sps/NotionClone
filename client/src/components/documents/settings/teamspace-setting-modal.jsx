/* eslint-disable react/prop-types */

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import General from "./General";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TeamspaceSettingModal = ({ doc, openModal, setOpenModal, children }) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="z-[99999] p-0  gap-0 lg:max-w-2xl md:max-w-xl sm:max-w-lg min-h-[650px]">
        <div className="cursor-default relative z-50">
          <div className="flex h-full w-full py-3 px-4">
            <div className="flex flex-col gap-2 dark:bg-[#202020] bg-white px-4 pb-4 rounded-lg w-full">
              <span className="text-lg text-black mt-2 flex items-start justify-start">
                <div className="flex shrink-0 mr-2 text-[18px]">
                  {doc?.icon}
                </div>
                <span className="capitalize dark:text-muted-foreground font-semibold">
                  {doc?.title}
                </span>
              </span>
              <hr />
              <Tabs defaultValue="General" className="w-full ">
                <TabsList className="bg-transparent w-full flex justify-start">
                  <TabsTrigger className="" value="General">
                    General
                  </TabsTrigger>
                  <TabsTrigger value="Members">Members</TabsTrigger>
                  <TabsTrigger value="Security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="General">
                  <General doc={doc} />
                </TabsContent>
                <TabsContent value="Members">
                  Change your Members here.
                </TabsContent>
                <TabsContent value="Security">Security</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamspaceSettingModal;
