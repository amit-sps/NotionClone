import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/ModeToggle";
const MySettings = () => {
  return (
    <div className="p-6 w-full flex flex-col">
      <div className="flex flex-col space-y-4 p-2">
        <span className="w-full font-semibold border-b-[2px] pb-4 border-mutate">
          My settings
        </span>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <label className="text-md">Appearance</label>
            <span className="text-xs text-muted-foreground">
              Customize how Notion looks on your device.
            </span>
          </div>
          <ModeToggle isSettings />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Open on start</label>
            <span className="text-xs text-muted-foreground">
              Choose what to show when Notion starts or when you switch
              workspaces.
            </span>
          </div>
          <Select className="">
            <SelectTrigger className="w-[100px] border-0">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Last visited page</SelectItem>
              <SelectItem value="dark">Top Page in sidebar</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Open links in desktop app</label>
            <span className="text-xs text-muted-foreground">
              You must have the{" "}
              <u className="cursor-pointer">Mac or Windows app</u> installed.
            </span>
          </div>
          <Switch />
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-mutate">
          Date & time
        </span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">
              Set timezone automatically using your location
            </label>
            <span className="text-xs text-muted-foreground">
              Reminders, notifications and emails are delivered based on your
              time zone.
            </span>
          </div>
          <Switch />
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-mutate">
          Support
        </span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Support access</label>
            <span className="text-xs text-muted-foreground">
              Grant Notion support temporary access to your account so we can
              troubleshoot problems or recover content on your behalf. You can
              revoke access at any time.
            </span>
          </div>
          <Switch />
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-mutate">
          Privacy
        </span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Cookie settings</label>
            <span className="text-xs text-muted-foreground">
              Customize cookies.<u className="cursor-pointer">Cookies Notice</u>{" "}
              See for details.
            </span>
          </div>
        </div>
        {/* /// */}
      </div>
    </div>
  );
};

export default MySettings;
