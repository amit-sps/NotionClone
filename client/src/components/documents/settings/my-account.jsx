import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import NotionLogo from "../NotionLogo";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
const MyAccount = ({ user }) => {
  return (
    <div className="p-6 w-full flex flex-col">
      <div className="flex flex-col space-y-4 p-2">
        <span className="w-full font-semibold border-b-[2px] pb-4 border-[#37352f17]">
          My profile
        </span>
        <div className="flex items-center gap-x-2">
          <div className="group/icon flex items-center gap-x-2  pt-6">
            <div className="rounded-full bg-secondary p-1">
              {user?.image ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.image} />
                </Avatar>
              ) : (
                <NotionLogo letter={user?.name.substring(0, 1)} isMyAccount />
              )}
            </div>
            <Button
              //   onClick={() => onRemoveIcon("📑")}
              className="rounded-full w-4 h-4 opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <label htmlFor="username" className="text-xs text-muted-foreground">
              Preferred name
            </label>
            <input
              id="username"
              className="text-md line-clamp-1 capitalize bg-muted py-1 px-2 border-[2px] rounded-sm"
              value={`${user?.name}'s Notion`}
            />
          </div>
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-[#37352f17]">
          Account security
        </span>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <label className="text-md">Email</label>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <Button className="bg-transparent text-black border py-0 px-3 hover:text-white dark:bg-black dark:border-gray-600 dark:text-white dark:hover:bg-[#242323] ">
            Change email
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Password</label>
            <span className="text-xs text-muted-foreground">
              Set a permanent password to login to your account.
            </span>
          </div>
          <Switch />
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-[#37352f17]">
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md text-red-500">Delete my account</label>
            <span className="text-xs text-muted-foreground">
              Permanently delete the account and remove access from all
              workspaces.
            </span>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
