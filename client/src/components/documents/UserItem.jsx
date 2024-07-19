import { useAuth } from "@/context/auth";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import NotionLogo from "./NotionLogo";
// import axios from "@/axiosConfig";
import NetworkApi from "@/Api/jwtInterceptor";

const UserItem = () => {
  const [{ user }] = useAuth();
  const navigate = useNavigate();
  const handleClearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };
  const handleLogout = async () => {
    try {
      // window.open("http://localhost:3851/api/v1/auth/logout", "_self");
      let res = await NetworkApi.post(
        "http://localhost:3851/api/v1/auth/logout",
        {
          id: user._id,
        }
      );

      if (res.data.success) {
        localStorage.clear();
        handleClearAllCookies();
        navigate("/login");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[200px]">
            {user?.logo && user?.logo !== "undefined" ? (
              user?.logo
            ) : (
              <NotionLogo letter={user?.title?.substring(0, 1)} />
            )}
            <span className="text-start font-medium line-clamp-1 capitalize">
              {user?.title ? user?.title : <>{user?.name}&apos;s Notion</>}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              {" "}
              {user?.logo && user?.logo !== "undefined" ? (
                user?.logo
              ) : (
                <NotionLogo letter={user?.title?.substring(0, 1)} />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1 capitalize">
                {user?.name} &apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
