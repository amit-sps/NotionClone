import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../ModeToggle";
import { useAuth } from "@/context/auth";
import { Avatar, AvatarImage } from "../ui/avatar";
import NotionLogo from "./NotionLogo";
// import { ModeToggle } from "@/components/documents/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabItem from "./tab-item";
import {
  CircleUserRound,
  SlidersHorizontal,
  Bell,
  Globe,
  ArrowUpRightSquare,
  Settings,
  Users,
  ArrowUpCircle,
  AppWindow,
  KeyRound,
  ShieldCheck,
  LayoutGrid,
  ArrowDownToLine,
  Building2,
} from "lucide-react";
import MyAccount from "./settings/my-account";
import MySettings from "./settings/my-settings";
import MyNotification from "./settings/my-notification";
import UserSettings from "./settings/WorkspaceSettings";
import TeamspaceSettings from "./settings/teamspace-settings";

export const SettingsModal = () => {
  const settings = useSettings();
  const [{ user }] = useAuth();

  console.log("settings.isOpen", settings.isOpen);
  return (
    <>
      <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
        <DialogContent className="p-0  gap-0 lg:max-w-6xl md:max-w-2xl sm:max-w-lg h-[650px] ">
          <Tabs
            className="flex items-center justify-between w-full gap-4 dark:bg-black bg-white border rounded-md "
            defaultValue="My account"
          >
            <div className="pl-2 max-sm:w-1/12 sm:w-1/12 md:w-1/3 w-1/4 pb-4 bg-muted h-full">
              <span className="flex items-center justify-between p-2 mb-4 pb-0">
                <h2 className="text-muted-foreground text-start font-medium line-clamp-1">
                  Account
                </h2>
                {/* <ModeToggle /> */}
              </span>
              <div
                // role="button"
                className="flex items-center text-md  w-full hover:bg-primary/5"
              >
                <div className="gap-2 flex items-center">
                  {user?.image ? (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.image} />
                    </Avatar>
                  ) : (
                    <NotionLogo letter={user?.name.substring(0, 1)} />
                  )}
                  <div>
                    <span className="text-start font-medium line-clamp-1 capitalize sm:hidden lg:block md:block hidden ">
                      {user?.title ? (
                        user?.title
                      ) : (
                        <>{user?.name}&apos;s Notion</>
                      )}
                    </span>
                    <span className="text-muted-foreground text-wrap sm:hidden lg:block md:block hidden ">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <TabsList className="flex flex-col w-full bg-transparent mt-4 py-0 h-auto items-start border-0">
                <TabItem value="My account" Icon={CircleUserRound} />
                <TabItem Icon={SlidersHorizontal} value="My settings" />
                <TabItem Icon={Bell} value="My notification" />
                <TabItem Icon={ArrowUpRightSquare} value="My connection" />
                <TabItem Icon={Globe} value="Language & region" />
                <h2 className="w-full text-muted-foreground mt-6 text-start font-medium line-clamp-1 ">
                  Workspace
                </h2>
                <TabItem Icon={Settings} value="Settings" />
                <TabItem Icon={Building2} value="Teamspace" />
                <TabItem Icon={Users} value="People" />
                <TabItem Icon={ArrowUpCircle} value="Upgrade" />
                <TabItem Icon={AppWindow} value="Site" />
                <TabItem Icon={KeyRound} value="Security" />
                <TabItem Icon={ShieldCheck} value="Identity & provisioning" />
                <TabItem Icon={LayoutGrid} value="Connections" />
                <TabItem Icon={ArrowDownToLine} value="Import" />
              </TabsList>
            </div>
            <div className="sm:w-full md:w-full w-3/4 h-[650px] overflow-y-scroll ">
              <TabsContent value="My account">
                <MyAccount user={user} />
              </TabsContent>
              <TabsContent value="My settings" className="">
                <MySettings />
              </TabsContent>

              <TabsContent value="My notification">
                <MyNotification />
              </TabsContent>
              <TabsContent value="My connection">My connection</TabsContent>
              <TabsContent value="Language & region">
                Language & region
              </TabsContent>
              <TabsContent value="Settings">
                <UserSettings user={user} />
              </TabsContent>
              <TabsContent value="Teamspace" className="">
                <TeamspaceSettings />
              </TabsContent>
              <TabsContent value="People">People</TabsContent>
              <TabsContent value="Upgrade">Upgrade</TabsContent>
              <TabsContent value="Site">Site</TabsContent>
              <TabsContent value="Security">Security</TabsContent>
              <TabsContent value="Identity & provisioning">
                Identity & provisioning
              </TabsContent>
              <TabsContent value="Connections">Connections</TabsContent>
              <TabsContent value="Import">Import</TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};
