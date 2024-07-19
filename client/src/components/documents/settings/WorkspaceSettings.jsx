import { Switch } from "@/components/ui/switch";
import { IconPicker } from "../icon-picker";
import NotionLogo from "../NotionLogo";
import useSettings from "@/pages/main/useSettings";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Settings = ({ user }) => {
  const { updateUser } = useSettings();
  const [title, setTitle] = useState(user?.title && `${user?.title}`);
  const onIconSelect = (icon) => {
    updateUser({
      ...user,
      logo: icon,
    });
  };
  const handleTitleChanged = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateUser({
      ...user,
      title: title,
    });
  };
  return (
    <div className="p-6 w-full flex flex-col">
      <div className="flex flex-col space-y-4 p-2">
        <span className="w-full font-semibold border-b-[2px] pb-4 border-mutate">
          Workspace settings
        </span>
        <div className="flex justify-between items-center border-b-[2px] pb-4 border-mutate">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-md">Export content</label>
            <input
              className="text-md line-clamp-1 capitalize bg-muted py-1 px-2 border-[2px] rounded-sm"
              placeholder="Enter title for your notion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleChanged}
            />
            <span className="text-xs text-muted-foreground">
              Receive push notifications on mentions and comments via your
              mobile app
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center border-b-[2px] pb-4 border-mutate">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-md">Icon</label>
            <div className="">
              <IconPicker onChange={onIconSelect}>
                {
                  user?.logo ? (
                    <p className="text-6xl hover:opacity-75 transition">
                      <div className="shrink-0 mr-2 text-[30px] border-[1px] p-3 rounded-md ">
                        {user?.logo}
                      </div>
                    </p>
                  ) : (
                    // <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                    // (level === -1 || isFavorite) && (
                    <p className="text-6xl hover:opacity-75 transition">
                      <div className="shrink-0 mr-2 text-[30px]">
                        <NotionLogo letter={user?.title?.substring(0, 1)} />
                      </div>
                    </p>
                  )
                  // )
                }
              </IconPicker>
            </div>

            <span className="text-xs text-muted-foreground">
              Upload an image or pick an emoji. It will show up in your sidebar
              and notifications.
            </span>
          </div>
        </div>
        <span className="w-full ">Danger zone</span>
        <div className="flex flex-col justify-between items-start gap-6 border-b-[2px] pb-4 border-mutate">
          <Button className="bg-transparent text-red-500 border border-red-500 hover:bg-gray-200">
            Delete entire workspace
          </Button>
          <span
            className="flex items-center text-sm cursor-pointer"
            style={{
              color: "rgba(55, 53, 47, 0.35)",
            }}
          >
            <svg
              role="graphics-symbol"
              viewBox="0 0 16 16"
              className="help"
              style={{
                width: "14px",
                height: "14px",
                display: "block",
                fill: "rgba(55, 53, 47, 0.35)",
                flexShrink: 0,
                marginRight: "6px",
              }}
            >
              <path d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM8 13.7383C4.85547 13.7383 2.33301 11.209 2.33301 8.06445C2.33301 4.91992 4.84863 2.39746 7.99316 2.39746C11.1377 2.39746 13.667 4.91992 13.6738 8.06445C13.6738 11.209 11.1445 13.7383 8 13.7383ZM7.84277 9.4248C8.21875 9.4248 8.45801 9.21289 8.47852 8.93262C8.47852 8.90527 8.47852 8.87109 8.47852 8.85059C8.49902 8.49512 8.74512 8.25586 9.18945 7.96875C9.85938 7.52441 10.2969 7.13477 10.2969 6.3418C10.2969 5.2002 9.27148 4.55078 8.06152 4.55078C6.89258 4.55078 6.09277 5.08398 5.88086 5.72656C5.83984 5.84277 5.81934 5.95898 5.81934 6.08203C5.81934 6.41016 6.0791 6.61523 6.35254 6.61523C6.60547 6.61523 6.76953 6.5127 6.90625 6.32812L7.01562 6.19141C7.24121 5.81543 7.56934 5.61719 7.97949 5.61719C8.5332 5.61719 8.90918 5.94531 8.90918 6.41016C8.90918 6.84082 8.62207 7.05273 8.04102 7.45605C7.55566 7.79102 7.2002 8.14648 7.2002 8.76855V8.84375C7.2002 9.22656 7.43262 9.4248 7.84277 9.4248ZM7.83594 11.5234C8.27344 11.5234 8.63574 11.2021 8.63574 10.7715C8.63574 10.3408 8.27344 10.0264 7.83594 10.0264C7.3916 10.0264 7.03613 10.3477 7.03613 10.7715C7.03613 11.2021 7.39844 11.5234 7.83594 11.5234Z"></path>
            </svg>
            learn about deleting workspaces.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
