import { Switch } from "@/components/ui/switch";
import React from "react";

const MyNotification = () => {
  return (
    <div className="p-6 w-full flex flex-col">
      <div className="flex flex-col space-y-4 p-2">
        <span className="w-full font-semibold border-b-[2px] pb-4 border-mutate">
          My notifications
        </span>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <label className="text-md">Mobile push notifications</label>
            <span className="text-xs text-muted-foreground">
              Receive push notifications on mentions and comments via your
              mobile app
            </span>
          </div>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Slack notifications</label>
            <span className="text-xs text-muted-foreground">
              Receive notifications in your Slack workspace when you're
              mentioned in a page, database property, or comment
            </span>
          </div>
        </div>
        <span className="w-full font-semibold border-b-[2px] pb-4 pt-4 border-mutate">
          Email notifications
        </span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Activity in your workspace</label>
            <span className="text-xs text-muted-foreground">
              Receive emails when you get comments, mentions, page invites,
              reminders, access requests, and property changes
            </span>
          </div>
          <Switch />
        </div>{" "}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Always send email notifications</label>
            <span className="text-xs text-muted-foreground">
              Receive emails about activity in your workspace, even when you’re
              active on the app
            </span>
          </div>
          <Switch />
        </div>{" "}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Email digests</label>
            <span className="text-xs text-muted-foreground">
              Receive email digests every 8 hours for changes to pages you’re
              subscribed to
            </span>
          </div>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-md">Announcements and update emails</label>
            <span className="text-xs text-muted-foreground">
              Receive occasional emails about product launches and new features
              from Notion
            </span>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default MyNotification;
