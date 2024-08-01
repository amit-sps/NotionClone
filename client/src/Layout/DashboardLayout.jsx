import Navigation from "@/components/documents/Navigation";
import SearchCommand from "@/components/documents/SearchCommand";
import { useAuth } from "@/context/auth";
import React from "react";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  const [{ user }, setAuth, socket] = useAuth();
  console.log("DashboardLayoutDashboardLayoutDashboardLayoutDashboardLayoutDashboardLayoutDashboardLayout")

  return (
    <div className="min-h-full flex dark:bg-[#1F1F1F] ">
      <Navigation user={user}/>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
        <SearchCommand />
        {/* <ModalProvider id={id} /> */}
        {/* {id && !isLoading ? (
        page?._id ? (
          <DocumentIdPage documentId={page?._id} page={page} />
        ) : (
          <PageNotFound />
        )
      ) : (
        <div className="h-full flex flex-col items-center justify-center space-y-4 border">
          <img
            src={empty}
            height="300"
            width="300"
            alt="Empty"
            className="dark:hidden"
          />
          <img
            src={emptyDark}
            height="300"
            width="300"
            alt="Empty"
            className="hidden dark:block"
          />
          <h2 className="text-lg font-medium">
            Welcome to {user?.name}&apos;s Notion
          </h2>
          <Button
            onClick={() =>
              createMutation({
                title: `document`,
                adminId: user?._id,
              })
            }
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create a note
          </Button>
        </div>
      )} */}
      </main>
    </div>
  );
};

export default DashboardLayout;
