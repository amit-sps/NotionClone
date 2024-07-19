import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TeamspaceDataTable } from "./teamspace-table";
import UseDocuments from "@/pages/main/useDocuments";
import { MoreHorizontal } from "lucide-react";
const columns = [
  {
    accessorKey: "title",
    header: "Teamspace",
  },
  {
    accessorKey: "adminId.name",
    header: "Owners",
    cell: ({ row }) => {
      console.log("Access row", row, row.original.adminId.image);
      return (
        <span className="flex gap-2">
          <img
            src={row.original.adminId.image}
            className="w-6 h-6 rounded-full"
          />
          {row.original.adminId.name}
        </span>
      );
    },
  },
  {
    accessorKey: "",
    header: "Access",
    cell: ({ row }) => {
      console.log("Access row", row);
      return (
        <select defaultValue={"Open"}>
          <option value="Default">Default</option>
          <option value="Open">Open</option>
          <option value="Close">Close</option>
          <option value="Private">Private</option>
        </select>
      );
    },
  },
  {
    accessorKey: "options",
    header: "",
    cell: ({ row }) => {
      console.log("Access row", row);
      return <MoreHorizontal />;
    },
  },
];
const data = [
  {
    id: "728ed52f",
    amount: { a: 100 },
    status: "pending",
    email: "m@example.com",
  },
  // ...
];
const TeamspaceSettings = () => {
  const { teamspaceList } = UseDocuments();
  const [teamspace, setTeamspace] = useState([]);

  return (
    <div className="p-6 w-full flex flex-col">
      <div className="flex flex-col space-y-4 p-2">
        <span className="w-full font-semibold border-b-[2px] pb-4 border-mutate">
          Teamspace settings
        </span>
        <div className="flex justify-between items-center border-b-[2px] pb-4 border-mutate">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-md">Default teamspaces</label>
            <span className="text-xs text-muted-foreground">
              Choose teamspaces that all new and current workspace members will
              automatically join
            </span>
            <span className="flex items-center gap-3">
              <div className="flex text-md line-clamp-1 capitalize bg-muted border-[2px] min-h-4 rounded-sm w-full ">
                {teamspaceList?.map((item, i) => (
                  <div className="flex items-center" key={i}>
                    {item.title}
                    {i == teamspace?.length - 1 && (
                      <Input
                        placeholder="Select a default teamspace..."
                        className="bg-transparent border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    )}
                  </div>
                ))}
                {teamspace?.length === 0 && (
                  <Input
                    placeholder="Select a default teamspace..."
                    className="bg-transparent border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                )}
              </div>
              <Button className="bg-blue-500">Update</Button>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center border-b-[2px] pb-4 border-mutate">
          <div className="flex items-start justify-between  gap-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-md">Manage teamspaces</label>
              <span className="text-xs text-muted-foreground">
                Manage all teamspaces you have access here
              </span>
            </div>
            <Button className="bg-blue-500">New Teamspace</Button>
          </div>
        </div>
        <div>
          <TeamspaceDataTable columns={columns} data={teamspaceList} />
        </div>
      </div>
    </div>
  );
};

export default TeamspaceSettings;
