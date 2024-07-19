/* eslint-disable react/prop-types */

import UseDocuments from "@/pages/main/useDocuments";
import NotionLogo from "../NotionLogo";
import { IconPicker } from "../icon-picker";
import { Globe, ArrowRightToLine, Archive } from "lucide-react";
import { useAuth } from "@/context/auth";

const General = ({ doc }) => {
  const { upadteTeamspaceList } = UseDocuments();
  const [{ user }] = useAuth();
  const onIconSelect = (icon) => {
    upadteTeamspaceList({
      ...doc,
      icon: icon,
    });
  };
  return (
    <div>
      <span className="text-md">Details</span>
      <div className="border text-sm rounded-sm mt-2 px-4 py-2">
        <div className="">
          <span>Icon and Name</span>
          <span className="text-base text-black mt-2 flex items-center justify-start">
            <div className="shrink-0 mr-2 text-18px]">
              {" "}
              <IconPicker onChange={onIconSelect}>
                {
                  doc?.icon ? (
                    <p className="text-2xl hover:opacity-75 transition">
                      <div className="shrink-0 mr-2 text-[20px] border-[1px]  rounded-md ">
                        {doc?.icon}
                      </div>
                    </p>
                  ) : (
                    // <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                    // (level === -1 || isFavorite) && (
                    <p className="text-2xl hover:opacity-75 transition">
                      <div className="shrink-0 mr-2 text-[10px]">
                        <NotionLogo letter={doc?.title?.substring(0, 1)} />
                      </div>
                    </p>
                  )
                  // )
                }
              </IconPicker>
            </div>
            <input className="capitalize" value={doc?.title} />
          </span>
        </div>
        <hr className="my-2" />

        <div className="flex flex-col gap-2 mt-2">
          <span>Description</span>
          <div>{doc?.description ? doc?.description : "No description"}</div>
        </div>
      </div>
      <div className="flex flex-row gap-2 w-16 my-2">
        <button
          onClick={() => {}}
          className="flex-1 py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-md rounded-sm"
        >
          Update
        </button>
      </div>
      <span className="text-md">Permissions</span>
      <div className="border text-sm rounded-sm mt-2 px-4 py-2">
        <div className="">
          <span className="text-base text-muted-foreground mt-2 flex items-center justify-start gap-4">
            <div>
              <Globe className="w-5 h-5 " />
            </div>
            <div className="flex flex-col">
              <span className="text-md">Default</span>
              <span className="text-sm text-muted-foreground">
                Every one at {user.title} must be a member
              </span>
            </div>
          </span>
        </div>
        <hr className="my-2" />

        <div className="flex  gap-4 items-center text-muted-foreground">
          <span>{user.logo}</span>
          <div className="text-sm text-muted-foreground my-2">
            Every one at {user.title} has full access
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-md">Danger zone</span>
        <div className="border text-sm rounded-sm px-4 py-2 bg-opacity-20 bg-gray-700">
          <div className="">
            <span className="text-base text-muted-foreground mt-2 flex items-center justify-start gap-4">
              <div>
                <ArrowRightToLine className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-md">Leave teamspace</span>
                <span className="text-sm text-muted-foreground">
                  Remove teamspace from your sidebar
                </span>
              </div>
            </span>
          </div>
          <hr className="my-2" />

          <div className="flex gap-2 items-center">
            <span>
              <Archive className="text-red-300" />
            </span>
            <div className="flex flex-col">
              <span className="text-md text-red-300">Archive teamspace</span>
              <span className="text-sm text-muted-foreground">
                Remove teamspace from sidebar for all members
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
